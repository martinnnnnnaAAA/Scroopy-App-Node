const express = require('express');
const cors = require('cors');
const EventRouter = require('./src/controllers/EventController')
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 6543;

console.log(process.env.PORT)

app.use(cors());
app.use(express.json());
app.use("/front", express.static("public"));

app.use('/eventos', EventRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});