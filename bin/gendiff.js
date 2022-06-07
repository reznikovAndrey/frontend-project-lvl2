#!/usr/bin/env node

import { program } from 'commander';

import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .version('1.0.0')
  .action((filepath1, filepath2, format) => console.log(genDiff(filepath1, filepath2, format)))
  .parse(process.argv);
