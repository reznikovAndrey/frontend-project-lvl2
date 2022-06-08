import toStylish from './stylish.js';

export default (format, data) => {
  switch (format) {
    case 'stylish':
      return toStylish(data);
    default:
      throw new Error(`Unknown output format: ${format}`);
  }
};
