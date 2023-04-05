package com.synechron.backend_app.dtos.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.synechron.backend_app.mapper.CustomLocalDateTimeDeserializer;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@ToString
@Getter
@Setter
public class NewSubscriberDto {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Pattern(regexp = "\\d{13}")
    private String jmbg;
    @JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
    private LocalDateTime birth; // Expects "yyyy-MM-dd" argument.
    @NotBlank
    private String subscriberRole;
    private String homePhone;
    @NotBlank
    private String mobilePhone;
    @Email
    private String email;
    @NotNull
    private Long addressId;
}
