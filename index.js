const express = require('express');
const cors = require('cors');
const EventRouter = require('./src/controllers/EventController.js')
const MessageRouter = require('./src/controllers/MessageController.js');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 6543;
const messageController = require('./src/controllers/MessageController.js');
app.post('/api/schedule-message', messageController.scheduleMessage);
app.use(bodyParser.json());
console.log(process.env.PORT)

app.use(cors());
app.use(express.json());
app.use("/front", express.static("public"));

app.use('/eventos', EventRouter);
app.use('/mensaje', MessageRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});