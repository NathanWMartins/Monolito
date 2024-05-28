import express, { Request, Response } from "express";
import { FindInvoiceFacadeInputDTO } from "../../modules/invoice/facade/invoice.facade.interface";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoide.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const facade = InvoiceFacadeFactory.create();
    try {
        const input: FindInvoiceFacadeInputDTO = {
            id: req.params.id,
        };
        const invoice = await facade.findApiTest(input);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).send(error);
    }
});