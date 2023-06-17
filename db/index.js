const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/contacts.json');

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async id => {
  const allContacts = await getAll();
  return allContacts.find(el => el.id === id) || null;
};

const add = async data => {
  const allContacts = await getAll();
  const newContact = { id: nanoid(), ...data };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateById = async (id, data) => {
  const allContacts = await getAll();
  const index = allContacts.findIndex(el => el.id === id);
  if (index === -1) return null;
  allContacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

const deleteById = async id => {
  const allContacts = await getAll();
  const index = allContacts.findIndex(el => el.id === id);
  if (index === -1) return null;
  const [deletedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
};

module.exports = { getAll, getById, add, updateById, deleteById };
