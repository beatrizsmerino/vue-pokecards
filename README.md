![GitHub issues](https://img.shields.io/github/issues/beatrizsmerino/vue-pokecards)
![GitHub forks](https://img.shields.io/github/forks/beatrizsmerino/vue-pokecards)
![GitHub stars](https://img.shields.io/github/stars/beatrizsmerino/vue-pokecards)
![GitHub watchers](https://img.shields.io/github/watchers/beatrizsmerino/vue-pokecards)
![GitHub last commit](https://img.shields.io/github/last-commit/beatrizsmerino/vue-pokecards)

# Vue pokecards

Game of couples of Pokémon cards made with vue.js.

![Image of App Vue pokecards](README/images/vue-pokecards.gif)

## Description

Vue pokecards is a good memory game of couples of Pokémon cards.
This game, also known as Memory or Couple Search, is a game where the cards are face down. In each turn, two of them turn; if the image is the same, they remain facing up; otherwise, they turn again. The objective of the game is to find all the couples.

This game has several difficulties:

- You can select the number of pokemon you want inside the deck of cards, at the moment 4, 6, 8 or 10 pokemons are shown.  
  For example, if the number of pokemon is 8, the deck will be composed of 16 cards, 2 cards for each pokemon to establish the pair.
- If the number of pokemon is 8, 16 cards, the difficulty is increased, adding a maximum number of chances. These are reduced each time you fail and when the number of chances reaches 0 you lose.
- If the number of cards is more than 8 (for example 10 pokemons, 20 cards), a button is displayed to start a counter if you want more difficulty. When the counter or the opportunities reach 0, you lose.

## Files

The main files where the code development is located are:

1. **HTML 5** -> file `index.html`  
    This file include inside `head` tag the styles css:
	```html
	<link rel="stylesheet" href="assets/css/styles.css" />
	```

	This file include at the end of the `body` tag the scripts js:
	- The CDN link to the framework Vue
	- The link to the `js` file with the application development.

	```html
	<script src="https://unpkg.com/vue"></script>
	<script src="assets/js/main.js"></script>
	```
  
	This file uses Vue.js, which uses an [HTML-based template syntax](https://vuejs.org/v2/guide/syntax.html), that allows you to declaratively bind the rendered DOM to the underlying Vue instance’s data. A structure HTML with interpolations, directives, modifiers and shorthands (bind attributes, events...).  


2. **JS-ES8** -> file `assets/js/main.js`  
	This file contains the [Vue instance](https://vuejs.org/v2/guide/instance.html) and the development of the code JS with data, methods, computed properties, watchers... to create your desired behavior.

	```js
	const app = new Vue({
		el: "#app",
		data() {
			return {
				...
			}
		}
		computed: {
			...
		},
		watch: {
			...
		},
		methods: {
			...
		}
	});
	```

3. **CSS 3** -> file `assets/css/styles.css`   
	This project is developed with pure CSS, following the [BEM architecture](http://getbem.com/introduction/).  
	Inside the [Roboto](https://fonts.google.com/specimen/Roboto) font is imported from Google API, use css variables, use the css reset of [meyerweb.com](meyerweb.com), creation of animations based on [https://animate.style/](https://animate.style/) and load gif and svg files.

## API

![Poke API](README/images/poke-api.jpg)

The project uses the [POKE API](https://pokeapi.co/) for get all the pokemon data. As there are a lot of information about a pokemon, it is filtered and a new **JSON** is generated with the necessary information to generate the card pairs.

## Development

![Vue logo](README/images/vue-js-2.jpg)

This project is developed with **[vue.js](https://vuejs.org/)** 2.6.10, a Javascript framework.  
It does not use NPM dependencies, it includes with a [CDN link to Framework Vue.js v2.6.10](https://unpkg.com/vue), a development version, which provides useful warnings in the console.

### Vue data

- `cards` -> deck of cards
- `pairedCards` -> cards already paired
- `selectedCards` -> selected cards to verify whether or not it is a pair
- `gameData` -> data of the game as attemps, fails, oppotunities...
- `gameResult` -> game result data (finish, win and lose)
- `gameReset` -> reset the values by default of the game
- `currentDateTime` -> save/update the current date and current time
- `counter` -> save/update the counterdown
- `showLoader` -> save the status of loader

### Vue computed properties

- `uncoveredCards()` -> Returns the uncovered cards, i.e., the paired cards and selected cards.
- `coveredCards()` -> Returns the covered cards, i.e., all the not paired and the not selected.

### Vue watch

- `cards` -> Watch the list of cards was loaded for add or remove the loader animation.
- `gameData.changed.selectedDeck` -> Watch if the deck number changes, the game is restarted.
- `currentDateTime.date` -> Watch the current date and update it.
- `currentDateTime.time` -> Watch the current time and update it.
- `counter.init` -> Watch if the counter has started and starts the countdown if not reset the counter to the default value.

### Vue methods

#### Vue methods: Create cards

- `getRandomInteger(min, max)` -> Returns a random number between a specified minimum number (included) and a specified maximum number (excluded)
- `getTotalPokemon()` -> Returns the maximun number of pokemon inside the deck.
- `getPokemon(id)` -> Returns the pokemon data from the API with the specified id.
- `createPokemon(data)` -> Returns a new JSON with the data of pokemon (id, name, images...).
- `createPairs(pokemons)` -> Returns the pairs of cards from the pokemon deck. Create a new JSON separating the pokemon into 2 objects, one with the back image and one with the front image. So if the JSON was 6 pokemon, now it will be 12.
- `getPokemons(numberMax)` -> Returns the list of pokemon with his data. It looks for random numbers between 0 and the given maximum number and returns the ids of the pokemon, which are then looked up in the API to create our JSON.
- `randomCards()` -> Get the deck of cards and reorder them randomly.

#### Vue methods: Game actions

- `selectCard(card)` -> This function is executed with the event click on the card. It gets the id of the selected card and makes several checks. If the game is not finished, it saves the selected card. If only 1 card has been saved and the counter has not been started it is disabled. In case there are 2 cards selected, the number of attempts is increased, if the cards have the same id they are kept as pairs, but if not the number of fails is increased and the chances are decreased.
- `resetData()` -> Overwrite changed values of `gameData` with default values.
- `resetResult()` -> Reset `gameResult` (finish, win and lose) to default values.
- `initGame(coveredCards)` -> Restart the game, i.e. the default values have been reset and save the new deck of cards in the data `cards`.
- `resetGame()` -> Deck the cards randomly, empty the card arrays `pairedCards` and `selectedCards`, reset the data values to the default values...
- `checkResultGame()` -> Check if all cards have been uncovered to indicate that the game is finished and you have win.
- `checkDifficulty()` -> Check the difficulty according to the number of pokemon chosen from the deck. If it is 8 or more, the limit of opportunities is activated.
- `checkOportunities()` -> Check if the number of opportunities has reached 0, if so, the game ends and you lose.
- `checkLastOpportunity()` -> Check if you are on your last chance, if so, apply a css class to the html, to style and animate the box where you indicate the number of optunities you have left.
- `updatedOportunities()` -> The number of chances changes according to the number of pokemon chosen from your deck.

#### Vue methods: Current date time

- `getCurrentDate()` -> Returns the curent date without format
- `getCurrentYear()` -> Returns the current year
- `getCurrentMonth()` -> Returns the current month
- `getCurrentDay()` -> Returns the current days
- `getCurrentHours()` -> Returns the current hours
- `getCurrentMinutes()` -> Returns the current minutes
- `getCurrentSeconds()` -> Returns the current seconds
- `checkDigits(number)` -> Checks if the number has 2 digits and if not adds a 0 in front of it
- `createCurrentDateFormat()` -> Create a date with format DD/MM/YYYY
- `createCurrentTimeFormat()` -> Create a time with the format 00:00:00

#### Vue methods: Counterdown

- `setCounter()` -> Starts or end the counter
- `createCounterdown()` -> Create a counterdown of 60 seconds

#### Vue methods: Loader

- `createLoader()` -> Show the loader
- `removeLoader()` -> Hide the loader

## Continue...
> Don't stop learn. It is a basic example to start learning vue and practice the data, computed properties, methods and watch. :wink: