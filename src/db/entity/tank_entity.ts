import { text } from "express";
import { Column, Entity } from "typeorm";

@Entity("tank_details")
export class TankDetailsEntity {
  @Column({
    primary: true,
    unique: false,
    type: "varchar",
  })
  device_id = text;

  @Column({
    nullable: false,
    type: "varchar",
  })
  user_id = text;

  @Column({
    nullable: false,
    type: "bigint",
  })
  tank_capacity = text;

  @Column({
    nullable: true,
    type: "float8",
  })
  tank_fill = text;
}
