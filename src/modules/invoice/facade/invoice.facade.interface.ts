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

export interface GenerateInvoiceFacadeOutputDto {
    id: string;
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
    total: number;
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
    generate(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
    find(id: string): Promise<FindInvoiceFacadeOutputDTO>;
    findApiTest(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>
}