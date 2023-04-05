package com.synechron.backend_app.services;

import com.synechron.backend_app.models.PaymentMode;
import com.synechron.backend_app.repositories.PaymentModeRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentModeService {
    private PaymentModeRepository paymentModeRepository;

    public PaymentModeService(PaymentModeRepository paymentModeRepository) {
        this.paymentModeRepository = paymentModeRepository;
    }

    public PaymentMode findPaymentModeByName(String name) {
        PaymentMode paymentMode = paymentModeRepository.findPaymentModeByName(name);
        return paymentMode;
    }
}
