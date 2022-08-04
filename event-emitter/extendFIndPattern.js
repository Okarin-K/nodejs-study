const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

/**
 * EventEmitterクラスを拡張して作った文字列検索の処理
 */
class findPattern extends EventEmitter {
    constructor(regex) {
        super();
        this.regex = regex;
        this.files = [];
    }

    addFile(file) {
        this.files.push(file);
        return this;
    }

    find() {
        this.files.forEach(file => {
            fs.readFile(file, 'utf8', (err, content) => {
                if(err) {
                    return this.emit('error', err);
                }
    
                this.emit('fileread', file);
    
                const match = content.match(this.regex);
                if(match) {
                    match.forEach(elem => this.emit('found', file, elem));
                }
            });
        })

        return this;
    }
}

const findPatternObject = new findPattern(/hello \w+/g);
findPatternObject
    .addFile('hello.txt')
    .addFile('hello.json')
    .find()
    .on('fileread', file => console.log(`${file} was read!!`))
    .on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
    .on('error', err => console.log(`Error emitted: ${err.message}`));
    