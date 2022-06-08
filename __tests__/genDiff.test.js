import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  beforeAll, test, expect, describe,
} from '@jest/globals';

import genDiff from '../src/index.js';

const data = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

beforeAll(() => {
  data.filepathEmptyJSON = getFixturePath('empty.json');
  data.filepathEmptyYAML = getFixturePath('empty.yaml');
  data.filepathJSON1 = getFixturePath('file1.json');
  data.filepathJSON2 = getFixturePath('file2.json');
  data.expectedDataStylish = fs.readFileSync(getFixturePath('expect-stylish.txt')).toString();
  data.expectedDataPlain = fs.readFileSync(getFixturePath('expect-plain.txt')).toString();
  data.expectedDataJSON = fs.readFileSync(getFixturePath('expect-json.txt')).toString();
});

describe('test genDiff', () => {
  test('stylish', () => {
    const {
      filepathEmptyJSON, filepathEmptyYAML, filepathJSON1, filepathJSON2, expectedDataStylish,
    } = data;
    expect(genDiff(filepathEmptyJSON, filepathEmptyYAML, 'stylish')).toBe('{\n\n}');
    expect(genDiff(filepathJSON1, filepathJSON2)).toBe(expectedDataStylish);
  });

  test('plain', () => {
    const {
      filepathEmptyJSON, filepathEmptyYAML, filepathJSON1, filepathJSON2, expectedDataPlain,
    } = data;
    expect(genDiff(filepathEmptyJSON, filepathEmptyYAML, 'plain')).toBe('');
    expect(genDiff(filepathJSON1, filepathJSON2, 'plain')).toBe(expectedDataPlain);
  });

  test('json', () => {
    const {
      filepathEmptyJSON, filepathEmptyYAML, filepathJSON1, filepathJSON2, expectedDataJSON,
    } = data;
    expect(genDiff(filepathEmptyJSON, filepathEmptyYAML, 'json')).toBe(JSON.stringify([]));
    expect(genDiff(filepathJSON1, filepathJSON2, 'json')).toBe(expectedDataJSON);
  });
});
