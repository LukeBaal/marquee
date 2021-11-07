const axios = require('axios');

const host = 'localhost';

async function test() {
  let { data } = await axios.get(
   `http://localhost/containers/json?{"status":["running"]}`,
   {
     socketPath: '/var/run/docker.sock',
   }
 );

 console.log(data);
}

test();