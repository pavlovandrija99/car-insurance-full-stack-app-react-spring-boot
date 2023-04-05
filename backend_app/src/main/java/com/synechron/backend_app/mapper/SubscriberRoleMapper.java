package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.SubscriberRoleDto;
import com.synechron.backend_app.models.SubscriberRole;
import org.springframework.stereotype.Component;

@Component
public class SubscriberRoleMapper implements BaseMapper<SubscriberRole, SubscriberRoleDto>{
    @Override
    public SubscriberRoleDto fromEntityToDto(SubscriberRole role) {
        return SubscriberRoleDto.builder()
                .Id(role.getId())
                .name(role.getName())
                .build();
    }

    @Override
    public SubscriberRole fromDtoToEntity(SubscriberRoleDto subscriberRoleDto) {
        return null;
    }
}
