import express, { Response, Request, Router} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import Mustache from 'mustache-express';

import router  from './routers/login';

dotenv.config();
const server = express();
server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', Mustache());

server.use(router)

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});


server.listen(process.env.PORT);