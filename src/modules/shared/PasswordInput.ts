import { MinLength } from "class-validator";
import { ClassType, Field, InputType } from "type-graphql";

@InputType()
export class PasswordInput {
  @Field()
  password: string;
}

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass {
    @Field()
    @MinLength(5)
    password: string;
  }
  return PasswordInput;
};
