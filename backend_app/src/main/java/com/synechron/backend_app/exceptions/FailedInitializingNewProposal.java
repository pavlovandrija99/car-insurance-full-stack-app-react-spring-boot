package com.synechron.backend_app.exceptions;

public class FailedInitializingNewProposal extends RuntimeException {
    public FailedInitializingNewProposal(String message) {
        super(message);
    }
}
