import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  beforeAll, test, expect, describe,
} from '@jest/globals';

import genDiff from '../src/index.js';

let filepathEmptyJSON;
let filepathEmptyYAML;
let filepathJSON1;
let filepathJSON2;
let expectedDataStylish;
let expectedDataPlain;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

beforeAll(() => {
  filepathEmptyJSON = getFixturePath('empty.json');
  filepathEmptyYAML = getFixturePath('empty.yaml');
  filepathJSON1 = getFixturePath('file1.json');
  filepathJSON2 = getFixturePath('file2.json');
  expectedDataStylish = fs.readFileSync(getFixturePath('expect-stylish.txt')).toString();
  expectedDataPlain = fs.readFileSync(getFixturePath('expect-plain.txt')).toString();
});

describe('test genDiff', () => {
  test('test stylish format', () => {
    expect(genDiff(filepathEmptyJSON, filepathEmptyYAML, { format: 'stylish' })).toBe('{\n\n}');
    expect(genDiff(filepathJSON1, filepathJSON2, { format: 'stylish' })).toBe(expectedDataStylish);
  });

  test('test plain format', () => {
    expect(genDiff(filepathEmptyJSON, filepathEmptyYAML, { format: 'plain' })).toBe('');
    expect(genDiff(filepathJSON1, filepathJSON2, { format: 'plain' })).toBe(expectedDataPlain);
  });
});

export default getFixturePath;
