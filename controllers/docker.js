const axios = require('axios');

const getDockerContainers = async () => {
  try {
    const res = await axios.get(
      `http://localhost/containers/json?{"status":["running"]}`,
      {
        socketPath: '/var/run/docker.sock',
      }
    );

    const containers = res.data;//.filter(container => Object.keys(container.Labels).length > 0);

    console.log(containers);

  } catch (err) {
    console.log(err);
    return [];
  }
}

getDockerContainers();

module.exports = getDockerContainers;