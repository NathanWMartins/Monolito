import request from 'supertest';
import { sequelize } from '../express';
import app from '../app';

describe('Product API', () => {
    beforeAll(async () => {
        await sequelize.sync();
    });

    beforeEach(async () => {
        await sequelize.truncate({ cascade: true });
    });

    it('should create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                id: '1',
                name: 'Product 1',
                description: 'Description of Product 1',
                purchasePrice: 100,
                stock: 50
            });
        
        expect(response.status).toBe(201);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
