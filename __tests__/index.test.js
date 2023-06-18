/**
 * @jest-environment jsdom
 */
import { alphabetLetters } from '../js/game.js';

/* eslint-disable */

//const wordLists = require('./wordLists');
//const alphabetLetters = require('../js/alphabetLetters');

test('длина массива букв должна быть 33', () => {
    expect(alphabetLetters).toHaveLength(33);
  });

//test ('вордлист тип должен быть объект', () => {
 //   expect(typeof wordLists).toBe(object);
//})