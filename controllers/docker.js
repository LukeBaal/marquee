const axios = require('axios');
const e = require('express');

const getDockerContainers = async () => {
  try {
    const res = await axios.get(
      `http://localhost/containers/json?{"status":["running"]}`,
      {
        socketPath: '/var/run/docker.sock',
      }
    );

    const containers = res.data
      .filter(container => Object.keys(container.Labels).length > 0)
      .map(container => {
        const keys = Object.keys(container.Labels)
          .filter(key => key.startsWith('marquee.'));

        if (keys.length === 0) {
          return null
        }

        return keys.reduce((obj, key) => {
            if (key === 'marquee.category') {
              // Match structure of stored applications
              obj['Category'] = {
                name: container.Labels[key]
              };
            } else {
              obj[key.replace('marquee.', '')] = container.Labels[key];
            }
            return obj;
          }, {});
      })
      .filter(container => container != null);

    return containers;
  } catch (err) {
    console.log(err);
    return [];
  }
}

getDockerContainers();

module.exports = getDockerContainers;