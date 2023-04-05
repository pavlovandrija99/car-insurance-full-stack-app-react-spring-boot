package com.synechron.backend_app.exceptions;

public class NotUniqueException extends RuntimeException {
    public NotUniqueException(String message) {
        super(message);
    }
}
