'use strict';

describe('Card', function () {
    var cardAS;
    var cardQH;
    var cardJC;
    var card10D;
    beforeEach(function () {
        cardAS = new Card('AS');
        cardQH = new Card('QH');
        cardJC = new Card('JC');
        card10D = new Card('10D');
    });
    describe('any card', function () {
        it('can be described by its rank and suit', function () {
            expect(cardAS.toString()).toEqual(new Card({rank: 'ace', suit: 'spades'}).toString());
            expect(cardQH.toString()).toEqual(new Card({rank: 'queen', suit: 'hearts'}).toString());
            expect(cardJC.toString()).toEqual(new Card({rank: 'jack', suit: 'clubs'}).toString());
            expect(card10D.toString()).toEqual(new Card({rank: '10', suit: 'diamonds'}).toString());
        });
        it('has one of four suits', function () {
            var newCup = function () {
                new Card({'rank': 'ace', 'suit': 'cups'});
            };
            expect(newCup).toThrowError(TypeError, 'invalid suit');
        });
        it('has one of thirteen ranks', function () {
            var newKnave = function () {
                new Card({'rank': 'knave', 'suit': 'hearts'});
            };
            expect(newKnave).toThrowError(TypeError, 'invalid rank');
        });
        it('has two sides', function () {
            expect(cardAS.isFaceDown()).toBe(false);
            expect(cardAS.flip().isFaceDown()).toBe(true);
            expect(cardAS.flip().turnFaceDown().isFaceDown()).toBe(true);
            expect(cardAS.turnFaceUp().isFaceDown()).toBe(false);
        });
        it('has no color, suit, or rank when face down', function () {
            var cardASFacedown = cardAS.turnFaceDown();
            expect(cardASFacedown.getColor()).toBe(null);
            expect(cardASFacedown.getSuit()).toBe(null);
            expect(cardASFacedown.getSuitShort()).toBe(null);
            expect(cardASFacedown.getSuitSymbol()).toBe(null);
            expect(cardASFacedown.isASpade()).toBe(false);
            expect(cardASFacedown.getRank()).toBe(null);
            expect(cardASFacedown.getRankNumber()).toBe(null);
        });
    });

    describe('the ace of spades', function () {           // https://www.youtube.com/watch?v=RvK7PCO6T0M
        it('is black', function () {
            expect(cardAS.isBlack()).toBe(true);
            expect(cardAS.isRed()).toBe(false);
            expect(cardAS.getColor()).toBe('black');
            expect(cardAS.getColorShort()).toBe('B');
        });
        it('is a spade', function () {
            expect(cardAS.isASpade()).toBe(true);
            expect(cardAS.getSuit()).toBe('spades');
            expect(cardAS.getSuitShort()).toBe('S');
            expect(cardAS.getSuitSymbol()).toBe('♠');
        });
        it('is an ace', function () {
            expect(cardAS.getRank()).toBe('ace');
            expect(cardAS.getRankShort()).toBe('A');
            expect(cardAS.getRankNumber()).toBe(1);
        });
    });

    describe('the queen of hearts', function () {
        it('is red', function () {
            expect(cardQH.isRed()).toBe(true);
            expect(cardQH.isBlack()).toBe(false);
            expect(cardQH.getColor()).toBe('red');
            expect(cardQH.getColorShort()).toBe('R');
        });
        it('is a heart', function () {
            expect(cardQH.isAHeart()).toBe(true);
            expect(cardQH.getSuit()).toBe('hearts');
            expect(cardQH.getSuitShort()).toBe('H');
            expect(cardQH.getSuitSymbol()).toBe('♥');
        });
        it('is a queen', function () {
            expect(cardQH.getRank()).toBe('queen');
            expect(cardQH.getRankShort()).toBe('Q');
            expect(cardQH.getRankNumber()).toBe(12);
        });
    });

    describe('the jack of clubs', function () {
        it('is black', function () {
            expect(cardJC.isBlack()).toBe(true);
            expect(cardJC.isRed()).toBe(false);
            expect(cardJC.getColor()).toBe('black');
            expect(cardJC.getColorShort()).toBe('B');
        });
        it('is a club', function () {
            expect(cardJC.isAClub()).toBe(true);
            expect(cardJC.getSuit()).toBe('clubs');
            expect(cardJC.getSuitShort()).toBe('C');
            expect(cardJC.getSuitSymbol()).toBe('♣');
        });
        it('is a jack', function () {

            expect(cardJC.getRank()).toBe('jack');
            expect(cardJC.getRankShort()).toBe('J');
            expect(cardJC.getRankNumber()).toBe(11);
        });
    });
    describe('the ten of diamonds', function () {
        it('is red', function () {
            expect(card10D.isRed()).toBe(true);
            expect(card10D.isBlack()).toBe(false);
            expect(card10D.getColor()).toBe('red');
            expect(card10D.getColorShort()).toBe('R');
        });
        it('is a diamond', function () {
            expect(card10D.isADiamond()).toBe(true);
            expect(card10D.getSuit()).toBe('diamonds');
            expect(card10D.getSuitShort()).toBe('D');
            expect(card10D.getSuitSymbol()).toBe('♦');
        });
        it('is a ten', function () {                       // if we're being real
            expect(card10D.getRank()).toBe('ten');
            expect(card10D.getRankShort()).toBe('10');
            expect(card10D.getRankNumber()).toBe(10);
        });
    });

    describe('a spade', function () {
        it('is a spade', function () {
            expect(cardAS.isAHeart()).toBe(false);
            expect(cardAS.isAClub()).toBe(false);
            expect(cardAS.isADiamond()).toBe(false);
        });
    });
});
