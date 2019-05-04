const express = require('express');
const bodyParser = require('body-parser');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const AssistantV2 = require('ibm-watson/assistant/v2');
const app = express();

app.use(bodyParser.json());


const port = 3000;

const assistant = new AssistantV1({
    username: 'apikey',
    password: 'zE1UOb3lF-UdSwOedRKDsY_d2t4iBjuT_t-1jRD9R4KT',
    url: 'https://gateway.watsonplatform.net/assistant/api/',
    version: '2018-02-16',
});

const service = new AssistantV2({
    iam_apikey: 'zE1UOb3lF-UdSwOedRKDsY_d2t4iBjuT_t-1jRD9R4KT',
    version: '2019-02-28',
    url: 'https://gateway.watsonplatform.net/assistant/api/'
});

app.get('/new-conversation/', (req, res) => {
    service.createSession({
        assistant_id: 'fdee62ff-50e4-4a9b-af90-c22e0bc8c27a'
    })
        .then(resp => {
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.json(resp);
        })
        .catch(err => {
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.status(500).json(err);
        });
});

app.post('/message/', (req, res) => {
    console.log(req.body.session_id);
    console.log(req.body.message);
    service.message({
        assistant_id: 'fdee62ff-50e4-4a9b-af90-c22e0bc8c27a',
        session_id: req.body.session_id,
        input: req.body.message
    })
        .then(resp => {
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.json(resp);
        })
        .catch(err => {
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.status(500).json(err);
        });
});

app.post('/end-session', (req, res) => {
    service.deleteSession({
        assistant_id: 'fdee62ff-50e4-4a9b-af90-c22e0bc8c27a',
        session_id: req.body.session_id,
    })
        .then(resp => {
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.json(resp);
        })
        .catch(err => {
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.status(500).json(err);
        });
});

app.get('/conversation/:text*?', (req, res) => {
    const { text } = req.params;
    const params = {
        input: { text },
        workspace_id: 'c0f65db2-cc06-41c5-ae3d-34cd2ff8f252',
    };
    assistant.message(params, (err, response) => {
        if (err) res.status(500).json(err);

        res.json(response);
    });
});

app.listen(port, () => console.log('Escucha en el puerto ' + port));