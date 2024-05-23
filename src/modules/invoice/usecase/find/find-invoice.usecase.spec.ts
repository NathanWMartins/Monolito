import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice_items";
import InvoiceUsecase from "./find-invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
    name: "Name 1",
    document: "Document 1",
    address: new Address(
        "Rua 1",
        "11",
        "Casa 1",
        "City 1",
        "SC",
        "11111-11",
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
});

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(invoice)),
        generate: jest.fn(),
    };
};

describe("Process invoice usecase unit test", () => {
    it("should find a invoice", async () => {
        const invoiceRepository = MockRepository()
        const useCase = new InvoiceUsecase(invoiceRepository)

        const input = {
            id: "1"
        }

        const result = await useCase.execute(input)

        const expectedItems = invoice.items.map(item => ({
            id: item.id.id,
            name: item.name,
            price: item.price
        }));

        expect(invoiceRepository.find).toHaveBeenCalledWith(input.id);
        expect(result.id).toEqual(invoice.id.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.address).toEqual(invoice.address)
        expect(result.items).toEqual(expectedItems);
        expect(result.total).toEqual(invoice.total);
        expect(result.createAt).toEqual(invoice.createdAt)
    });
});
