import yaml from 'js-yaml';
import path from 'path';

export default (file, filepath) => {
  const fileExt = path.extname(filepath);

  switch (fileExt) {
    case '.json':
      return JSON.parse(file) || {};
    case '.yaml':
      return yaml.load(file) || {};
    case '.yml':
      return yaml.load(file) || {};
    default:
      throw new Error(`Unknown file format: ${fileExt}`);
  }
};
