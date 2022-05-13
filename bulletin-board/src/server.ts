import express from 'express';
import basicAuth from 'express-basic-auth';
import { routers } from './routers/routers';

const app = express();

app.set('view engine', 'pug');

app.use(
    basicAuth({
        challenge: true,
        realm: 'Enter username and password.',
        users: {
            admin: 'test', // 平文なのでセキュリティ上とてもよろしくない
        },
        unauthorizedResponse: () => {
            return 'Unauthorized'; // 認証失敗時に表示するメッセージ
        },
    })
);

// リクエスト解析
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routers);

app.listen(5000, () => {
    console.log(`listen to port: 5000`);
});
