import { Model, Relation } from "@nozbe/watermelondb";
import { Associations } from "@nozbe/watermelondb/Model";
import {
  date,
  relation,
  immutableRelation,
  text,
  field,
  readonly,
} from "@nozbe/watermelondb/decorators";
import { number } from "yup";

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

// export class Profile extends Model {
//   static table = "profiles";

// }

// export class Settings extends Model {
//   static table = "settings";
// }

export class Budget extends Model {
  static table = "budget";
  static associations: Associations = {
    user: { type: "belongs_to", key: "user_id" },
  };

  @field("amount") amount!: number;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  @immutableRelation("users", "user_id") user_id!: Relation<User> | string;
}

export class Expense extends Model {
  static table = "expenses";
  static associations: Associations = {
    user: { type: "belongs_to", key: "user_id" },
    category: { type: "belongs_to", key: "category_id" },
  };

  @text("notes") notes!: string;
  @field("amount") amount!: number;
  @date("date") date!: Date;
  @field("is_recurring") isRecurring!: boolean;

  // Relations
  @immutableRelation("users", "user_id") user_id!: Relation<User> | string;
  @relation("categories", "category_id") category_id!:
    | Relation<Category>
    | string;

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
