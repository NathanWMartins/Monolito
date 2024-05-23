import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeUsecase from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import InvoiceUsecase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeUsecase {
      const repository = new InvoiceRepository();
      const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
      const findInvoiceUseCase = new InvoiceUsecase(repository);
      const facade = new InvoiceFacade({
        generateUsecase: generateInvoiceUseCase,
        findUsecase: findInvoiceUseCase,
      })
      return facade
    }
  }