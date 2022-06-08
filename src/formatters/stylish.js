import isPlainObject from 'lodash/isPlainObject.js';

const SPACER = ' ';
const INDENT = 4;

const genSpace = (size) => SPACER.repeat(size);

const makeFlatString = (key, value, spaceSize, sign = '') => {
  const data = sign ? [sign, `${key}:`, `${value}`].join(' ') : [`${key}:`, `${value}`].join(' ');
  return [genSpace(spaceSize), data].join('');
};

const makeNestedString = (flatStringsArr, spaceSize = 0) => [
  '{',
  flatStringsArr.join('\n'),
  `${genSpace(spaceSize)}}`,
].join('\n');

const stringifyValue = (value, spaceSize) => {
  if (isPlainObject(value)) {
    const arr = Object.entries(value)
      .map(([key, val]) => {
        const stringifiedValue = stringifyValue(val, spaceSize + INDENT);
        return makeFlatString(key, stringifiedValue, spaceSize);
      });
    return makeNestedString(arr, spaceSize - INDENT);
  }
  return value;
};

export default (nodes) => {
  const iter = ({
    type, key, value, valuesObj, children,
  }, spaceSize = 4) => {
    const stringifiedValue = stringifyValue(value, spaceSize + INDENT);
    switch (type) {
      case 'added':
        return makeFlatString(key, stringifiedValue, spaceSize - INDENT / 2, '+');
      case 'removed':
        return makeFlatString(key, stringifiedValue, spaceSize - INDENT / 2, '-');
      case 'nested': {
        const childrenArr = children.map((child) => iter(child, spaceSize + INDENT));
        const nestedData = makeNestedString(childrenArr, spaceSize);
        return makeFlatString(key, nestedData, spaceSize);
      }
      case 'unchanged':
        return makeFlatString(key, stringifyValue(value, spaceSize + INDENT), spaceSize);
      case 'changed': {
        const { oldValue, newValue } = valuesObj;
        const stringifiedOldVal = stringifyValue(oldValue, spaceSize + INDENT);
        const stringifiedNewVal = stringifyValue(newValue, spaceSize + INDENT);
        return [
          makeFlatString(key, stringifiedOldVal, spaceSize - INDENT / 2, '-'),
          makeFlatString(key, stringifiedNewVal, spaceSize - INDENT / 2, '+'),
        ].join('\n');
      }
      default:
        return null;
    }
  };

  const outputArr = nodes.map((node) => iter(node));
  return makeNestedString(outputArr);
};
