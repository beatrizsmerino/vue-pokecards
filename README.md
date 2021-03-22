![shieldsIO](https://img.shields.io/github/issues/beatrizsmerino/vue-pokecards)
![shieldsIO](https://img.shields.io/github/forks/beatrizsmerino/vue-pokecards)
![shieldsIO](https://img.shields.io/github/stars/beatrizsmerino/vue-pokecards)

# Vue pokecards
### Game of couples of Pokémon cards made with vue.js.

![Image of App Vue pokecards](https://github.com/beatrizsmerino/vue-pokecards/blob/master/README/images/vue-pokecards.jpg)



## Description
Vue pokecards is a good memory game of couples of Pokémon cards.
This game, also known as Memory or Couple Search, is a game where the cards are face down. In each turn, two of them turn; if the image is the same, they remain facing up; otherwise, they turn again. The objective of the game is to find the couples.



## Development interface

![Vue logo](https://github.com/beatrizsmerino/vue-pokecards/blob/master/README/images/vue-js-2.jpg)

Is developed with **[vue.js](https://vuejs.org/)** 2.6.10 a Javascript framework and ECMAScript 6. This project use hasn't dependencies but you need `npm install`.

Use a API for get the data pairs about Pokémon:
- 4: [https://api.jsonbin.io/b/5cd2137a4c004c0eb4950d03](https://api.jsonbin.io/b/5cd2137a4c004c0eb4950d03)
- 6: [https://api.jsonbin.io/b/5cd213c964d4fc359ead3a5a](https://api.jsonbin.io/b/5cd213c964d4fc359ead3a5a)
- 8: [https://api.jsonbin.io/b/5cd213f6c07f283511e1c251](https://api.jsonbin.io/b/5cd213f6c07f283511e1c251)

## Content
**It is composed of 2 files:**
1. *index.html*
[HTML-based template syntax](https://vuejs.org/v2/guide/syntax.html). Structure html with interpolations, bind attributes... This file include below the framework Vue and a file with the application development.
2. *main.js*
[The Vue instance](https://vuejs.org/v2/guide/instance.html). Development of the code with data and methods to create your desired behavior.

It has a [CDN link to Framework Vue.js v2.6.10](https://unpkg.com/vue). Development version, includes helpful console warnings.

```html
<script src="https://unpkg.com/vue"></script>
<script src="main.js"></script>
```


## How work
This game has 3 difficulties according to the number of cards (4, 6 and 8). In the last level of difficulty the attempts are counted and the number of failed times, when the 3 opportunities are exceeded it is lost.

### Requirements and functionalities

#### Vue data
- **selectedDeck** -> default number of cards
- **cards** -> all cards chosen according to the number of couples selected
- **pairedCards** -> selected cards that it is a couple
- **selectedCards** -> selected cards to verify whether or not it was a couple
- **gameData** -> setting according to the difficulty (attemps, fails, oppotunities)
- **gameResult** -> game result data (finish, win and over)
- **gameReset** -> game state

#### Vue computed properties
- uncoveredCards()
- coveredCards()

#### Vue watch
- selectedDeck -> call to API

#### Vue methods
- randomCards()
- selectCard()
- resetGame()



## Project setup
```
npm install
```


## Continue...
> Don't stop learn. It is a basic example to start learning vue and practice the data, computed properties, methods and watch. :wink: