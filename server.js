const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const PORT = 3000;


const server = app.listen(PORT, ()=>{
  console.log(`App starting listening on Port ${PORT}`);
});
