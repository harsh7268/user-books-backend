const express = require('express');
const cors = require('cors');
const dbConnection = require('./db');
dbConnection();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/books", require("./routes/books"));


app.listen(port, () =>{
    console.log(`Server is connected on the port no. ${port}`);
})