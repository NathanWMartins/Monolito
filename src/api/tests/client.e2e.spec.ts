import request from 'supertest';
import { sequelize } from '../express';
import app from '../app';

describe('Client API', () => {
    beforeAll(async () => {
        await sequelize.sync();
    });

    beforeEach(async () => {
        await sequelize.truncate({ cascade: true });
    });

    it('should create a client', async () => {
        const response = await request(app)
            .post('/clients')
            .send({
                id: '1',
                name: 'Nathan',
                email: 'nathan@gmail.com',
                document: '123456',
                address: {
                    street: "street 1",
                    number: '1',
                    complement: '',
                    city: 'Florianopolis',
                    state: 'SC',
                    zipCode: '345678'
                },
            });

        expect(response.status).toBe(201);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
