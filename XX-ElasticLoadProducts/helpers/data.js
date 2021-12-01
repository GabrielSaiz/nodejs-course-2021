const fs = require('fs');

const path = '/home/gabriel/git/other_nc/suggest-server-lucene/data/tmp';

const getFiles = () => {
  var files = fs.readdirSync(path);
  return files; //.slice(0, 1000);
};

const getData = (fileName, type, locale) => {
  if (fileName.startsWith(type) && fileName.includes(locale)) {
    // console.log(`Load data from ${fileName}`);
    const info = fs.readFileSync(`${path}/${fileName}`, { encoding: 'utf-8' });
    // console.log(info);
    const data = JSON.parse(info);
    // console.log(data);

    return data;
  }

  return null;
};

module.exports = {
  getFiles,
  getData
};
