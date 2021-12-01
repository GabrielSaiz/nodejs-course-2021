const axios = require('axios');

const { getFiles, getProduct } = require('./helpers/products');

console.log('STARTING LOAD PRODUCTS');

const main = async () => {
  const files = await getFiles();
  console.log(files);
  for (let i in files) {
    const product = await getProduct(files[i]);
    if (product != null) {
      //   console.log(product.code);
      // await postRegular(product);
      // await postWithStemmer(product);
      await postWithOriginal(product);
    }
  }

  async function postRegular(product) {
    try {
      const response = await axios.post(
        `http://localhost:9200/products-xxxlutz-de_at/_doc/${product.code}`,
        product,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      //   console.log(response);
      if (response.status == 200 || response.status == 201) {
        console.log(
          `${product.code} :: ${response.data._id} :: ${response.data.result} `
        );
      } else {
        console.log(`${product.code} :: ${response.status}`);
      }
    } catch (e) {
      console.log(`${product.code} :: ${e}`);
    }
  }

  async function postWithStemmer(product) {
    try {
      const response = await axios.post(
        `http://localhost:9200/products-xxxlutz-de_at_stemmer/_doc/${product.code}`,
        product,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      //   console.log(response);
      if (response.status == 200 || response.status == 201) {
        console.log(
          `${product.code} :: ${response.data._id} :: ${response.data.result} `
        );
      } else {
        console.log(`${product.code} :: ${response.status}`);
      }
    } catch (e) {
      console.log(`${product.code} :: ${e}`);
    }
  }

  async function postWithOriginal(product) {
    try {
      const response = await axios.post(
        `http://localhost:9200/products-xxxlutz-de_at-original/_doc/${product.code}`,
        product,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      //   console.log(response);
      if (response.status == 200 || response.status == 201) {
        console.log(
          `${product.code} :: ${response.data._id} :: ${response.data.result} `
        );
      } else {
        console.log(`${product.code} :: ${response.status}`);
      }
    } catch (e) {
      console.log(`${product.code} :: ${e}`);
    }
  }
};

main();
