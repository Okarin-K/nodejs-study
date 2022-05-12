'use strict';
const fs = require('fs');
const fsPromise = require('fs/promises');

const filename = './test.txt';

async function appendFile(filename, str) {
    return new Promise((resolve) => {
        fs.appendFile(filename, str, 'utf8', () => resolve());
    });
}

function syncFunc() {
    const start = new Date();

    for (let count = 0; count < 500; count++) {
        fs.appendFileSync(filename, 'あ', 'utf-8');
        fs.appendFileSync(filename, 'い', 'utf-8');
        fs.appendFileSync(filename, 'う', 'utf-8');
        fs.appendFileSync(filename, 'え', 'utf-8');
        fs.appendFileSync(filename, 'お', 'utf-8');
        fs.appendFileSync(filename, '\n', 'utf-8');
    }

    const end = new Date() - start;

    console.info('Execution Time: %dms', end / 1000);
}

async function asyncFunc() {
    const start = new Date();

    for (let count = 0; count < 500; count++) {
        await fsPromise.appendFile(filename, 'あ', 'utf-8');
        await fsPromise.appendFile(filename, 'い', 'utf-8');
        await fsPromise.appendFile(filename, 'う', 'utf-8');
        await fsPromise.appendFile(filename, 'え', 'utf-8');
        await fsPromise.appendFile(filename, 'お', 'utf-8');
        await fsPromise.appendFile(filename, '\n', 'utf-8');
    }

    const end = new Date() - start;

    console.info('Execution Time: %dms', end / 1000);
}

function noAwaitAsync() {
    const start = new Date();

    for (let count = 0; count < 500; count++) {
        appendFile(filename, 'あ');
        appendFile(filename, 'い');
        appendFile(filename, 'う');
        appendFile(filename, 'え');
        appendFile(filename, 'お');
        appendFile(filename, '\n');
    }

    const end = new Date() - start;

    console.info('Execution Time: %dms', end / 1000);
}

asyncFunc();
