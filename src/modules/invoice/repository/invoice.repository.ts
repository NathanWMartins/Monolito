import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object"
import Invoice from "../domain/invoice"
import InvoiceItems from "../domain/invoice_items"
import InvoiceGateway from "../gateway/invoice.gateway"
import { InvoiceModel } from "./invoice.model"

export default class InvoiceRepository implements InvoiceGateway {

    async generate(entity: Invoice): Promise<void> {

        await InvoiceModel.create({
            id: entity.id.id,
            name: entity.name,
            document: entity.document,
            street: entity.address.street,
            number: entity.address.number,
            complement: entity.address.complement,
            city: entity.address.city,
            state: entity.address.state,
            zipCode: entity.address.zipCode,
            items: entity.items,
            createdAt: entity.createdAt,
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
      
          const items = result.items.map(item => new InvoiceItems(
            new Id  (item.id.id),
            item.name,
            item.price
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