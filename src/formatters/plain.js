import _ from 'lodash';

const makeAddedLine = (key, value) => `Property '${key}' was added with value: ${value}`;

const makeRemovedLine = (key) => `Property '${key}' was removed`;

const makeChangedLine = (key, oldVal, newVal) => `Property '${key}' was updated. From ${oldVal} to ${newVal}`;

const stringifyValue = (val) => {
  if (_.isPlainObject(val)) {
    return '[complex value]';
  }
  if (_.isString(val)) {
    return `'${val}'`;
  }
  return val;
};

export default (nodes) => {
  const iter = ({
    type, key, value, valuesObj, children,
  }, keysChain = []) => {
    const keysChainCopy = [...keysChain, key];
    const keyProp = keysChainCopy.join('.');
    switch (type) {
      case 'added':
        return makeAddedLine(keyProp, stringifyValue(value));
      case 'removed':
        return makeRemovedLine(keyProp);
      case 'nested':
        return children.flatMap((child) => iter(child, keysChainCopy));
      case 'changed': {
        const { oldValue, newValue } = valuesObj;
        return makeChangedLine(keyProp, stringifyValue(oldValue), stringifyValue(newValue));
      }
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown state: ${type}`);
    }
  };

  return nodes.flatMap((node) => iter(node)).filter((line) => line !== null).join('\n');
};
