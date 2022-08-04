const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const file = process.argv[2];
const server = process.argv[3];

const options = {
    hostname: server,
    port: 5000,
    path: '/',
    method: 'PUT',
    headers: {
        filename: path.basename('success.txt'),
        'Content-Type': 'application/octet-stream',
        'Content-Type': 'gzip',
    },
};

const req = http.request(options, (res) => {
    console.log(`Server response: ${res.statusCode}`);
});

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(req)
    .on('finish', () => {
        console.log('File successffully sent!');
    });
