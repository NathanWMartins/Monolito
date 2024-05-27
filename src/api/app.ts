import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { clientRoute } from './routes/client.route';
import { productRoute } from './routes/product.route';
import { invoiceRoute } from './routes/invoice.route';
import { checkoutRoute } from './routes/checkout.route';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/products', productRoute);
app.use('/clients', clientRoute);
app.use('/checkout', checkoutRoute);
app.use('/invoice', invoiceRoute);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
