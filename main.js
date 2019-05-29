const urls = {
    4: 'https://api.jsonbin.io/b/5cd2137a4c004c0eb4950d03',
    6: 'https://api.jsonbin.io/b/5cd213c964d4fc359ead3a5a',
    8: 'https://api.jsonbin.io/b/5cd213f6c07f283511e1c251',
};

const app = new Vue({
    el: '#app',
    data() {
        return {
            selectedDeck: 4,
            cards: [],
            pairedCards: [],
            selectedCards: [],
            gameData: {
                default: {
                    attempts: 0,
                    fails: 0,
                    opportunities: 4,
                    difficult: false,
                },
                changed:{
                    attempts: 0,
                    fails: 0,
                    opportunities: 4
                }
            },
            gameResult: {
                finish: false,
                win: false,
                over: false
            },
            gameReset: false,
        }
    },
    computed: {
        uncoveredCards() {
            let uncoveredCards = [...this.pairedCards, ...this.selectedCards];
            return uncoveredCards;
        },
        coveredCards() {

            let coveredCards = this.cards.filter(card => !this.uncoveredCards.includes(card));

            if (this.gameReset) {
                coveredCards = this.cards;
                this.gameReset = false;
                this.gameResult.finish = false;
            }
            
            if (coveredCards.length == 0) {
                this.gameResult.finish = true;
                this.gameResult.win = true;
            } else {
                this.gameResult.win = false;
            }

            if (this.selectedDeck == 8) {
                this.gameData.default.difficult = true;
                if (this.gameData.changed.opportunities == 0) {
                    this.gameResult.over = true;
                    this.gameResult.finish = true;
                }
            } else {
                this.gameData.default.difficult = false;
            }

            return coveredCards;
        },
    },
    watch: {
        selectedDeck: {
            immediate: true,
            handler() {
                fetch(urls[this.selectedDeck])
                .then(res => res.json())
                .then(cards => {
                    this.cards = cards;
                    this.randomCards();
                    this.gameData.changed.attempts = this.gameData.default.attempts;
                    this.gameData.changed.fails = this.gameData.default.fails;
                    this.gameData.changed.opportunities = this.gameData.default.opportunities;
                })
            },
        }
    },
    methods: {
        randomCards() {
            this.cards.sort(() => Math.random() - 0.5)
        },
        selectCard(card) {
            this.selectedCards.push(card);
            if (this.selectedCards.length === 2) {
                this.gameData.changed.attempts++;

                const [card1, card2] = this.selectedCards;
                if (card1.pair === card2.pair) {
                    this.pairedCards = this.pairedCards.concat(this.selectedCards);
                } else{
                    this.gameData.changed.fails++;
                    if (this.gameData.default.difficult) { 
                        this.gameData.changed.opportunities--;
                    }
                }

                setTimeout(() => {
                    this.selectedCards = [];
                }, 500);
            }
        },
        resetGame() {
            this.randomCards();
            this.pairedCards = [];
            this.selectedCards = [];
            this.gameData.changed.attempts = this.gameData.default.attempts;
            this.gameData.changed.fails = this.gameData.default.fails;
            this.gameData.changed.opportunities = this.gameData.default.opportunities;
            this.gameData.win = false;
            this.gameData.over = false;
            this.gameReset = true;
        }
    },
})