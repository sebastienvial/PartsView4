export type Role = "client" | "intern";

export class User {
  readonly id!: string;
  firstname!: string;
  lastname!: string;
  name!: string;
  roles!: Role[];
}