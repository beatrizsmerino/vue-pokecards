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
        }
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
})