import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/config/common";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";


export class OrderPaginationDto extends PaginationDto
{
    @IsOptional()
    @IsEnum(OrderStatusList,
        {message: `Valid status are ${OrderStatusList}`
    } )
    status:OrderStatus;

}