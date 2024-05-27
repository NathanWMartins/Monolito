import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoide.facade.factory";
import { FindInvoiceFacadeInputDTO, GenerateInvoiceFacadeInputDto } from "../../modules/invoice/facade/invoice.facade.interface";

export const invoiceRoute = express.Router();

invoiceRoute.post("/", async (req: Request, res: Response) => {
    const facade = InvoiceFacadeFactory.create();
    try {
        const invoiceDto: FindInvoiceFacadeInputDTO = {
            id: req.body.id,
        };
        await facade.findApiTest(invoiceDto);
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error);
    }
});