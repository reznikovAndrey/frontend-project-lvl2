import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { test, expect, describe } from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const formats = ['stylish', 'plain', 'json'];
const extensions = [['.json', '.yaml'], ['.json', '.json'], ['.yaml', '.yaml']];
const testEmptyData = [
  { format: 'stylish', expected: '{\n\n}' },
  { format: 'plain', expected: ''.toString() },
  { format: 'json', expected: JSON.stringify([]) },
];

describe('test gendiff', () => {
  describe.each(formats)('format: %s', (format) => {
    test.each(extensions)('files ext: %s %s', (ext1, ext2) => {
      const filepath1 = getFixturePath(`file1${ext1}`);
      const filepath2 = getFixturePath(`file2${ext2}`);
      const expected = fs.readFileSync(getFixturePath(`expect-${format}.txt`)).toString();
      expect(genDiff(filepath1, filepath2, format)).toBe(expected);
    });
  });

  describe('empty files', () => {
    test.each(testEmptyData)('$format', ({ format, expected }) => {
      const filepath1 = getFixturePath('empty.json');
      const filepath2 = getFixturePath('empty.yaml');
      expect(genDiff(filepath1, filepath2, format)).toBe(expected);
    });
  });
});
