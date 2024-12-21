import { Model, Relation } from "@nozbe/watermelondb";
import { Associations } from "@nozbe/watermelondb/Model";
import {
  date,
  relation,
  immutableRelation,
  text,
  field,
  readonly,
  writer,
  action,
} from "@nozbe/watermelondb/decorators";

export class User extends Model {
  static table = "users";
  static associations: Associations = {
    expenses: { type: "has_many", foreignKey: "user_id" },
    categories: { type: "has_many", foreignKey: "user_id" },
  };

  @text("name") name!: string;
  @text("email") email!: string;
  @text("phone_number") phoneNumber!: string;
  @readonly @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date;
}

export class Profile extends Model {
  static table = "profiles";
  static associations: Associations = {
    user: { type: "belongs_to", key: "user_id" },
  }

  @text("name") name!: string;
  @text("avatar") profileImg!: string;

  @text("total_income") totalIncome!: number;
  @text("total_expense") totalExpense!: number;
  @text("total_budget") totalBudget!: number;
  @text("total_savings") totalSavings!: number;

  // Relations
  @relation("user", "user_id") user!: Relation<User>;

  @readonly @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date;

  // Worker to update the existing value
  @writer async updateTotalIncome(income: number) {
    // this.totalIncome = income;
    const totalSaving = this.totalIncome - this.totalExpense;
    await this.update(profile => {
      profile.totalIncome = income;
      profile.totalSavings = totalSaving;
    })
  }

  @writer async updateTotalExpense(expense: number) {
    // this.totalExpense = expense;
    const totalSaving = this.totalIncome - this.totalExpense;
    await this.update(profile => {
      profile.totalExpense = expense;
      profile.totalSavings = totalSaving;
    })
  }

  @writer async updateTotalBudget(budget: number) {
    // this.totalBudget = budget;
    
    await this.update(profile => {
      profile.totalBudget = budget;
    })
  }
  /**
   * Updates the total savings value for the user's profile.
   * @param savings - The new total savings amount to set.
   */
  @writer async updateTotalSavings(savings: number) {
    // this.totalSavings = savings;
    await this.update(profile => {
      profile.totalSavings = savings;
    })
  }

}

// TODO: Create one more models to save the Income.
// TODO: In the profile show the all income and budgets.
// TODO: For Home page count the budget used from the total budget.

// export class Settings extends Model {
//   static table = "settings";
// }

export class Budget extends Model {
  static table = "budgets";
  static associations: Associations = {
    user: { type: "belongs_to", key: "user_id" },
    categories: { type: "has_many", foreignKey: "user_id" },
  };

  @field("title") title!: string;
  @field("amount") amount!: number;
  @field("used_amount") usedAmount!: number;
  @date("start_at") startDate!: Date;
  @date("end_at") endDate!: Date;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  @immutableRelation("users", "user_id") user_id!: Relation<User> | string;
  @relation("categories", "category_id") category_id!:
    | Relation<Category>
    | string;

  // used amount writer
  @writer async increaseUsedAmount(amount: number) {
    await this.update((budget) => {
      budget.usedAmount += amount;
    });
  }
}

export class Expense extends Model {
  static table = "expenses";
  static associations: Associations = {
    user: { type: "belongs_to", key: "user_id" },
    budget: { type: "belongs_to", key: "budget_id" },
  };

  @text("notes") notes!: string;
  @field("amount") amount!: number;
  @date("date") date!: Date;
  @field("is_recurring") isRecurring!: boolean;

  // Relations
  @immutableRelation("users", "user_id") user!: Relation<User>;
  @relation("budgets", "budget_id") budget!: Relation<Budget>;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}

export class Category extends Model {
  static table = "categories";
  static associations: Associations = {
    expenses: { type: "has_many", foreignKey: "category_id" },
  };

  @text("name") name!: string;
  @text("icon") icon!: string;
  @text("color") color!: string;
  @text("icon_library") iconLibrary!: string;
  @text("description") description!: string;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
