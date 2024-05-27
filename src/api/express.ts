import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "../modules/checkout/repository/order.model";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import { ProductModel as AdmProductModel } from "../modules/product-adm/repository/product.model";
import ProductModel from "../modules/store-catalog/repository/product.model";
import TransactionModel from "../modules/payment/repository/transaction.model";

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });

    await sequelize.addModels([
        OrderModel,
        ClientModel,
        InvoiceModel,
        TransactionModel,
        ProductModel,
        AdmProductModel,
    ]);
    await sequelize.sync();
}
setupDb();