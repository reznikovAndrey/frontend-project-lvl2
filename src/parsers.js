import yaml from 'js-yaml';

export default (fileFormat) => {
  switch (fileFormat) {
    case '.json':
      return JSON.parse;
    case '.yaml':
      return yaml.load;
    case '.yml':
      return yaml.load;
    default:
      return null;
  }
};
