import express, { Request, Response } from "express";
import Address from "../../modules/@shared/domain/value-object/address"
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "../../modules/client-adm/facade/client-adm.facade.interface";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const facade = ClientAdmFacadeFactory.create();
    try {
        const clientDto: AddClientFacadeInputDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address(
                req.body.address.street,
                req.body.address.number,
                req.body.address.complement,
                req.body.address.city,
                req.body.address.state,
                req.body.address.zipCode
            ),
        };
        await facade.add(clientDto);
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error);
    }
});