const express = require('express');
const path = require('path');
const { v4 } = require('uuid');

const app = express();

console.log('APP', app);

let CONTACTS = [
  {
    id: v4(),
    name: 'Илья',
    value: '+7 926-700-50-50',
    marked: false,
  },
];

app.use(express.json());

app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS);
  }, 1000);
});

app.post('/api/contacts', (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter((cont) => cont.id !== req.params.id);
  res.status(200).json({ message: 'Контакт был удалён' });
});

app.put('/api/contacts/:id', (req, res) => {
  const inx = CONTACTS.findIndex((cont) => cont.id === req.params.id);
  CONTACTS[inx] = req.body;
  res.json(CONTACTS[inx]);
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
  console.log('server has been started on port 3000...');
});
