import { Injectable } from '@nestjs/common';
import { DeliveryStatus, PAGE_SIZE, Sort } from 'src/common/valuable.utils';
import { OrderEntity } from '../entity/order.entity';
import { UserEntity } from '../entity/user.entity';
import { DataSource } from 'typeorm';
import {response} from "../config/response.utils";
import {makeResponse} from "../config/function.utils";

@Injectable()
export class OrderService {
  constructor(private dataSource: DataSource) {}
  async retrieveOrders(sort, name, status, p) {
    try {
      let orders = [];

      // query 생성
      const queryResult = this.dataSource.createQueryBuilder(
        OrderEntity,
        'order',
      );

      queryResult.leftJoin(UserEntity, 'user', 'user.id = order.userId');

      // 상태값 필터
      if (status == DeliveryStatus.BEFORE) {
        await queryResult.andWhere(
          'order.deliveryStatus IN (:deliveryStatus)',
          {
            deliveryStatus: DeliveryStatus.BEFORE,
          },
        );
      } else if (status == DeliveryStatus.ONGOING) {
        await queryResult.andWhere(
          'order.deliveryStatus IN (:deliveryStatus)',
          {
            deliveryStatus: DeliveryStatus.ONGOING,
          },
        );
      } else if (status == DeliveryStatus.COMPLETE) {
        await queryResult.andWhere(
          'order.deliveryStatus IN (:deliveryStatus)',
          {
            deliveryStatus: DeliveryStatus.COMPLETE,
          },
        );
      }

      // 날짜순 내림차순, 오름차순 정렬
      if (sort == Sort.CREATEDAT) {
        await queryResult.orderBy('order.createAt', 'DESC');
      } else if (sort == Sort.ENDEDAT) {
        await queryResult.orderBy('order.endedAt', 'DESC');
      }

      await queryResult
        .select([
          'order.id as id',
          'order.createAt as createdAt',
          'order.deliveryStatus as deliveryStatus',
          'order.endedAt as endedAt',
        ])
        .addSelect([
            'user.name as name'
        ]);

      let page = 0;
      // 페이징;
      if (p) {
        if (p <= 0) {
          // 에러 처리
          p = 1;
        } else {
          page = (p - 1) * PAGE_SIZE;
        }
        await queryResult.take(PAGE_SIZE).skip(page);
      }

      // 조회
      orders = await queryResult.getRawMany();

      const data = {
        orders: orders,
      };

      const result = makeResponse(response.SUCCESS, data);

      return result;
    } catch (error) {
      console.log(error);
      return response.ERROR;
    }
  }
}
