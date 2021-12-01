const axios = require('axios');

const { getFiles, getProduct, getData } = require('./helpers/data');

console.log('STARTING LOAD PRODUCTS');

const countries = ['de_AT', 'hr_HR'];

const main = async () => {
  const files = await getFiles();
  console.log(files);
  for (let j in countries) {
    console.log(`Country: ${countries[j]}`);
    for (let i in files) {
      const product = await getData(files[i], 'product_', countries[j]);
      if (product != null) {
        await postProduct(product, countries[j].toLowerCase());
      } else {
        const category = await getData(files[i], 'category_', countries[j]);
        if (category != null) {
          await postCategory(category, countries[j].toLowerCase());
        } else {
          const keyword = await getData(files[i], 'keyword_', countries[j]);
          if (keyword != null) {
            await postKeyword(keyword, countries[j].toLowerCase());
          }
        }
      }
    }
  }

  async function postProduct(product, locale) {
    try {
      const response = await axios.post(
        `http://localhost:9200/products-xxxlutz-${locale}/_doc/${product.code}`,
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

  async function postCategory(category, locale) {
    try {
      const response = await axios.post(
        `http://localhost:9200/categories-xxxlutz-${locale}/_doc/${category.category.code}`,
        category,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      //   console.log(response);
      if (response.status == 200 || response.status == 201) {
        console.log(
          `${category.category.code} :: ${response.data._id} :: ${response.data.result} `
        );
      } else {
        console.log(`${category.category.code} :: ${response.status}`);
      }
    } catch (e) {
      console.log(`${category.category.code} :: ${e}`);
    }
  }

  async function postKeyword(keyword, locale) {
    try {
      const response = await axios.post(
        `http://localhost:9200/keywords-xxxlutz-${locale}/_doc`,
        keyword,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      //   console.log(response);
      if (response.status == 200 || response.status == 201) {
        console.log(
          `${keyword.keyword} :: ${response.data._id} :: ${response.data.result} `
        );
      } else {
        console.log(`${keyword.keyword} :: ${response.status}`);
      }
    } catch (e) {
      console.log(`${keyword.keyword} :: ${e}`);
    }
  }
};

main();
