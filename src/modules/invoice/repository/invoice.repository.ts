import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object"
import Invoice from "../domain/invoice"
import InvoiceItems from "../domain/invoice_items"
import InvoiceGateway from "../gateway/invoice.gateway"
import { InvoiceModel } from "./invoice.model"

export default class InvoiceRepository implements InvoiceGateway {

  async generate(entity: Invoice): Promise<void> {
    const _idItems = entity.items.map(item => item.id.id).join(',');
    const _nameItems = entity.items.map(item => item.name).join(',');
    const _priceItems = entity.items.map(item => item.price.toString()).join(',');

    await InvoiceModel.create({
      id: entity.id.id,
      name: entity.name,
      document: entity.document,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zipCode,
      idItems: _idItems,
      nameItems: _nameItems,
      priceItems: _priceItems,
      createdAt: entity.createdAt,
      total: entity.total,
      updatedAt: entity.updatedAt
    })
  }

  async find(id: string): Promise<Invoice> {

    const result = await InvoiceModel.findOne({ where: { id } })

    if (!result) {
      throw new Error("Client not found")
    }

    const address = new Address(
      result.street,
      result.number,
      result.complement,
      result.city,
      result.state,
      result.zipcode,
    );

    const idItems = result.idItems.split(',');
    const nameItems = result.nameItems.split(',');
    const priceItems = result.priceItems.split(',').map(price => parseFloat(price));

    const items: InvoiceItems[] = idItems.map((id, index) => new InvoiceItems(
      new Id(id),
      nameItems[index],
      priceItems[index]
  ));

    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: address,
      items: items,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }
}