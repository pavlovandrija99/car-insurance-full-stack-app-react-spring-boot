package com.synechron.backend_app.exceptions;

public class CustomizableBadRequestException extends RuntimeException {
    public CustomizableBadRequestException(String message) {
        super(message);
    }
}
