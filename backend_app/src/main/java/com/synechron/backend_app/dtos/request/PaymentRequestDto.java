package com.synechron.backend_app.dtos.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.synechron.backend_app.mapper.CustomLocalDateTimeDeserializer;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaymentRequestDto {
    private String cardNumber;
    @JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
    private LocalDateTime paymentDate;
    private String payer;
    private String cardType;
    private String chequeNumber;
    private String bankName;
}
