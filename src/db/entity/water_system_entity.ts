import { Column, Entity } from "typeorm";

@Entity("water_system")
export class WaterSystemEntity {
  @Column({
    nullable: false,
  })
  system_state!: string;

  @Column({
    nullable: false,
  })
  device_id!: string;
}
