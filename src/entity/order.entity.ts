import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('ORDER')
export class OrderEntity extends CommonEntity {
  @ApiProperty()
  @Column()
  endedAt: string;

  @ApiProperty()
  @Column()
  deliveryStatus: string;
}
