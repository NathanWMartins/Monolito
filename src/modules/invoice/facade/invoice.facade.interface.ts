export interface GenerateInvoiceFacadeInputDto {
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
}

export interface FindInvoiceFacadeInputDTO {
    id: string;
}

export interface FindInvoiceFacadeOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createAt: Date;
}

export default interface InvoiceFacadeUsecase{
    generate(input: GenerateInvoiceFacadeInputDto): Promise<void>;
    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>
}