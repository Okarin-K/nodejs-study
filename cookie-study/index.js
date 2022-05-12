'use strict';
const http = require('http');
const server = http.createServer((req, res) => {
    const now = Date.now();

    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.setHeader('Set-Cookie', 'last_access=' + now + ';');

    const lastAccessTime = req.headers.cookie ? parseInt(req.headers.cookie.split('last_access=')[1]) : now;
    res.end(new Date(lastAccessTime).toString());
});

const port = 5000;
server.listen(port, () => {
    console.info(`Listening on ${port}`);
});
