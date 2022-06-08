import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import getParsedData from './parsers.js';
import getFormattedData from './formatters/index.js';

const checkChildren = (val1, val2) => (_.isPlainObject(val1) && _.isPlainObject(val2));

export default (filepath1, filepath2, format = 'stylish') => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));

  const fileObj1 = getParsedData(file1, filepath1);
  const fileObj2 = getParsedData(file2, filepath2);

  const iter = (obj1, obj2) => {
    const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
    return keys.map((key) => {
      if (!_.has(obj1, key)) {
        return { key, type: 'added', value: obj2[key] };
      }
      if (!_.has(obj2, key)) {
        return { key, type: 'removed', value: obj1[key] };
      }
      const haveChildren = checkChildren(obj1[key], obj2[key]);
      if (haveChildren) {
        return { key, type: 'nested', children: iter(obj1[key], obj2[key]) };
      }
      return obj1[key] === obj2[key]
        ? { key, type: 'unchanged', value: obj1[key] }
        : { key, type: 'changed', valuesObj: { oldValue: obj1[key], newValue: obj2[key] } };
    });
  };
  const nodes = iter(fileObj1, fileObj2);
  return getFormattedData(format, nodes);
};
