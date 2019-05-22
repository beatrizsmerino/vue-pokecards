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
            count: 0,
            win: false,
        }
    },
    computed: {
        uncoveredCards(){
            return [...this.pairedCards, ...this.selectedCards];
        },
        coveredCards() {
            let coveredCards = this.cards.filter(card => !this.uncoveredCards.includes(card));

            if (coveredCards.length == 0) {
                this.win = true;
            } else {
                this.win = false;
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
                })
            },
        }
    },
    methods: {
        selectCard(card) {
            this.selectedCards.push(card);
            if (this.selectedCards.length === 2) {
                this.count++;
                
                const [card1, card2] = this.selectedCards;
                if (card1.pair === card2.pair) {
                    this.pairedCards = this.pairedCards.concat(this.selectedCards);
                }
                setTimeout(() => {
                    this.selectedCards = [];
                }, 500);
            }
        }
    },
})