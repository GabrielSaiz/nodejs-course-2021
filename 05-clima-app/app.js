const { inquirerMenu, inquirerPausa } = require('./helpers/inquirer');

console.log('APP CLIMA STARTING');

// console.clear();
const main = async () => {
  let opt = '';
  do {
    opt = await inquirerMenu();

    if (opt !== '0') {
      await inquirerPausa();
    }
  } while (opt !== '0');
};

main();
