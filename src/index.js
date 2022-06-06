import _ from 'lodash';

import getParsedData from './parsers.js';

const getDiff = (filepath1, filepath2) => {
  const fileObj1 = getParsedData(filepath1);
  const fileObj2 = getParsedData(filepath2);

  const keys = _.sortBy(Object.keys({ ...fileObj1, ...fileObj2 }));

  const result = keys.map((key) => {
    const val1 = fileObj1[key];
    const val2 = fileObj2[key];

    if (!_.has(fileObj1, key)) {
      return { type: 'added', key, val: val2 };
    }

    if (!_.has(fileObj2, key)) {
      return { type: 'removed', key, val: val1 };
    }

    if (val1 !== val2) {
      return { type: 'changed', key, val: [val1, val2] };
    }

    return { type: 'unchanged', key, val: val1 };
  });

  const outputResult = result.map(({ type, key, val }) => {
    switch (type) {
      case 'added':
        return `  + ${key}: ${val}`;
      case 'removed':
        return `  - ${key}: ${val}`;
      case 'changed': {
        const [val1, val2] = val;
        const str1 = `  - ${key}: ${val1}`;
        const str2 = `  + ${key}: ${val2}`;
        return [str1, str2].join('\n');
      }
      case 'unchanged':
        return `    ${key}: ${val}`;
      default:
        return '';
    }
  });

  return `{\n${outputResult.join('\n')}\n}`;
};

export default getDiff;
