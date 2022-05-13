import { Router } from 'express';

export const BuletinBoardRouters = Router();

const contents: string[] = [];

BuletinBoardRouters.get('/posts', (req, res) => {
    res.render('index', { contents });
});

BuletinBoardRouters.post('/posts', (req, res) => {
    contents.push(req.body.content);

    res.writeHead(303, {
        Location: '/posts',
    });
    res.end();
});
