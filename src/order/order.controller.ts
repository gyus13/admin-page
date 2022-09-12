import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchDeliveryRequestDto } from './dto/patch-delivery-request.dto';
import {OrderService} from "./order.service";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * description : 주문 내역 조회 API
   * @param PostBoardRequestDto
   * @returns non-exist
   */
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 권한 입니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '주문내역 조회 API' })
  @Get('/:id')
  GetOrder(@Param('id') id: number) {
    // return this.orderService.retrieveOrder(id);
  }

  /**
   * description : 발송 처리 API
   * @param PostBoardRequestDto
   * @returns non-exist
   */
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 권한 입니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '발송처리 API' })
  @Patch('/:id')
  PatchDelivery(
    @Param('id') id: number,
    @Body() patchDeliveryRequest: PatchDeliveryRequestDto,
  ) {
    // return this.orderService.patchDelivery(id);
  }

  /**
   * description : 쿠폰 조회 API
   * @param PostBoardRequestDto
   * @returns non-exist
   */
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 권한 입니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '쿠폰 조회 API' })
  @Patch('/coupon')
  GetCoupon() {
    // return this.orderService.retrieveCoupon(id);
  }
}
