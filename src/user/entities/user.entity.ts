import { Entity, Column, BeforeInsert, ObjectIdColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '../enum/role.enum';
import { ObjectId } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  dob: Date;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  imgUrl: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, default: RoleEnum.CUSTOMER })
  role: RoleEnum;

  @BeforeInsert()
  async hashPasword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
