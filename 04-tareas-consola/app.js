require('colors');

const { inquirerMenu, inquirerPausa } = require('./helpers/inquirer');



console.clear();
const main = async() => {
    
    let opt = ''
    do {
        opt = await inquirerMenu();
        console.log({opt});

        if (opt !== '0') {
            await inquirerPausa();
        }

    } while (opt !== '0');
    
}

main()