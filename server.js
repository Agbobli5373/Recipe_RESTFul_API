const http = require("http");
const app = require("./app/app");
require("./config/dbConnect");
require("dotenv").config() ;

const server = http.createServer(app);
const PORT = process.env.PORT || 5000 ;


server.listen(PORT, ()=>{ console.log(`The server is running on port ${PORT}`)})
