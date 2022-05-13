import { Router } from 'express';

export const AuthenticationRouters = Router();

AuthenticationRouters.get('/logout', (req, res) => {
    res.status(401).setHeader('Content-Type', 'text/plain; charset=utf-8');
});
