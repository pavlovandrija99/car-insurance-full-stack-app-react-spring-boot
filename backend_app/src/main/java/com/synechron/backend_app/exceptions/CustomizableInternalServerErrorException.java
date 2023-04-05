package com.synechron.backend_app.exceptions;

public class CustomizableInternalServerErrorException extends RuntimeException {
    public CustomizableInternalServerErrorException(String message) {
        super(message);
    }
}
