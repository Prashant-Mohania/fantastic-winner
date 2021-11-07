import { text } from "express";
import { Column, Entity } from "typeorm";

@Entity("water_system")
export class WaterSystemEntity {
  @Column({
    nullable: false,
    type: "boolean",
  })
  system_state = Boolean;

  @Column({
    nullable: false,
    type: "varchar",
  })
  device_id = text;
}
