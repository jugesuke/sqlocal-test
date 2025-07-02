import type { Generated } from "kysely";

export type Schema = {
  groceries: Grocery;
};

export type Grocery = {
  id: Generated<number>;
  name: string;
  quantity: number;
};
