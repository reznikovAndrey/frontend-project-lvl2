import _ from 'lodash';

import getParsedData from './parsers.js';

const EMPTY = '   ';
const MINUS = '  -';
const PLUS = '  +';

export default (filepath1, filepath2) => {
  const fileObj1 = getParsedData(filepath1);
  const fileObj2 = getParsedData(filepath2);

  const keys = _.uniq([...Object.keys(fileObj1), ...Object.keys(fileObj2)]);

  const data = keys.reduce((acc, key) => {
    const val1 = fileObj1[key];
    const val2 = fileObj2[key];
    if (val1 === val2) {
      acc.push([EMPTY, `${key}:`, val1]);
    } else {
      if (!_.isUndefined(val1)) {
        acc.push([MINUS, `${key}:`, val1]);
      }
      if (!_.isUndefined(val2)) {
        acc.push([PLUS, `${key}:`, val2]);
      }
    }
    return acc;
  }, []);

  const result = _.sortBy(data, (([, key]) => key)).map((arr) => arr.join(' ')).join('\n');

  return `{\n${result}\n}`;
};
