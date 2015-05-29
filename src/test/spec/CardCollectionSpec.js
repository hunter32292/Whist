'use strict';

describe('Card Collection', function () {
    var collection;

    beforeEach(function () {
        collection = new Card.Collection();
    });

    it('is empty when no cards are in it', function () {
        var cardAS = new Card('AS');

        expect(collection.length === 0).toBe(true);
        collection.push(cardAS);
        expect(collection.length).toBe(1);
        var topCard = collection.pop();
        expect(collection.length === 0).toBe(true);
        expect(topCard.toString()).toBe('AS');
    });

    it('has shorthand notation', function() {
        collection = collection.concat([
            new Card('2D'),
            new Card('3H'),
            new Card('4S'),
            new Card('5C')
        ]);
        var shorthand = '2D 3H 4S 5C';
        expect(Card.Multiple(shorthand).toString()).toEqual(collection.toString());
    });

    describe('a collection holding cards', function () {
        beforeEach(function () {
            collection = Card.Multiple('10C 2D 8C 4D 8H 9H JD QH KS');
        });

        it('has a length', function () {
            //console.log(collection.$cards);
            expect(collection.length).toBe(9);
        });

        it('provides access to its cards', function () {
            expect(collection.slice(-1).toString()).toEqual('KS');
            expect(collection[0].toString()).toEqual('10C');
            expect(collection.slice(-2,-1).toString()).toEqual('QH');
            expect(collection[1].toString()).toEqual('2D');
        });

        it('can be sorted', function () {
            var original = new Card.Collection();
            for(var card of collection) {
                original.push(card);
            }
            expect(collection.toString()).toEqual(original.toString());
            collection = collection.sort(Card.compare);
            expect(collection.toString()).not.toEqual(original.toString());
            expect(collection.toString()).toEqual('KS,QH,9H,8H,10C,8C,JD,4D,2D');
        });

        it('can be turned face-down as a group', function () {
            var faceDownCards = function (card) { return card.isFaceDown(); };
            expect(collection.filter(faceDownCards).length).toBe(0);
            expect(collection.turnFaceDown().filter(faceDownCards).length).toBe(collection.length);
        });
    });

    var ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'].reverse();
    function ranksOf(suit) {
        return ranks.map(function (elem) { return elem + suit; });
    }

    describe('a whole deck of cards', function(){

        beforeEach(function () {
            collection = Card.Collection.FrenchSuited52Cards();
        });
        it('is sorted when first created', function () {
            expect(collection.toString()).toEqual(collection.sort(Card.compare).toString());
        });
        it('has 52 cards', function(){
            expect(collection.length).toEqual(52);
        });
        it('has 13 spades', function(){
            var spades = collection.filter(function (card) { return card.isASpade(); });
            expect(spades.length).toEqual(13);
            expect(spades.toString()).toEqual(ranksOf('S').join(','));
        });
        it('has 13 hearts', function(){
            var hearts = collection.filter(function (card) { return card.isAHeart(); });
            expect(hearts.length).toEqual(13);
            expect(hearts.toString()).toEqual(ranksOf('H').join(','));
        });
        it('has 13 clubs', function(){
            var clubs = collection.filter(function (card) { return card.isAClub(); });
            expect(clubs.length).toEqual(13);
            expect(clubs.toString()).toEqual(ranksOf('C').join(','));
        });
        it('has 13 diamonds', function(){
            var diamonds = collection.filter(function (card) { return card.isADiamond(); });
            expect(diamonds.length).toEqual(13);
            expect(diamonds.toString()).toEqual(ranksOf('D').join(','));
        });

    });
});
