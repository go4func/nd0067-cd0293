import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import users from './handlers/users';
import products from './handlers/products';
import orders from './handlers/orders';
import bodyParser from 'body-parser';
import auth from './handlers/authentications';
import dashboards from './handlers/dashboards';

export const app = express();
const port = 3000;

app.get('/', (res: Request, resp: Response) => {
  resp.json('Hello World!');
});

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

auth.routes(app);
users.routes(app);
products.routes(app);
orders.routes(app);
dashboards.routes(app);

app.listen(port, () => {
  console.log(`starting app on port: ${port}`);
});
