import { DataSource } from 'typeorm';
import { OrderDetails, Orders, Products, Users } from '../database';
import { faker } from '@faker-js/faker/locale/pt_BR';

export class OrdersService {
  public async run(datasource: DataSource, size = 1000) {
    console.log('Start inserting Orders.');

    const users = await datasource
      .getRepository(Users)
      .find({ select: ['id', 'fullname', 'address'], relations: { address: true } });

    const products = await datasource
      .getRepository(Products)
      .find({ select: ['id', 'price'] });

    const statusArray = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

    for (let i = 0; i < size; i++) {
      const userIndex = Math.floor(Math.random() * users.length);
      const statusIndex = Math.floor(Math.random() * statusArray.length);

      const user = users[userIndex];
      const status = statusArray[statusIndex];

      const orderSize = faker.number.int({ min: 1, max: 5 });
      const orderProducts: Products[] = [];

      for (let x = 0; x < orderSize; x++) {
        const productIndex = Math.floor(Math.random() * products.length);
        orderProducts.push(products[productIndex]);
      }

      if (!orderProducts) continue;

      const total = orderProducts.reduce((previous, current) => {
        const { price } = current;
        return previous += Number(price);
      }, 0);

      const order: Partial<Orders> = {
        date: faker.date.past({ years: 3 }),
        status: status,
        freight: Number(faker.commerce.price({ max: 50 })),
        user_id: user.id,
        ship_name: user.fullname,
        ship_state: user.address.state,
        ship_address: user.address.street,
        ship_zip_code: user.address.zip_code,
        ship_country: user.address.country,
        ship_city: user.address.city,
        shipped_date: undefined,
        total_price: total,
      }

      const orderInsert = await datasource
        .getRepository(Orders)
        .insert(order);

      if (!order) continue;

      const { identifiers: [{ id: orderId }] } = orderInsert;

      const orderDetails: Partial<OrderDetails>[] = orderProducts.map(({ id, price }) => {
        return {
          order_id: orderId,
          product_id: id,
          unit_price: price,
          quantity: 1,
          discount: 0
        }
      });

      const orderDetailsInsert = await datasource
        .getRepository(OrderDetails)
        .insert(orderDetails);

      if (!orderDetailsInsert) continue;
    }

    console.log('Completed inserting Orders.');
  }
}