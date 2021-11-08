import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/User';
import { Genre } from '../../genres/entities/Genre';
import { Order } from '../../orders/entities/Order';

@Entity('games')
class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Genre, genre => genre.games)
  genres: Genre[];

  @ManyToMany(() => User, (user) => user.games)
  users: User[];

  @ManyToMany(() => Order, (order) => order.items)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Game }
