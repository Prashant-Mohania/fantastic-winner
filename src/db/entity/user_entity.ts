import { text } from "stream/consumers";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  user_id = text;

  @Column({
    nullable: false,
  })
  user_first_name = text;

  @Column({
    nullable: false,
  })
  user_last_name = text;

  @Column({
    nullable: false,
  })
  user_email = text;

  @Column({
    nullable: false,
  })
  user_gender = text;
}
