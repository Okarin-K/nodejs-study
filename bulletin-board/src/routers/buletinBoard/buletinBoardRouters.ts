import { Router } from 'express';
import { PostInfo } from '../../businessLogic/bulletinBoard/post';
import { findMany } from '../../dataAccess/bulletinBoard/bulletinBoardDao';
import { create } from '../../dataAccess/bulletinBoard/bulletinBoardRepository';

export const BuletinBoardRouters = Router();

BuletinBoardRouters.get('/posts', async (req, res) => {
    const posts = await findMany();

    res.render('index', { posts });
});

BuletinBoardRouters.post('/posts', async (req, res) => {
    console.log(req.body.content);
    const post = new PostInfo(undefined, req.body.content, 'okarin', 'cookie-value', new Date());

    console.log({...post});

    await create(post);

    res.writeHead(303, {
        Location: '/posts',
    });
    res.end();
});
