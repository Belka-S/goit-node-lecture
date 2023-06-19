const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContact = async id => {
  const allContacts = await listContacts();
  return allContacts.find(el => el.id === id) || null;
};

const addContact = async data => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (id, data) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(el => el.id === id);
  if (index === -1) return null;
  allContacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

const deleteContact = async id => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(el => el.id === id);
  if (index === -1) return null;
  const [deletedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
};

module.exports = { listContacts, getContact, addContact, updateContact, deleteContact };
