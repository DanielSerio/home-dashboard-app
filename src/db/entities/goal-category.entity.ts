import { Column, Entity, OneToMany } from "typeorm";
import { UserCreatedEntity } from "./base.entity";
import { Goal } from "./goal.entity";

@Entity()
export class GoalCategory extends UserCreatedEntity {
  @Column({
    type: "varchar",
    precision: 32,
  })
  category_name!: string;

  @OneToMany(() => Goal, (goal) => goal.category)
  goals!: Goal[];

  @Column({
    type: "varchar",
    precision: 32,
    nullable: true,
    default: null,
  })
  icon: string | null = null;

  @Column({
    type: "boolean",
    default: true,
  })
  is_public: boolean = true;
}

