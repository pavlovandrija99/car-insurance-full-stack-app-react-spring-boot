package com.synechron.backend_app.exceptions;

public class SubscriberNotFoundException extends RuntimeException {
    private String message;
    public SubscriberNotFoundException(String message) {
        super(message);
    }
}
