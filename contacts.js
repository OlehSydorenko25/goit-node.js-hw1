const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

console.log(contactsPath);

const parseData = (data) => {
    return JSON.parse(data)
}

function listContacts() {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      try {
          const contactsDta = parseData(data)
          console.table(contactsDta)
      } catch (err) {
          console.log('listContacts error: ', err);
      }
  })
}

function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      try {
          const contactsData = parseData(data)
          const getContact = contactsData.find((contact) => contact.id === contactId)
          console.table(getContact);
      } catch (err) {
          console.log('getContactById error: ', err);
      }
  })
}

function removeContact (contactId) {
     fs.readFile(contactsPath, "utf-8", (err, data) => {
        try {
            const contactsData = parseData(data)
            const deleteContact = contactsData.filter((contact) => contact.id !== contactId)

            fs.writeFile(contactsPath, JSON.stringify(deleteContact), () => {
                console.table(deleteContact);
            })
        } catch (err) {
            console.log('removeContact error: ', err);
        }
  })
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        try {
            const contactsData = parseData(data)
            const newContact = { name, email, phone }
            const allContacts = [...contactsData, newContact]

            fs.writeFile(contactsPath, JSON.stringify(allContacts), () => {
                console.log('Contact was added')
                console.table(allContacts);
            })
        } catch (err) {
            console.log('addContact erroe: ', err);
        }
 })
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};