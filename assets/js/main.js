const app = new Vue({
	el: "#app",
	data() {
		return {
			maxCards: 150,
			cards: [],
			pairedCards: [],
			selectedCards: [],
			gameData: {
				default: {
					selectedDeck: 4,
					attempts: 0,
					fails: 0,
					opportunities: {
						number: 2,
						last: false
					},
					difficult: false,
				},
				changed: {
					selectedDeck: 4,
					attempts: 0,
					fails: 0,
					opportunities: {
						number: 2,
						last: false
					},
					difficult: false,
				},
			},
			gameResult: {
				finish: false,
				win: false,
				lose: false,
			},
			gameReset: false,
			current: {
				time: "00:00:00",
				date: "DD/MM/YYYY",
			},
			counter: {
				init: false,
				disabled: false,
				default: "00:00",
				changed: "00:00",
			},
		};
	},
	computed: {
		uncoveredCards() {
			let uncoveredCards = [...this.pairedCards, ...this.selectedCards];
			return uncoveredCards;
		},
		coveredCards() {
			let coveredCards = this.cards.filter(
				(card) => !this.uncoveredCards.includes(card)
			);

			this.initGame(coveredCards);
			this.checkResultGame(coveredCards);
			this.checkDifficulty();

			return coveredCards;
		},
	},
	watch: {
		"gameData.changed.selectedDeck": {
			immediate: true,
			handler(newValue) {
				this.gameData.changed.selectedDeck = parseInt(newValue);
				this.resetGame();
			},
		},
		"current.date": {
			immediate: true,
			handler() {
				this.getCurrentDateFormat();
			},
		},
		"current.time": {
			immediate: true,
			handler() {
				this.getCurrentTimeFormat();
			},
		},
		"counter.init": {
			immediate: true,
			handler() {
				if (this.counter.init) {
					this.setCounterdown();
				} else {
					this.counter.changed = this.counter.default;
				}
			},
		},
	},
	methods: {
		getRandomInteger(min, max) {
			const numberRandom = Math.floor(Math.random() * (max - min)) + min;
			// console.log("Number integer random:", numberRandom);

			return numberRandom;
		},
		async getTotalPokemon(){
			return this.maxCards;
		},
		async getPokemon(id) {
			try {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
				const data = await res.json();
				// console.log(data);

				return data;
			} catch (error) {
				console.warn(error);
			}
		},
		createPokemon(data) {
			const pokemon = {
				id: data.id,
				name: data.name,
				images: {
					game: {
						front: data.sprites.front_default,
						back: data.sprites.back_default,
					},
					png: {
						front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
					},
					svg: {
						front: data.sprites.other.dream_world.front_default,
					},
				},
			};
			// console.log(pokemon);

			return pokemon;
		},
		createPairs(pokemons) {
			let pokemonPairs = [];
			for (let index = 0; index < pokemons.length; index++) {
				const pokemon = pokemons[index];

				const pokemonFront = {
					id: pokemon.id,
					name: pokemon.name,
					image: pokemon.images.game.front,
				};
				const pokemonBack = {
					id: pokemon.id,
					name: pokemon.name,
					image: pokemon.images.game.back,
				};

				pokemonPairs.push(pokemonFront);
				pokemonPairs.push(pokemonBack);
			}
			// console.log("Pokemon pairs", pokemonPairs);

			return pokemonPairs;
		},
		async getPokemons(numberMax) {
			let pokemonId = [];
			let pokemonList = [];

			const totalPokemon = await this.getTotalPokemon();
			
			for (let index = 0; index < numberMax; index++) {
				const pokemonRandom = await this.getRandomInteger(1, totalPokemon + 1);
				if (!pokemonId.some((item) => item == pokemonRandom)) {
					pokemonId.push(pokemonRandom);
					const pokemonData = await this.getPokemon(pokemonRandom);
					const pokemonDataFormatted = await this.createPokemon(pokemonData);
					pokemonList.push(pokemonDataFormatted);
				}
			}

			// console.log(`Get ${numberMax} pokemons`, pokemonList);

			return pokemonList;
		},
		async randomCards() {
			const pokemonsList = await this.getPokemons(this.gameData.changed.selectedDeck);
			const pokemonsPairs = this.createPairs(pokemonsList);
			this.cards = pokemonsPairs;
			this.cards.sort(() => Math.random() - 0.5);
		},
		selectCard(card) {
			if (!this.gameResult.finish) {
				this.selectedCards.push(card);

				if (this.selectedCards.length === 1) {
					if (!this.counter.init) {
						this.counter.disabled = true;
					}
				} else if (this.selectedCards.length === 2) {
					this.gameData.changed.attempts++;
					const [card1, card2] = this.selectedCards;

					if (card1 !== card2) {
						if (card1.id === card2.id) {
							this.pairedCards = this.pairedCards.concat(
								this.selectedCards
							);
						} else {
							this.gameData.changed.fails++;
							if (this.gameData.changed.difficult) {
								this.gameData.changed.opportunities.number--;
							}
						}
					}

					this.checkLastOpportunity();

					setTimeout(() => {
						this.selectedCards = [];
					}, 500);
				}
			}
		},
		resetData() {
			this.gameData.changed.attempts = this.gameData.default.attempts;
			this.gameData.changed.fails = this.gameData.default.fails;
			this.gameData.changed.opportunities.number = this.gameData.default.opportunities.number;
			this.gameData.changed.opportunities.last = this.gameData.default.opportunities.last;
			this.gameData.changed.difficult = this.gameData.default.difficult;
		},
		resetResult() {
			this.gameResult.finish = false;
			this.gameResult.win = false;
			this.gameResult.lose = false;
		},
		initGame(coveredCards) {
			if (this.gameReset) {
				this.cards = coveredCards;
				this.gameReset = false;
				this.gameResult.finish = false;
			}
		},
		resetGame() {
			this.randomCards();
			this.pairedCards = [];
			this.selectedCards = [];
			this.resetData();
			this.resetResult();
			this.gameReset = true;
			this.updatedOportunities();
			this.lastOpportunity = false;
			this.counter.init = false;
			this.counter.disabled = false;
		},
		checkResultGame(coveredCards) {
			if (coveredCards.length == 0) {
				this.gameResult.finish = true;
				this.gameResult.win = true;
			}
		},
		checkDifficulty() {
			if (this.gameData.changed.selectedDeck >= 8) {
				this.gameData.changed.difficult = true;
				this.checkOportunities();
			} else {
				this.gameData.changed.difficult = false;
			}
		},
		checkOportunities() {
			if (this.gameData.changed.opportunities.number == 0) {
				this.gameResult.finish = true;
				this.gameResult.lose = true;
			}
		},
		checkLastOpportunity() {
			this.gameData.changed.difficult &&
			this.gameData.changed.opportunities.number <= 1
				? (this.gameData.changed.opportunities.last = true)
				: false;
		},
		updatedOportunities() {
			this.gameData.changed.opportunities.number = (this.gameData.changed.selectedDeck * 2) - 6;;
		},
		getCurrentDate() {
			return new Date();
		},
		getCurrentYear() {
			return this.getCurrentDate().getFullYear();
		},
		getCurrentMonth() {
			return this.getCurrentDate().getMonth() + 1;
		},
		getCurrentDay() {
			return this.getCurrentDate().getDate();
		},
		getCurrentHours() {
			return this.getCurrentDate().getHours();
		},
		getCurrentMinutes() {
			return this.getCurrentDate().getMinutes();
		},
		getCurrentSeconds() {
			return this.getCurrentDate().getSeconds();
		},
		checkDigits(number) {
			return number.toString().length < 2
				? 0 + number.toString()
				: number.toString();
		},
		getCurrentDateFormat() {
			setInterval(() => {
				const day = this.checkDigits(this.getCurrentDay());
				const month = this.checkDigits(this.getCurrentMonth());
				const year = this.checkDigits(this.getCurrentYear());

				this.current.date = `${day}/${month}/${year}`;
			}, 1000);
		},
		getCurrentTimeFormat() {
			setInterval(() => {
				const hours = this.checkDigits(this.getCurrentHours());
				const minutes = this.checkDigits(this.getCurrentMinutes());
				const seconds = this.checkDigits(this.getCurrentSeconds());

				this.current.time = `${hours}:${minutes}:${seconds}`;
			}, 1000);
		},
		setCounter() {
			this.counter.init = !this.counter.init;
		},
		setCounterdown() {
			const seconds = 60;
			const end = this.getCurrentDate().getTime() + seconds * 1000;

			let timeout = setInterval(() => {
				let counter = Math.floor((end - this.getCurrentDate().getTime()) / 1000);
				if (counter < 0) {
					counter = 0;
				}

				this.counter.changed = `${Math.floor(counter / 60)}:${("00" + Math.floor(counter % 60)).slice(-2)}`;

				if (counter === 0 && !this.gameResult.finish) {
					this.gameResult.finish = true;
					this.gameResult.lose = true;
				}

				if (this.gameResult.finish) {
					clearTimeout(timeout);
				}

				if (counter === 0 || !this.counter.init) {
					this.counter.changed = this.counter.default;
					clearTimeout(timeout);
				}
			}, 300);
		},
	},
});
