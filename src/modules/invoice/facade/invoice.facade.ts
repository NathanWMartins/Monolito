import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeUsecase, { FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";

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
    ): Promise<void> {
        return await this._generateUsecase.execute(invoice);
    }

    async find(name: string): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUsecase.execute({ name: name });
    }
}
