import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeUsecase, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findUsecase: UseCaseInterface;
    generateUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeUsecase {
    private _findUsecase: UseCaseInterface;
    private _generateUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._findUsecase = usecaseProps.findUsecase;
        this._generateUsecase = usecaseProps.generateUsecase;
    }

    async generate(
        invoice: GenerateInvoiceFacadeInputDto
    ): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateUsecase.execute(invoice);
    }

    async find(invoiceId: string): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUsecase.execute({ id: invoiceId });
    }
    async findApiTest(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return null;
    }
}
