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
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      modifyJson();
      break;
    case 'get':
      const oneContact = await contacts.getContact(id);
      console.log(oneContact);
      modifyJson();
      break;
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      modifyJson();
      break;
    case 'updateContact':
      const updatedContact = await contacts.updateContact(id, { name, email, phone });
      console.log(updatedContact);
      modifyJson();
      break;
    case 'delete':
      const deletedContact = await contacts.deleteContact(id);
      console.log(deletedContact);
      modifyJson();
      break;
    default:
      console.log('Unknown action');
      modifyJson();
      break;
  }
};

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <value>', 'user id')
  .option('-n, --name <value>', 'user name')
  .option('-e, --email <value>', 'user email')
  .option('-p, --phone <value>', 'user phone');

// program.parse(process.argv);
// const optionsObgect = program.opts();
// invokeAction(optionsObgect);

const modifyJson = () => {
  const splitString = params =>
    (' ' + params).split(/\s+-/).reduce((acc, el, i) => {
      if (i > 0) {
        acc.push('-' + el.substring(0, 1));
        acc.push(el.substring(2));
      }
      return acc;
    }, []);

  rl.question('Choose action: l (list), g (get), a (add), u (update), d (delete)? '.yellow, value => {
    switch (value) {
      case 'l':
        program.parse(['--action', 'list'], { from: 'user' });
        invokeAction(program.opts());
        break;
      case 'g':
        rl.question('Enter -i <id>: '.green, params => {
          program.parse(['--action', 'get', ...params.split(/\s+/)], { from: 'user' });
          invokeAction(program.opts());
        });
        break;
      case 'a':
        rl.question('Enter -n <name> -e <email> -p <phone>: '.green, params => {
          program.parse(['--action', 'add', ...splitString(params)], { from: 'user' });
          invokeAction(program.opts());
        });
        break;
      case 'u':
        rl.question('Enter -i <id> -n <name> -e <email> -p <phone>: '.green, params => {
          program.parse(['--action', 'updateContact', ...splitString(params)], { from: 'user' });
          invokeAction(program.opts());
        });
        break;
      case 'd':
        rl.question('Enter -i <id>: '.green, params => {
          program.parse(['--action', 'delete', ...params.split(/\s+/)], { from: 'user' });
          invokeAction(program.opts());
        });
        break;
      default:
        console.log('Wrong action!'.red);
        modifyJson();
        break;
    }
  });
};

modifyJson();
