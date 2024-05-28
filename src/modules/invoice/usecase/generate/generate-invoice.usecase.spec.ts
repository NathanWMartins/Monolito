import Invoice from "../../domain/invoice";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn().mockResolvedValue(undefined),
        generateAPI: jest.fn(),
    };
};

describe("Process invoice usecase unit test", () => {
    it("should generate a invoice", async () => {
        const invoiceRepository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(invoiceRepository)

        const input: GenerateInvoiceUseCaseInputDto = {
            name: "Name 1",
            document: "Document 1",
            street: "Rua 1",
            number: "11",
            complement: "Casa 1",
            city: "City 1",
            state: "SC",
            zipCode: "11111-11",
            items: [
                { id: "123", name: "Item Name", price: 10 }
            ]
        };        

        const result = await usecase.execute(input);

        const expectedOutput: GenerateInvoiceUseCaseOutputDto = {
            id: expect.any(String),
            name: "Name 1",
            document: "Document 1",
            street: "Rua 1",
            number: "11",
            complement: "Casa 1",
            city: "City 1",
            state: "SC",
            zipCode: "11111-11",
            items: [
                { id: "123", name: "Item Name", price: 10 }
            ],
            total: 10
        };

        expect(invoiceRepository.generate).toHaveBeenCalledWith(expect.any(Invoice));
        expect(result.name).toBe(expectedOutput.name);
        expect(result.document).toBe(expectedOutput.document);
        expect(result.street).toBe(expectedOutput.street);
        expect(result.number).toBe(expectedOutput.number);
        expect(result.complement).toBe(expectedOutput.complement);
        expect(result.city).toBe(expectedOutput.city);
        expect(result.state).toBe(expectedOutput.state);
        expect(result.zipCode).toBe(expectedOutput.zipCode);
        expect(result.items).toEqual(expectedOutput.items);
    });
});
