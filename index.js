// index.js
const express = require('express');
const cors = require('cors');
const EventRouter = require('./src/controllers/EventController.js');
const TwilioRouter = require('./src/controllers/twilioController.js');  // Agregado
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 6543;
app.use(bodyParser.json());
console.log(process.env.PORT);

app.use(cors());
app.use(express.json());
app.use("/front", express.static("public"));

app.use('/eventos', EventRouter);
app.post('/messages/send', TwilioRouter.sendMessage);  // Agregado

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
