const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const productService = require('./routes/product');
var cors = require('cors');

//cros-origin 
app.use(cors());
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

//read the json data from API
app.use(express.json());
//extended the request data from API
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/productservice', productService);
//port number
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`));

