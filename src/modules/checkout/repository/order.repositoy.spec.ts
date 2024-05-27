import { Sequelize } from "sequelize-typescript";

import Id from "../../@shared/domain/value-object/id.value-object";
import Order from "../domain/order.entity";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";

import { OrderModel } from "./order.model";
import { OrderRepository } from "./order.repository";

const mockDate = new Date(2000, 1, 1);

describe("OrderRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([OrderModel]);
        await sequelize.sync();

        jest.useFakeTimers();
        jest.setSystemTime(mockDate);
    });

    afterEach(async () => {
        await sequelize.close();
        jest.useRealTimers();
    });

    it("should add an order", async () => {
        const product1 = new Product({
            name: "Product 1",
            salesPrice: "100",
            description: "Description 1",
        });

        const product2 = new Product({
            name: "Product 2",
            description: "Description 2",
            salesPrice: "200",
        });

        const orderClient = new Client({
            id: new Id("1"),
            name: "Nathan",
            email: "nathan@email.com",
            address: "Floripa",

        });

        const order = new Order({
            client: orderClient,
            products: [product1, product2],
            status: "status",
        });

        order.approved();

        const orderRepository = new OrderRepository();
        await orderRepository.addOrder(order);
    });

    it("should find an order", async () => {
        const orderData = {
            id: "321",
            createdAt: mockDate,
            updatedAt: mockDate,
            status: "approved",
            client: {
                id: "1",
                createdAt: mockDate,
                updatedAt: mockDate,
                name: "Matheus",
                email: "matheus@email.com",
                address: "Main Street, CA, 123",
            },
            products: [
                {
                    id: "35",
                    createdAt: mockDate,
                    updatedAt: mockDate,
                    name: "Product 1",
                    description: "Description 1",
                    salesPrice: 100,
                },
                {
                    id: "63",
                    createdAt: mockDate,
                    updatedAt: mockDate,
                    name: "Product 2",
                    description: "Description 2",
                    salesPrice: 200,
                },
            ],
        };

        await OrderModel.create(orderData);
        const orderRepository = new OrderRepository();

        const result = await orderRepository.findOrder("321");

        expect(result.id.id).toEqual(orderData.id);
        expect(result.status).toEqual(orderData.status);

        const clientResult = result.client;
        expect(clientResult.id).toEqual(orderData.client.id);
        expect(clientResult.name).toEqual(orderData.client.name);
        expect(clientResult.email).toEqual(orderData.client.email);
        expect(clientResult.address).toEqual(orderData.client.address);

        expect(result.products.length).toEqual(orderData.products.length);

        const firstProductResult = result.products[0];
        expect(firstProductResult.id).toEqual(orderData.products[0].id);
        expect(firstProductResult.name).toEqual(orderData.products[0].name);
        expect(firstProductResult.salesPrice).toEqual(
            orderData.products[0].salesPrice
        );
        expect(firstProductResult.description).toEqual(
            orderData.products[0].description
        );
    });
});