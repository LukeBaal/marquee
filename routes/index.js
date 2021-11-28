const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');
const jsyaml = require('js-yaml');
const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);

// Init cache
let cache = apicache.middleware;

router.get('/', cache('2 minutes'), async (req, res) => {
  try {
    const reqParams = url.parse(req.url, true).query;

    const type = reqParams.type;
    let API_BASE_URL = process.env[`${type}_BASE_URL`];
    let API_KEY_NAME = process.env[`${type}_KEY_NAME`];
    let API_KEY_VALUE = process.env[`${type}_KEY_VALUE`];

    delete reqParams.type

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...reqParams
    });

    const headers = {};
    if (reqParams.includeAuthHeader && reqParams.includeAuthHeader == "true") {
      headers.Authorization = `Bearer ${process.env[`${type}_KEY`]}`;
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }

    const apiResponse = await needle('get', `${API_BASE_URL}?${params}`, { headers });
    const data = apiResponse.body;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.get('/config', async (req, res) => {
  try {
    const config = await jsyaml.load(await readFile('./client/public/assets/config.yml'));
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

const fetchPortainerToken = async () => {
  try {
    const url = `${process.env.PORTAINER_URL}/api/auth`;
    const body = {
      username: process.env.PORTAINER_USER,
      password: process.env.PORTAINER_PASSWORD,
    }
    const res = await needle('post', url, body, {
      json: true,
      credentials: "include"
    });
    return res.body.jwt;
  } catch (e) {
    console.log(e);
  }
}

router.get('/portainer', async (req, res) => {
  try {
    const token = await fetchPortainerToken();
    const url = `${process.env.PORTAINER_URL}/api/endpoints?limit=100&start=0`;
    const response = await needle('get', url, {
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });
    const endpoints = response.body;

    if (endpoints.length === 0 || endpoints[0].Snapshots.length === 0) {
      res.status(404).json({ success: false, reason: "No endpoints/snapshots found"});
      return;
    }
    const endpoint = endpoints[0];
    res.status(200).json({
      success: true,
      data: {
        status: endpoint.Status === 1 ? "enabled" : "disabled",
        running: endpoint.Snapshots[0].RunningContainerCount,
        stopped: endpoint.Snapshots[0].StoppedContainerCount
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports  = router;