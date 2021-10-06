package com.egor.radit.controller;

import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Award;
import com.egor.radit.repository.AwardRepository;
import com.egor.radit.service.PaymentGatewayService;
import com.stripe.exception.CardException;
import com.stripe.model.Charge;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class AwardController {

    private final PaymentGatewayService paymentGatewayService;
    private final AwardRepository awardRepository;

    @PostMapping("/charge")
    public String chargeCard(@RequestHeader(value = "token") String token, @RequestHeader(value = "id") long id) throws Exception {
        Award award = awardRepository.findById(id).orElseThrow(() -> new RaditException("Award not found"));
        Charge charge = new Charge();
        try {
            charge = paymentGatewayService.chargeNewCard(token, award.getPrice());
            System.out.println(charge.getAmount());
            System.out.println(charge.getAmountCaptured());
            System.out.println(charge.getOrder());
            System.out.println(charge.getCalculatedStatementDescriptor());
            System.out.println(charge.getApplication());
            System.out.println(charge.getPaid());
            System.out.println(charge.getStatus());
        } catch (CardException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getUserMessage());
            System.out.println(e.getCharge());
            System.out.println(e.getParam());
            System.out.println(e.getCode());
            System.out.println(e.getStatusCode());
            System.out.println(e.getStripeError());
        }
        return charge.toJson();
    }
}
