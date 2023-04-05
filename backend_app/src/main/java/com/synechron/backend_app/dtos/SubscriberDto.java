package com.synechron.backend_app.dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
@ToString
public class SubscriberDto {
    private Long id;
    private PersonDto person;
    private SubscriberRoleDto subscriberRole;
}

