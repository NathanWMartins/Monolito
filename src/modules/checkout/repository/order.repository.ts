import Id from "../../@shared/domain/value-object/id.value-object";
import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderModel } from "./order.model";

export class OrderRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<Order> {
        const orderCreated = await OrderModel.create({
            id: order.id.id,
            status: order.status,
            client: order.client,
            products: order.products,
        });

        return new Order({
            id: new Id(orderCreated.id),
            status: orderCreated.status,
            client: orderCreated.client,
            products: orderCreated.products,
        });
    }

    async findOrder(id: string): Promise<Order> {
        const orderFind = await OrderModel.findOne({ where: { id } })

        return new Order({
            id: new Id(orderFind.id),
            status: orderFind.status,
            client: orderFind.client,
            products: orderFind.products,
        });
    }
}