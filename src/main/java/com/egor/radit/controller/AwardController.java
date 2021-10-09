package com.egor.radit.controller;

import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Award;
import com.egor.radit.repository.AwardRepository;
import com.egor.radit.service.PaymentGatewayService;
import com.egor.radit.service.PostService;
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
    private final PostService postService;
    private final AwardRepository awardRepository;

    @PostMapping("/charge")
    public String chargeCard(@RequestHeader(value = "token") String token, @RequestHeader(value = "awardId") long awardId, @RequestHeader(value="postId") long postId) throws Exception {
        Award award = awardRepository.findById(awardId).orElseThrow(() -> new RaditException("Award not found"));
        Charge charge;
        try {
            charge = paymentGatewayService.chargeNewCard(token, award.getPrice());
            postService.addAward(postId, award);
        } catch (CardException e) {
            throw new RaditException(e.getUserMessage());
        }
        return charge.toJson();
    }
}
