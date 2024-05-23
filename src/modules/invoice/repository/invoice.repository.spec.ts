import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model";
import Invoice from "../domain/invoice";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice_items";
import InvoiceRepository from "./invoice.repository";

describe("Client Repository test", () => {

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

    const invoice = new Invoice({
      id: new Id("1"),
      name: "Name",
      document: "1234-5678",
      address: new Address(
        "Rua 1",
        "11",
        "Casa 1",
        "City",
        "SC",
        "88888-888"
      ),
      items: [
        new InvoiceItems(
            new Id("123"),
            "Item Name",
            10
        ),
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    })

    const repository = new InvoiceRepository()
    await repository.generate(invoice)

    const invoiceDb = await InvoiceModel.findOne({ where: { id: "1" } })

    expect(invoiceDb).toBeDefined()
    expect(invoiceDb.id).toEqual(invoice.id.id)
    expect(invoiceDb.name).toEqual(invoice.name)
    expect(invoiceDb.document).toEqual(invoice.document)
    expect(invoiceDb.street).toEqual(invoice.address.street)
    expect(invoiceDb.number).toEqual(invoice.address.number)
    expect(invoiceDb.complement).toEqual(invoice.address.complement)
    expect(invoiceDb.city).toEqual(invoice.address.city)
    expect(invoiceDb.state).toEqual(invoice.address.state)
    expect(invoiceDb.zipcode).toEqual(invoice.address.zipCode)
    expect(invoiceDb.items).toEqual(invoice.items)
    expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
    expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
  })

  it("should find a invoice", async () => {

    const invoice = await InvoiceModel.create({
      id: '1',
      name: 'Name',
      address: new Address(
        "Rua 1",
        "11",
        "Casa 1",
        "City",
        "SC",
        "88888-888"
      ),  
      items: [
        new InvoiceItems(
            new Id("123"),
            "Item Name",
            10
        ),
    ],  
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const repository = new InvoiceRepository()
    const result = await repository.find(invoice.id)

    expect(result).toBeDefined()
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.number).toEqual(invoice.number)
    expect(result.address.complement).toEqual(invoice.complement)
    expect(result.address.city).toEqual(invoice.city)
    expect(result.address.state).toEqual(invoice.state)
    expect(result.address.zipCode).toEqual(invoice.zipcode)
    expect(result.items).toEqual(invoice.items)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
  })
});