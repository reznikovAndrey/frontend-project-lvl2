import {
  test, expect, describe, beforeAll,
} from '@jest/globals';
import yaml from 'js-yaml';
import fs from 'fs';

import getParsedData from '../src/parsers.js';
import getFixturePath from './genDiff.test.js';

let pathJSON;
let parsedJSON;
let pathYAML;
let parsedYAML;

beforeAll(() => {
  pathJSON = getFixturePath('file1.json');
  parsedJSON = JSON.parse(fs.readFileSync(pathJSON));
  pathYAML = getFixturePath('file1.yaml');
  parsedYAML = yaml.load(fs.readFileSync(pathYAML));
});

describe('test parser', () => {
  test('json', () => expect(getParsedData(pathJSON)).toEqual(parsedJSON));
  test('yaml', () => expect(getParsedData(pathYAML)).toEqual(parsedYAML));
  test('yml', () => expect(getParsedData(pathYAML)).toEqual(parsedYAML));
});
