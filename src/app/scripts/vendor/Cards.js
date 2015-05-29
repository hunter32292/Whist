'use strict';

function Card() {

    this.faceDown = false;

    function checkString(string) {
        var firstChars = string.slice(0,string.length-1);
        var lastChar = string.slice(-1);
        var validRanks = Card.Collection.FrenchSuited52Cards.ranksShort;
        var validSuits = ['S','H','C','D'];
        if(validRanks.indexOf(firstChars) === -1 ||
           validSuits.indexOf(lastChar) === -1) {
            throw new TypeError('invalid card string');
        }
    }
    function checkRank(rank) {
        if(typeof(rank) !== 'string' ||
           Card.Collection.FrenchSuited52Cards.ranks.indexOf(rank) === -1) {
            throw new TypeError('invalid rank');
        } else {
            return rank;
        }
    }
    function checkSuit(suit) {
        if(typeof(suit) !== 'string' ||
           Card.Collection.FrenchSuited52Cards.suits.indexOf(suit) === -1) {
            throw new TypeError('invalid suit');
        } else {
            return suit;
        }
    }
    
    if(arguments.length !== 1) {
        throw new Error('invalid arguments');
    }
    if(typeof(arguments[0]) === 'string') {
        var cardString = arguments[0];
        checkString(cardString);
        this.rank = cardString.slice(0,cardString.length-1);
        this.suit = Card.Collection.FrenchSuited52Cards.suitCharToStringMap[cardString.slice(-1)];
    } else if(typeof(arguments[0]) === 'object') {
        this.rank = checkRank(arguments[0].rank);
        this.suit = checkSuit(arguments[0].suit);
        if(Card.Collection.FrenchSuited52Cards.honors.indexOf(this.rank) !== -1) {
            this.rank = this.rank[0].toUpperCase();
        }
    } else {
        throw new Error('invalid arguments');
    }
}
Card.prototype.isFaceDown = function () { return this.faceDown; };
Card.prototype.toString = function () {
    if(this.isFaceDown()) {
        return '[]';
    } else {
        return this.getRankShort() + this.getSuitShort();
    }
};
Card.prototype.flip = function () {
    this.faceDown = !this.faceDown;
    return this;
};
Card.prototype.turnFaceDown = function () {
    this.faceDown = true;
    return this;
};
Card.prototype.turnFaceUp = function () {
    this.faceDown = false;
    return this;
};
Card.prototype.getColor = function () {
    if(this.isBlack()) {
        return 'black';
    } else if(this.isRed()) {
        return 'red';
    }else{
        return null;
    }
};
Card.prototype.getColorShort = function () {
    var result = this.getColor();
    if(result !== null) {
        result = result.substring(0,1).toUpperCase();
    }
    return result;
};
Card.prototype.getSuit = function () {
    if(!this.isFaceDown()) {
        return this.suit;
    } else {
        return null;
    }
};
Card.prototype.getSuitShort = function () {
    var result = this.getSuit();
    if(result !== null) {
        result = result.substring(0,1).toUpperCase();
    }
    return result;
};
Card.prototype.getSuitSymbol = function () {
    var result = null;
    if(this.isASpade()) {
        result = '♠';
    } else if(this.isAHeart()) {
        result = '♥';
    } else if(this.isAClub()) {
        result = '♣';
    } else if(this.isADiamond()) {
        result = '♦';
    }
    return result;
};
Card.prototype.isASpade = function () {
    return !this.isFaceDown() && this.suit === 'spades';
};
Card.prototype.isAHeart = function () {
    return !this.isFaceDown() && this.suit === 'hearts';
};
Card.prototype.isAClub = function () {
    return !this.isFaceDown() && this.suit === 'clubs';
};
Card.prototype.isADiamond = function () {
    return !this.isFaceDown() && this.suit === 'diamonds';
};
Card.prototype.getRank = function () {
    if(!this.isFaceDown()) {
        return Card.Collection.FrenchSuited52Cards.rankShortToStringMap[this.rank];
    } else {
        return null;
    }
};
Card.prototype.getRankShort = function () {
    if(!this.isFaceDown()) {
        if(this.getRankNumber() > 1 && this.getRankNumber() < 11) {
            return this.rank;
        } else {
            return this.rank.substring(0,1).toUpperCase();
        }
    } else {
        return null;
    }
};
Card.prototype.getRankNumber = function () {
    var rankNumbers = {A: 1, J: 11, Q: 12, K: 13};
    var result;
    if(rankNumbers[this.rank] === undefined) {
        result = parseInt(this.rank);
    } else {
        result = rankNumbers[this.rank];
    }
    if(this.isFaceDown()) {
        return null;
    } else {
        return result;
    }
};
Card.prototype.isBlack = function () {
    return this.isASpade() || this.isAClub();
};
Card.prototype.isRed = function () {
    return this.isAHeart() || this.isADiamond();
};
Card.compare = function (c1, c2) {
    var suitOrder = ['spades', 'hearts', 'clubs', 'diamonds'];
    var c1Suit = suitOrder.indexOf(c1.getSuit());
    var c2Suit = suitOrder.indexOf(c2.getSuit());
    if(c1Suit === c2Suit) {
        var c1Rank = c1.getRankNumber();
        var c2Rank = c2.getRankNumber();
        if(c1Rank === 1) {
            c1Rank = 14; // aces high
        }
        if(c2Rank === 1) {
            c2Rank = 14;
        }
        if(c1Rank < c2Rank) {
            return 1;
        } else if(c1Rank > c2Rank) {
            return -1;
        } else {
            return 0;
        }
    } else {
        if(c1Suit > c2Suit) {
            return 1;
        } else {
            return -1;
        }
    }
};



