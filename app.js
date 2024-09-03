const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5004;
const connectDB = require("./auth/db");
const apiRoutes = require("./routes/api");
const cors = require('cors')
//Database Connection
connectDB();


const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
 
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());
// app.use(bodyParser.urlencoded());
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
