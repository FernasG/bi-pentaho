import Connection from '../database/ormconfig';
import { UsersService } from './Users';
import { OrdersService } from './Orders';
import { ProductsService } from './Products';
import { CategoriesService } from './Categories';

export class PopulateDatabase {
  private readonly usersService: UsersService;
  private readonly ordersService: OrdersService;
  private readonly productsService: ProductsService;
  private readonly categoriesService: CategoriesService;

  constructor() {
    this.usersService = new UsersService();
    this.ordersService = new OrdersService();
    this.productsService = new ProductsService();
    this.categoriesService = new CategoriesService();
  }

  public async callService(service: string) {
    const connection = await this.createConnection();

    if (!connection) return null;

    await this.ordersService.run(connection);
  }

  private async createConnection() {
    return Connection
      .initialize()
      .catch(({ message, stack }) => {
        console.error({ message, stack });
        return null;
      });
  }
}