const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3001;
const cors = require('cors');
const path = require('path');
const app = express();
const polls = require('./routes/poll');

mongoose.connect(  "mongodb+srv://jaiswalgarima12:Garima12@cluster0.txkc4na.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connected to mongoDb'))
  .catch(err => console.log('Error occured: ', err));

app.use(cors());
app.set('view engine', 'ejs');
app.use('/static/', express.static(path.join(__dirname + '/static')));
app.use('/', polls);
app.use(express.json());

app.get('*', (req, res) => {
  res.status(404).render('notfound');
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});