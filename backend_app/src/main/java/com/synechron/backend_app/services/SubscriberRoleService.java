package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.SubscriberRoleDto;
import com.synechron.backend_app.mapper.SubscriberRoleMapper;
import com.synechron.backend_app.models.SubscriberRole;
import com.synechron.backend_app.repositories.SubscriberRoleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubscriberRoleService {
    private SubscriberRoleRepository subscriberRoleRepository;
    private SubscriberRoleMapper subscriberRoleMapper;

    public SubscriberRoleService(SubscriberRoleRepository subscriberRoleRepository,
                                 SubscriberRoleMapper subscriberRoleMapper) {
        this.subscriberRoleRepository = subscriberRoleRepository;
        this.subscriberRoleMapper = subscriberRoleMapper;
    }

    public List<SubscriberRoleDto> findAll() {
        List<SubscriberRole> roles = subscriberRoleRepository.findAll();

        List<SubscriberRoleDto> rolesDto = new ArrayList<>();
        roles.forEach(role -> {
            if (!role.getIsDeleted())
                rolesDto.add(subscriberRoleMapper.fromEntityToDto(role));
        });

        return rolesDto;
    }
}
