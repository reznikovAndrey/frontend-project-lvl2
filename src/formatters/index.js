import toStylish from './stylish.js';
import toPlain from './plain.js';
import toJSON from './json.js';

export default (format, data) => {
  switch (format) {
    case 'stylish':
      return toStylish(data);
    case 'plain':
      return toPlain(data);
    case 'json':
      return toJSON(data);
    default:
      throw new Error(`Unknown output format: ${format}`);
  }
};
