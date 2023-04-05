package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.*;
import com.synechron.backend_app.models.Subscriber;
import org.springframework.stereotype.Component;

@Component
public class SubscriberMapper implements BaseMapper<Subscriber, SubscriberDto> {
    private AddressMapper addressMapper;
    private SubscriberRoleMapper subscriberRoleMapper;
    private ContactMapper contactMapper;

    public SubscriberMapper(AddressMapper addressMapper,
                            SubscriberRoleMapper subscriberRoleMapper,
                            ContactMapper contactMapper) {
        this.addressMapper = addressMapper;
        this.subscriberRoleMapper = subscriberRoleMapper;
        this.contactMapper = contactMapper;
    }

    @Override
    public SubscriberDto fromEntityToDto(Subscriber e) {
        return SubscriberDto.builder()
                .id(e.getId())
                .person(PersonDto.builder()
                        .firstName(e.getFirstName())
                        .lastName(e.getLastName())
                        .jmbg(e.getJmbg())
                        .birth(e.getBirth())
                        .contact(contactMapper.fromEntityToDto(e.getContact()))
                        .address(addressMapper.fromEntityToDto(e.getAddress()))
                        .build())
                .subscriberRole(subscriberRoleMapper.fromEntityToDto(e.getSubscriberRole()))
                .build();
    }

    @Override
    public Subscriber fromDtoToEntity(SubscriberDto subscriberDTO) {
        return null;
    }
}
