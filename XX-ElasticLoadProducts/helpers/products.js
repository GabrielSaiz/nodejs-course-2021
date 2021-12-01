const fs = require('fs');

const path = '/home/gabriel/git/other_nc/suggest-server-lucene/data/tmp';

const getFiles = () => {
  var files = fs.readdirSync(path);
  return files; //.slice(0, 1000);
};

const getProduct = (fileName) => {
  if (fileName.startsWith('product_')) {
    // console.log(`Load data from ${fileName}`);
    const info = fs.readFileSync(`${path}/${fileName}`, { encoding: 'utf-8' });
    // console.log(info);
    const product = JSON.parse(info);
    // console.log(product);

    return product;
  }

  return null;
};

module.exports = {
  getFiles,
  getProduct
};
