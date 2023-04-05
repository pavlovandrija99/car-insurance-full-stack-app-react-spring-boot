package com.synechron.backend_app.dtos.request;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class AddDriversToProposalDto {
    private SubscriberAsDriverDto subscriber;
    private List<ExistingDriverDto> existingDrivers;
    private List<NewDriverDto> newDrivers;
}
