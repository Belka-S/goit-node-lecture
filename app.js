const { program } = require('commander');
const readline = require('readline');
require('colors');

const contacts = require('./db');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'read':
      const allContacts = await contacts.getAll();
      return console.log(allContacts);
    case 'getById':
      const oneContact = await contacts.getById(id);
      return console.log(oneContact);
    case 'add':
      const newContact = await contacts.add({ name, email, phone });
      return console.log(newContact);
    case 'updateById':
      const updatedContact = await contacts.updateById(id, { name, email, phone });
      return console.log(updatedContact);
    case 'deleteById':
      const deletedContact = await contacts.deleteById(id);
      return console.log(deletedContact);

    default:
      return console.log('Unknown action');
  }
};

program
  .option('-a, --action, <type>')
  .option('-i, --id, <value>')
  .option('-n, --name, <value>')
  .option('-e, --email, <value>')
  .option('-p, --phone, <value>');

program.parse();

const options = program.opts();
console.log(options);
invokeAction(options);

const modifyJson = () => {
  rl.question('Choose action: r (read), g (getById), a (add), u (updateById), d (deleteById)?'.yellow, value => {
    switch (value) {
      case 'r':
        rl.question(`To read you need to enter: -a -r (--read), take your choice! `.green, value => {
          invokeAction();

          modifyJson();
        });

        break;

      default:
        console.log('Wrong action!'.red);
        modifyJson();
        break;
    }
  });
};

// modifyJson();
invokeAction();

// -------------------------------------------yargs------------------------------------------ //

// const yargs = require('yargs');
// const { hideBin } = require('yargs/helpers');

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// invokeAction(argv);

// ------------------------------------------------------------------------------------------ //

// invokeAction({ action: 'read' });
// invokeAction({ action: 'getById', id: 'qdggE76Jtbfd9eWJHrssH' });
// invokeAction({ action: 'add', name: 'LeBron James', email: 'bron@mail.com', phone: '(253) 268-9375' });
// invokeAction({ action: 'updateById', id: 'qdggE76Jtbfd9eWJHrssH', name: 'Michael Jordan', email: 'bron@mail.com', phone: '(253) 268-9375' });
// invokeAction({ action: 'deleteById', id: 'dRpUz79kQa0qPrBQR5jWr' });

// const actionIndex = process.argv.indexOf('--action');
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   actionIndex({ action });
// }
