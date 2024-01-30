import { Column, Entity } from "typeorm";
import { EntityBase, type BaseRecord } from "./base.entity";

interface UserBase {
  email: string;
  password: string;
}

export interface UserCreate extends UserBase {
  [k: string]: string;
}

export interface UserCred extends UserBase {
  [k: string]: string;
}

export type UserRole = "admin" | "user";

export type UserRoles = UserRole[];

export interface UserUpdate {
  hue?: number;
  username?: string;
}

export interface UserRecordBase extends Omit<UserBase, "password"> {
  hue: number;
  username: string | null;
  account_role: UserRoles;
  account_pass: string;
}

export type UserRecord = UserRecordBase & BaseRecord;

@Entity()
export class User extends EntityBase implements UserRecord {
  @Column({
    type: "varchar",
    precision: 64,
    unique: true,
  })
  email!: string;

  @Column({
    type: "text",
    select: false,
  })
  account_pass!: string;

  @Column({
    type: "varchar",
    precision: 32,
    unique: true,
    nullable: true,
    default: null,
  })
  username: string | null = null;

  @Column({
    type: "integer",
    precision: 359,
    default: 275,
  })
  hue: number = 275;

  @Column({
    type: "set",
    enum: ["admin", "user"] as UserRoles,
    default: ["user"],
  })
  account_role: UserRoles = ["user"];
}

