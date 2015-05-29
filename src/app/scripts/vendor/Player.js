'use strict';

function Player (name, isHuman) {
    this.name = name;
    this.score = 0;
    this.cards = Card.Collection();
    this.tricks = [];
    this.piles = [];
    this.hand = Card.Collection();
    if(typeof(isHuman) === 'undefined') {
        isHuman = true;
    }
    this.isHuman = isHuman;
}
Player.prototype.newHand = function () {
    this.cards = Card.Collection();
    this.tricks = [];
    this.piles = [];
    this.hand = Card.Collection();
};
Player.prototype.reset = function () {
    this.score = 0;
    this.newHand();
};
Player.prototype.availableCards = function () {
    return this.cards.filter(function (card) {
        return !card.isFaceDown();
    });
};
Player.prototype.availableCardsInSuit = function (suit) {
    var result = this.availableCards();
    if(suit !== null) {
        result = result.filter(function (card) {
            return card.suit === suit;
        });
    }
    return result;
};
Player.prototype.canPlayInSuit = function (suit) {
    return this.availableCardsInSuit(suit).length > 0;
};
