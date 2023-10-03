const express = require('express');
const path = require('path');

const app = express();

const CONTACTS = [
  {
    id: 1,
    name: 'Илья',
    value: '+7926-700-500-500',
    marked: false,
  },
];

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
  console.log('server has been started on port 3000...');
});