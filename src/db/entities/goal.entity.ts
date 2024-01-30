import { Column, Entity, ManyToOne, VirtualColumn } from "typeorm";
import { UserCreatedEntity } from "./base.entity";
import { GoalCategory } from "./goal-category.entity";

@Entity()
export class Goal extends UserCreatedEntity {
  @ManyToOne(() => GoalCategory, (category) => category.goals)
  category!: GoalCategory;

  @Column({
    type: "varchar",
    precision: 255,
  })
  goal_text!: string;

  @Column({
    type: "enum",
    enum: ["started", "new", "complete"],
    default: "new",
  })
  goal_state: "started" | "new" | "complete" = "new";

  @Column({
    type: "integer",
    precision: 100,
    default: 0,
  })
  percent_complete: number = 0;

  @Column({
    type: "boolean",
    default: true,
  })
  is_public: boolean = true;
}

