import yaml from 'js-yaml';

export default (file, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(file) || {};
    case '.yaml':
      return yaml.load(file) || {};
    case '.yml':
      return yaml.load(file) || {};
    default:
      throw new Error(`Unknown file format: ${ext}`);
  }
};
