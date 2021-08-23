# REVERSED SPIDER SOLITAIRE
Trendyol Frontend Bootcamp Graduation Project

### Demo: https://vue-spider-solitaire.herokuapp.com/
### Technologies: Vue.js

## Game Description
A game of cards in which all the cards on the table must be in order A, 2, 3, 4, 5, 6, 7, 8 ,9 , 10, J, Q, K.

## Game Rules
* There should be 104 cards in total and 54 cards should be arranged as 4 sixes and 6 fives.
* The remaining 50 cards must be reserved as cards to be dealt.
* If the order can't be made in the game, the first 10 cards to be dealt must be dealt in order from left to right.
* The cards must always be arranged in order A, 2, 3, 4, 5, 6, 7, 8 ,9 , 10, J, Q, K.
* Only the top cards should be face up.
* After the drag, the new card should be opened.
* The game must be won when 8 ranked sets have been completed.
* A warning message should be given when unordered cards are wanted to be dragged.
* When the card is distributed, if there is an empty card space, a warning should be given and the card should not be distributed.
* Score must be calculated.150 points should be added for each card opened, and 1040 points for each series completion.Each time a hint is taken, it should be reduced by 20 points.After the game is over, it should calculate according to the elapsed time.


## Assignment
* Writing the code of the game according to the rules above.
* Writing unit tests with Jest.
* Writing e2e tests with Cypress.
* Game design should be responsive.
* Component based architectural, clean code, styling, error handling,ui/ux,ci/cd.
* Score must be at least 60 in Lighthouse tests.

## Game Preview

### Design
![spider-solitaire](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/screenshots/spider-solitaire.JPG)

### Draging Sequential Cards
![spider-solitaire-1](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/gifs/spider-solitaire-1.gif)

### Hints
![spider-solitaire-2](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/gifs/spider-solitaire-2.gif)

### Series Completion And Deal Cards
![spider-solitaire-3](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/gifs/spider-solitaire-3.gif)

### Series Completion 2
![spider-solitaire-4](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/gifs/spider-solitaire-4.gif)

### Win And Restart Game
![spider-solitaire-5](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/gifs/spider-solitaire-5.gif)


## Tests

### Unit Test Coverage With Jest
![jest-coverage](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/screenshots/jest-coverage.JPG)

### E2E Test With Cypress
![cypress-test](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/gifs/cypress-test.gif)


## Lighthouse Score
![lighthouse-score](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/screenshots/lightouse-score.JPG)


## Heroku Automatic Deploy
![heroku-automatic-deploy-1](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/screenshots/heroku-automatic-deploy.JPG)
![heroku-automatic-deploy-2](https://github.com/DamlaDemir/SpiderSolitaire/blob/main/src/assets/images/screenshots/heroku-automatic-deploy-2.JPG)

<br>

## Project setup
```
 npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Run your unit tests
```
npm run test:unit
```
```
npx jest --coverage
```

## Run your end-to-end tests
```
npm run test:e2e
```
