package com.synechron.backend_app.services;

import com.synechron.backend_app.models.CardType;
import com.synechron.backend_app.repositories.CardTypeRepository;
import org.springframework.stereotype.Service;

@Service
public class CardTypeService {
    private CardTypeRepository cardTypeRepository;

    public CardTypeService(CardTypeRepository cardTypeRepository) {
        this.cardTypeRepository = cardTypeRepository;
    }
    public CardType findCardTypeByName(String name) {
        CardType cardType = cardTypeRepository.findCardTypeByName(name);
        return cardType;
    }
}
