import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  user_id!: string;

  @Column({
    nullable: false,
  })
  user_first_name!: string;

  @Column({
    nullable: false,
  })
  user_last_name!: string;

  @Column({
    nullable: false,
  })
  user_email!: string;

  @Column({
    nullable: false,
  })
  user_gender!: string;
}
