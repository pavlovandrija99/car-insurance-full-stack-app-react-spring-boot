package com.synechron.backend_app.mapper;

import com.synechron.backend_app.dtos.ContactDto;
import com.synechron.backend_app.models.Contact;
import org.springframework.stereotype.Component;

@Component
public class ContactMapper implements BaseMapper<Contact, ContactDto>{
    @Override
    public ContactDto fromEntityToDto(Contact e) {
        return ContactDto.builder()
                .Id(e.getId())
                .mobilePhone(e.getMobilePhone())
                .homePhone(e.getHomePhone())
                .email(e.getEmail())
                .build();
    }

    @Override
    public Contact fromDtoToEntity(ContactDto contactDto) {
        return null;
    }
}