Card.Collection = function () {
    var cards = [];
    cards.push.apply(cards, arguments);
    cards.__proto__ = Card.Collection.prototype; // jshint ignore:line
    return cards;
};
Card.Collection.prototype = new Array(); // jshint ignore:line
Card.Collection.prototype.turnFaceDown = function () {
    return this.map(function (card) { return card.turnFaceDown(); });
};
Card.Collection.prototype.turnFaceUp = function () {
    return this.map(function (card) { return card.turnFaceUp(); });
};
Card.Collection.prototype.remove = function (card) {
    var index = this.indexOf(card);
    return this.splice(index,1)[0];
};


Card.Collection.FrenchSuited52Cards = function () {
    var deck = Card.Collection();
    
    for (var cardSuit of Card.Collection.FrenchSuited52Cards.suits) {
        for (var cardRank of Card.Collection.FrenchSuited52Cards.ranks) {
            deck.push(new Card({
                rank: cardRank,
                suit: cardSuit
            }));
        }
    }
    return deck;
};
Card.Collection.FrenchSuited52Cards.suits = ['spades', 'hearts', 'clubs', 'diamonds'];
Card.Collection.FrenchSuited52Cards.honors = ['king','queen','jack','ace'];
Card.Collection.FrenchSuited52Cards.ranks = ['ace','king','queen','jack','10','9','8','7','6','5','4','3','2'];
Card.Collection.FrenchSuited52Cards.ranksShort = ['A','K','Q','J','10','9','8','7','6','5','4','3','2','1'];
Card.Collection.FrenchSuited52Cards.rankShortToStringMap = {
    '2': 'two', '3':'three', '4':'four', '5':'five',
    '6':'six', '7':'seven', '8':'eight', '9':'nine',
    '10': 'ten', 'J': 'jack', 'K': 'king', 'Q': 'queen',
    'A': 'ace'
};
Card.Collection.FrenchSuited52Cards.suitCharToStringMap = {
    S: 'spades',
    H: 'hearts',
    C: 'clubs',
    D: 'diamonds'
};

Card.Multiple = function (cardsString) {
    var result = Card.Collection();
    for (var cardStr of cardsString.split(' ')) {
        result.push(new Card(cardStr));
    }
    return result;
};
