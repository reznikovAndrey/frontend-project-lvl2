import { test, expect, describe } from '@jest/globals';
import yaml from 'js-yaml';

import getParser from '../src/parsers.js';

describe('test parser', () => {
  test('json', () => expect(getParser('.json')).toEqual(JSON.parse));
  test('yaml', () => expect(getParser('.yaml')).toEqual(yaml.load));
  test('yml', () => expect(getParser('.yml')).toEqual(yaml.load));
});
