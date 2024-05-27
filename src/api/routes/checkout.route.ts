import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/product-adm.facade.interface";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoide.facade.factory";
import StoreCatalogFacadeFactory from "../../modules/store-catalog/factory/facade.factory";
import PlaceOrderUsecase from "../../modules/checkout/usecase/place-order/place-order.usecase";
import { PlaceOrderInputDTO } from "../../modules/checkout/usecase/place-order/place-order.dto";
import { OrderRepository } from "../../modules/checkout/repository/order.repository";

export const checkoutRoute = express.Router();

const repository = new OrderRepository();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();

    const usecase = new PlaceOrderUsecase(
        clientFacade,
        productFacade,
        catalogFacade,
        repository,
        invoiceFacade,
        paymentFacade
    );

    try {
        const orderDto: PlaceOrderInputDTO = {
            clientId: req.body.clientId,
            products: req.body.products,
        };
    } catch (error) {
        res.status(500).send(error);
    }
});