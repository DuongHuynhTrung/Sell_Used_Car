import {
  Entity,
  Column,
  BeforeInsert,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '../enum/role.enum';
import { ObjectId } from 'mongodb';
import { Car } from 'src/car/entities/car.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../enum/gender.enum';

@Entity()
export class User {
  @ApiProperty({
    description: 'ObjectId as User Id',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
  })
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty({
    description: 'Full Name of User',
    example: 'Huynh Duong',
    nullable: false,
  })
  @Column({ nullable: false })
  fullName: string;

  @ApiProperty({
    description: 'Date of Birth',
    example: '2001-02-22',
    nullable: false,
  })
  @Column({ nullable: false })
  dob: Date;

  @ApiProperty({
    description: 'Address of User',
    example: 'Tp. Thủ Đức, Tp. Hồ Chí Minh',
    nullable: false,
  })
  @Column({ nullable: false })
  address: string;

  @ApiProperty({
    description: 'Gender of User',
    example: 'Male',
    nullable: false,
  })
  @Column({ nullable: false })
  gender: GenderEnum;

  @ApiProperty({
    description: 'Email of User',
    example: 'trungduong22021619@gmail.com',
    nullable: false,
  })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({
    description: 'Phone number of User',
    example: '0838323403',
    nullable: false,
    uniqueItems: true,
  })
  @Column({ nullable: false, unique: true })
  phone: string;

  @ApiProperty({
    description: 'Password of User',
    example: '123456',
    nullable: false,
  })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    description: 'Url image of User',
    example:
      'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/327289318_1901932446843118_789342237429371693_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ie7RpU-i4I4AX8aGpyb&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfDtaGSwvXURIPPTj2k-5mEAPF1wVpd-mly2L6BJkMY4aw&oe=64B4C725',
    nullable: false,
  })
  @Column({ nullable: false })
  imgUrl: string;

  @ApiProperty({
    description: 'Status of account',
    example: 'true',
    default: true,
  })
  @Column({ nullable: false, default: true })
  status: boolean;

  @ApiProperty({
    description: 'Role of account',
    example: 'Customer',
    nullable: false,
  })
  @Column({ nullable: false, default: RoleEnum.CUSTOMER })
  role: RoleEnum;

  @OneToMany(() => Car, (car) => car.user, { eager: true })
  cars: Car[];

  @BeforeInsert()
  async hashPasword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
