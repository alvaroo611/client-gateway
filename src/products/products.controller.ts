import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { PaginationDto } from '../config/common/dto/pagination.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client:ClientProxy

  ) {}

  @Post()
  createProducts(@Body() createProductsDto:CreateProductDto)
  {
    return this.client.send({cmd: 'create_product'},createProductsDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto)
  {
    return this.client.send({cmd: 'find_all_products'},paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );


    //try
    //{

    //const product = await firstValueFrom(

    //    this.productsClient.send({cmd: 'find_one_products'},{id})
    //  );

    //  return product;

    //}
    //catch(error)
    //{
    //  throw new RpcException(error);

    //}
    
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }


}
