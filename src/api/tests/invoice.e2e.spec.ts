import request from 'supertest';
import { sequelize } from '../express';
import app from '../app';
import InvoiceItems from '../../modules/invoice/domain/invoice_items';
import Id from '../../modules/@shared/domain/value-object/id.value-object';
import InvoiceRepository from '../../modules/invoice/repository/invoice.repository';
import Address from '../../modules/@shared/domain/value-object/address';
import Invoice from '../../modules/invoice/domain/invoice';

describe('Invoice API', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should get invoice", async () => {
        const invoice = new Invoice({
            id: new Id("123"),
            name: "Invoice 1",
            document: "Document",
            address: new Address(
                "Rua 123",
                "11",
                "",
                "Florianopolis",
                "SC",
                "11111"
            ),
            items: [
                new InvoiceItems(
                    new Id("1"),
                    "Item 1",
                    11,
                ),
            ],            
        });

        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.generateAPI(invoice);
        
        const respInvoice = await request(app).get(`/invoice/${123}`);

        expect(respInvoice.status).toEqual(200);
    });
});