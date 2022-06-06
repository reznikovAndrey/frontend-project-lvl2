import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export default (filepath) => {
  const file = fs.readFileSync(path.resolve(process.cwd(), filepath));
  const fileExt = path.extname(filepath);

  switch (fileExt) {
    case '.json':
      return JSON.parse(file) || {};
    case '.yaml':
      return yaml.load(file) || {};
    case '.yml':
      return yaml.load(file) || {};
    default:
      return null;
  }
};
