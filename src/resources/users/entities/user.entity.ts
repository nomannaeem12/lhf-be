import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BasicEntity } from '../../../shared/entities/basic.entity';

@Entity()
export class User extends BasicEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  private updateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
