import express from "express"
import apiRouter from "./api"

class Server {
    private app:express.Application;

    constructor() {
        this.app = express();

        this.middlewares();
        this.router();
    }

    private middlewares() {
        // equip middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    private router () {
        // insert router
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.json({ hello: 'world' })
        });

        this.app.use('/api',apiRouter);
    }

    public getInstance () {
        return this.app;
    }
}

export default Server;

