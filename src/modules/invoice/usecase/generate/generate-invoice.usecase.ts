import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice_items";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const items = input.items.map(item => new InvoiceItems(
            new Id(item.id),
            item.name,
            item.price
        ));
    
        const address = new Address(
            input.street,
            input.number,
            input.complement,
            input.city,
            input.state,
            input.zipCode
        );
    
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address,
            items
        });
    
        await this._invoiceRepository.generate(invoice);
    
        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.total
        };
    }
}
