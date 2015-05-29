'use strict';

/**
 * @ngdoc service
 * @name angularWhistApp.whistGame
 * @description
 * # whistGame
 * state of the game
 */

angular.module('angularWhistApp')
    .service('whistGame', ['whistShark', function (whistShark) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var self = this;
		this.data
        this.type = 'undecided';
        this.dealer = null;
        this.declarer = null;
        this.currentPlayer = null;
        this.players = {};
        this.trick = {};

        function newTrick() {
            self.trick = {
                cards: Card.Collection(),
                suit: null
            };
        }

        function newHand () {
            self.type = 'undecided';
            self.currentPlayer = null;
            self.declarer = null;
            self.players.human.newHand();
            self.players.computer.newHand();
            newTrick();
            deal();
        }
        
        function assignCard(card) {
            return {
                to: function (player, collection) {
                    player.cards.push(card);
                    collection.push(card);
                    card.location = collection;
                    card.owner = player;
                    card.played = false;
                }
            };
        }

        function cyclePlayer() {
            if(self.currentPlayer === self.players.human) {
                self.currentPlayer = self.players.computer;
            } else {
                self.currentPlayer = self.players.human;
            }
        }

        function cycleDealer() {
            if(self.dealer === self.players.human) {
                self.dealer = self.players.computer;
            } else {
                self.dealer = self.players.human;
            }
        }
        
        function nextPlayer(player) {
            if(typeof(player) === 'undefined') {
                cyclePlayer();
            } else {
                self.currentPlayer = player;
            }
            if(self.currentPlayer.isHuman === false) {
                var card = whistShark.chooseCard(self.players.computer, self);
                self.playCard(card);
            }
        }
        
        function deal() {
            var human = self.players.human,
                computer = self.players.computer,
                deck = chance.shuffle(Card.Collection.FrenchSuited52Cards());
            
            var i;
            for(i=0; i<10; ++i) {
                assignCard(deck.pop()).to(human, human.hand);
                assignCard(deck.pop()).to(computer, computer.hand);
            }
            human.hand.sort(Card.compare);
        	// Computer hand is sorted, therefore playing best card in their hand
		    computer.hand.sort(Card.compare);
            for(i=0; i<8; ++i) {
                var pile = Card.Collection();
                assignCard(deck.pop().turnFaceDown()).to(human, pile);
                assignCard(deck.pop()).to(human, pile);
                human.piles.push(pile);

                pile = Card.Collection();
                assignCard(deck.pop().turnFaceDown()).to(computer, pile);
                assignCard(deck.pop()).to(computer, pile);
                computer.piles.push(pile);
            }

            self.type = 'high';
            self.currentPlayer = self.dealer;
            cyclePlayer(); // start bidding to dealer's left
        }

        this.bid = function () {
            self.declarer = self.currentPlayer;
            nextPlayer(); // start play to declarer's left
        };

        this.pass = function () {
            if(self.currentPlayer === self.dealer) {
                self.type = 'low';
                self.declarer = self.dealer;
                nextPlayer();
            } else {
                cyclePlayer();
            }
        };
        
        function moveCard(card, newCollection) {
            var location = card.location;

            location.remove(card);
            card.owner.cards.remove(card);
            newCollection.push(card);

            if(location.length === 1 && location[0].isFaceDown()) {
                location[0].turnFaceUp();
            }
        }
        
        function trickWinner() {
            var isSuitCard = function (card) {
                return card.getSuit() === self.trick.suit;
            };
            var suitCards = self.trick.cards.filter(isSuitCard);
            return suitCards.sort(Card.compare)[0].owner;
        }

        function scoreHand() {
            // SPEC: http://www.pagat.com/whist/twoplayer.html#scoring
            var human=self.players.human,
                computer=self.players.computer;
            
            var winner;
            var scoreDifference = human.tricks.length - computer.tricks.length;
            if(self.type === 'low') {
                scoreDifference *= -1;
            }
            if(scoreDifference > 0) {
                winner = human;
            } else {
                winner = computer;
            }
            if(self.type === 'high') {
                if(self.declarer === winner) {
                    winner.score += winner.tricks.length-6;
                } else {
                    winner.score += 2*(winner.tricks.length-6);
                }
            } else {
                winner.score += 7 - winner.tricks.length;
            }
       	} 

        this.playCard = function (card) {

            moveCard(card, self.trick.cards);
            card.played = true;
            
            if(self.trick.cards.length === 1) { // first card
                self.trick.suit = card.getSuit();
            }
            
            if(this.trick.cards.length === 4) { // last card
                var winner = trickWinner();
                winner.tricks.push(self.trick);
                if(self.players.human.tricks.length + self.players.computer.tricks.length === 13) {
                    scoreHand();
                    cycleDealer();
                    newHand();
                } else {
                    newTrick();
                    nextPlayer(winner);
                }
            } else {
                nextPlayer();
            }
        };

        this.reset = function () {
            this.players = {
                human: new Player(''),                 // human player
                computer: new Player('computer',false) // not human
            };
            this.dealer = this.players.human;
            newHand();
        };
        // TODO maybe this should not happen automatically?
        this.reset();
    }]);
