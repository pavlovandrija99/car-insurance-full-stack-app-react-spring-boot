package com.synechron.backend_app.mapper;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.synechron.backend_app.exceptions.FailedDeserializationException;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CustomLocalDateTimeDeserializer extends StdDeserializer<LocalDateTime> {
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public CustomLocalDateTimeDeserializer(Class<?> vc) {
        super(vc);
    }

    public CustomLocalDateTimeDeserializer() {
        this(null);
    }

    @Override
    public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        String date = jsonParser.getText();

        try {
            return LocalDate.parse(date, DateTimeFormatter.ISO_DATE).atStartOfDay();
        } catch (Exception e) {
            e.printStackTrace();
            throw new FailedDeserializationException(e.getMessage());
        }
    }
}
