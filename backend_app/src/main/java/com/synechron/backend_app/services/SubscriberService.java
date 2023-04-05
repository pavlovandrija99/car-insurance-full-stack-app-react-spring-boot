package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.SubscriberDto;
import com.synechron.backend_app.dtos.pageable.PageableDto;
import com.synechron.backend_app.mapper.SubscriberMapper;
import com.synechron.backend_app.models.Subscriber;
import com.synechron.backend_app.repositories.SubscriberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubscriberService {
    private static int PAGE_SIZE = 10;
    private SubscriberRepository subscriberRepository;
    private SubscriberMapper subscriberMapper;

    public SubscriberService(SubscriberRepository subscriberRepository, SubscriberMapper subscriberMapper) {
        this.subscriberRepository = subscriberRepository;
        this.subscriberMapper = subscriberMapper;
    }

    public PageableDto findAllSubscribers(int page) {
        Page<Subscriber> subscribers = subscriberRepository.findAll(PageRequest.of(page, PAGE_SIZE));

        PageableDto subscriberDtos = new PageableDto();

        for (Subscriber s : subscribers) {
            subscriberDtos.getObjects().add(subscriberMapper.fromEntityToDto(s));
        }

        subscriberDtos.setHasNext(subscribers.hasNext());
        subscriberDtos.setHasPrevious(subscribers.hasPrevious());
        subscriberDtos.setSliceNumber(subscribers.getNumber());
        subscriberDtos.setTotalElements(subscribers.getTotalElements());
        subscriberDtos.setTotalNumberOfPages(subscribers.getTotalPages());

        return subscriberDtos;
    }

    public SubscriberDto findSubscriberById(Long id) {
        Optional<Subscriber> subscriber = subscriberRepository.findById(id);

        if (!subscriber.isPresent()) {
            return null;
        }

        return subscriberMapper.fromEntityToDto(subscriber.get());
    }

    public PageableDto findSubscriberByJmbg(String jmbg, int page) {
        Page<Subscriber> subscribers;
        if (jmbg.trim().isEmpty()) {
            subscribers = subscriberRepository.findAll(PageRequest.of(page, PAGE_SIZE));
        } else {
            subscribers = subscriberRepository.findByJmbg(jmbg, PageRequest.of(page, PAGE_SIZE));
        }

        PageableDto subscribersDto = new PageableDto();
        for (Subscriber s : subscribers) {
            subscribersDto.getObjects().add(subscriberMapper.fromEntityToDto(s));
        }

        subscribersDto.setHasNext(subscribers.hasNext());
        subscribersDto.setHasPrevious(subscribers.hasPrevious());
        subscribersDto.setSliceNumber(subscribers.getNumber());
        subscribersDto.setTotalElements(subscribers.getTotalElements());
        subscribersDto.setTotalNumberOfPages(subscribers.getTotalPages());

        return subscribersDto;
    }
}
