import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("tank_details")
export class TankDetailsEntity {
  @PrimaryColumn()
  device_id!: string;

  @Column({
    nullable: false,
  })
  user_id!: string;

  @Column({
    nullable: false,
  })
  tank_capacity!: bigint;

  @Column({
    nullable: true,
  })
  tank_fill!: bigint;
}
