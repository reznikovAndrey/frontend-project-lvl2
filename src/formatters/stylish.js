const makeString = (arr) => `{\n${arr.join('\n')}\n}`;

const generateSpace = (size) => ' '.repeat(size);

export default (nodes) => {
  const iter = (node) => {
    const { type } = node;
    switch (type) {
      case 'added': {
        const { key, value } = node;
        const space = generateSpace(2);
        return `${space}+ ${key}: ${value}`;
      }
      case 'removed': {
        const { key, value } = node;
        const space = generateSpace(2);
        return `${space}- ${key}: ${value}`;
      }
      case 'unchanged': {
        const { key, value } = node;
        const space = generateSpace(4);
        return `${space}${key}: ${value}`;
      }
      case 'changed': {
        const { key, valuesObj: { oldValue, newValue } } = node;
        const space = generateSpace(2);
        return [
          `${space}- ${key}: ${oldValue}`,
          `${space}+ ${key}: ${newValue}`,
        ].join('\n');
      }
      default:
        return null;
    }
  };

  const outputArr = nodes.map((node) => iter(node));
  return makeString(outputArr);
};
