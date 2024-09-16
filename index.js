const express = require('express');
const cors = require('cors');
const EventRouter = require('./src/controllers/EventController'); // Removed .js extension
const TwilioRouter = require('./src/controllers/twilioController'); // Removed .js extension
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
app.use('/messages', TwilioRouter); // Mount the TwilioRouter at the /messages path

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
