import {sequelize } from "../express";
import request from "supertest";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import app from "../app";

describe("Checkout API", () => {
    beforeAll(() => {
        jest.setTimeout(10000);
    });
    
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a checkout", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product",
            description: "Product description",
            purchasePrice: 15,
            salesPrice: 25,
            stock: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "client@example.com",
            document: "0000",
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipcode: "00000-000",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1",
                products: [
                    { productId: "1" }, 
                ],
            });

        expect(response.status).toEqual(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.total).toEqual(45);
        expect(response.body.products).toStrictEqual([
            { productId: "1" },
        ]);
    });
});