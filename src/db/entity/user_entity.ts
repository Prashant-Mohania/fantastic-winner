import { text } from "express";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity("users")
export class UserEntity extends BaseEntity {
  @Column({
    primary: true,
    unique: false,
    type: "varchar",
  })
  user_id = text;

  @Column({
    nullable: false,
    type: "varchar",
  })
  user_first_name = text;

  @Column({
    nullable: true,
    type: "varchar",
  })
  user_last_name = text;

  @Column({
    nullable: true,
    type: "varchar",
  })
  user_gender = text;
}

