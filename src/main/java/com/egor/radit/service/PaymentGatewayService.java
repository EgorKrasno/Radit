package com.egor.radit.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentGatewayService {

    public PaymentGatewayService(@Value("${STRIPE}") String stripeApiKey) {
        Stripe.apiKey = stripeApiKey;
    }

    public Charge chargeNewCard(String token, int amount) throws StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        return Charge.create(chargeParams);
    }
}
