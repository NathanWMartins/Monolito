import request from 'supertest';
import { sequelize } from '../express';
import app from '../app';
import InvoiceItems from '../../modules/invoice/domain/invoice_items';
import Id from '../../modules/@shared/domain/value-object/id.value-object';

describe('Invoice API', () => {
    beforeAll(async () => {
        await sequelize.sync();
    });

    beforeEach(async () => {
        await sequelize.truncate({ cascade: true });
    });

    it('should generate a invoice', async () => {
        const invoiceItem = new InvoiceItems(
            new Id("1"),
            "Item 1",
            11,
        );
        
        const response = await request(app)
            .post('/invoice')
            .send({
                name: 'Invoice 1',
                document: 'Document 1',
                street: 'Street 1',
                number: '1',
                complement: '',
                city: 'Florianopolis',
                state: 'SC',
                zipCode: '1234576',
                items: [invoiceItem],
            });

        expect(response.status).toBe(201);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
