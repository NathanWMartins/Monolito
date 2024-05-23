import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model"
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice_items";
import InvoiceFacade from "./invoice.facade";
import Invoice from "../domain/invoice";
import InvoiceUsecase from "../usecase/find/find-invoice.usecase";
import InvoiceFacadeFactory from "../factory/invoide.facade.factory";

describe("Invoice Facade test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([InvoiceModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should generate a invoice", async () => {
        const repository = new InvoiceRepository()
        const generateUsecase = new GenerateInvoiceUseCase(repository)
        const facade = new InvoiceFacade({
            generateUsecase: generateUsecase,
            findUsecase: undefined,
        })

        const invoice = ({
            name: "Name",
            document: "1234-5678",
            street: "Rua 1",
            number: "11",
            complement: "Casa 1",
            city: "City",
            state: "SC",
            zipCode: "88888-888",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 1,
                }
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await facade.generate(invoice)

        const result = await InvoiceModel.findOne({ where: { name: "Name" } })

        expect(result).toBeDefined()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(invoice.name)
        expect(result.document).toBe(invoice.document)
        expect(result.street).toBe(invoice.street)
        expect(result.number).toBe(invoice.number)
        expect(result.complement).toBe(invoice.complement)
        expect(result.city).toBe(invoice.city)
        expect(result.state).toBe(invoice.state)
        expect(result.zipcode).toBe(invoice.zipCode)
        expect(result.total).toBe(
            invoice.items.reduce((total_price, item) => total_price + item.price, 0)
        );
    });
    it("should find a invoice", async () => {
        const invoice = ({
            name: "Name",
            document: "1234-5678",
            street: "Rua 1",
            number: "11",
            complement: "Casa 1",
            city: "City",
            state: "SC",
            zipCode: "88888-888",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 1,
                }
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const facade = InvoiceFacadeFactory.create();
        await facade.generate(invoice);
        const found = await facade.find({name: "Name"});


    });
});