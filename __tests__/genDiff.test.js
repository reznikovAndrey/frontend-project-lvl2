import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  beforeAll, test, expect, describe,
} from '@jest/globals';

import genDiff from '../src/index.js';

let expectedData;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

beforeAll(() => {
  expectedData = fs.readFileSync(getFixturePath('expect.txt')).toString();
});

describe('test genDiff', () => {
  test('empty', () => {
    const emptyJSON = getFixturePath('empty.json');
    const emptyYAML = getFixturePath('empty.yaml');
    expect(genDiff(emptyJSON, emptyYAML, 'stylish')).toBe('{\n\n}');
  });

  test('same formats', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedData);
  });

  test('different formats', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedData);
  });
});

export default getFixturePath;
