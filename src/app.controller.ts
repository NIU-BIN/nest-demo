import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  inertData() {
    return this.appService.inertData();
  }

  @Get('get')
  getData() {
    return this.appService.getProducts();
  }

  @Get('order')
  getDataById() {
    return this.appService.getALlAccountOrders();
  }

  @Get('order/:name')
  getDataByName(@Param('name') name: string) {
    console.log(name);
    return this.appService.getTargetAccountOrder(name);
  }

  @Get('getProductsByOrder/:id')
  getOrderById(@Param('id') id: string) {
    return this.appService.getProductsByOrder(id);
  }

  @Get('getOrdersByProduct/:id')
  getOrdersByProduct(@Param('id') id: string) {
    return this.appService.getOrdersByProduct(id);
  }
}
