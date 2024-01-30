import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export interface BaseRecord {
  id: number;
  created_at: Date | string;
  updated_at: Date | string | null;
}

@Entity()
export abstract class EntityBase {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @CreateDateColumn()
  created_at!: Date | string;

  @UpdateDateColumn({ default: null, nullable: true })
  updated_at: Date | string | null = null;
}

@Entity()
export abstract class UserCreatedEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({
    type: "integer",
  })
  creator_id!: number;

  @CreateDateColumn()
  created_at!: Date | string;

  @UpdateDateColumn({ default: null, nullable: true })
  updated_at: Date | string | null = null;
}

