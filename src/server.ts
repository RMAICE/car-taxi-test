import * as express from 'express';
import * as cors from 'cors';
import { prefix, port } from './config';
import routes from './routes';
import * as bodyParser from 'body-parser';

export default class Server {
    public static start(): void {
        const app = express();

        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.disable('x-powered-by');
        app.disable('etag');
        app.use(prefix, routes);

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    }
}
