const express = require('express');
const auth = require('http-auth');

const basic = auth.basic({ realm: 'Enquetes Area.' }, (username, password, callback) => {
    callback(username === 'guest' && password === 'xaXZJQmE');
});

const app = express();

app.get(
    '/login',
    basic.check((req, res) => {
        res.send('Basic Auth Success.');
    })
);

app.get(
    '/logout',
    basic.check((req, res) => {
        res.writeHead(401, {
            'Content-Type': 'text/plain; charset=utf-8',
        });
        res.end('ログアウトしました');
        return;
    })
);

app.listen(5000, () => {
    console.log('listen to server port: 5000');
});
