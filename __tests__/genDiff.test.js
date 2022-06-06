import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  beforeAll, test, expect, describe,
} from '@jest/globals';

import genDiff from '../src/index.js';

let expectData;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

beforeAll(() => {
  expectData = fs.readFileSync(getFixturePath('expect.txt')).toString();
});

describe('test genDiff', () => {
  test('empty', () => {
    const filepath = getFixturePath('empty.json');
    expect(genDiff(filepath, filepath)).toBe('{\n\n}');
  });

  test('mocks', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2)).toBe(expectData);
  });
});
