package com.synechron.backend_app.exceptions;

public class FailedDeserializationException extends RuntimeException{
    public FailedDeserializationException(String message) {
        super(message);
    }
}
