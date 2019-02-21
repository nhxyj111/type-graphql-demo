import {
  Arg,
  ClassType,
  Field,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { Middleware } from "type-graphql/interfaces/Middleware";
import { Product } from "../../entity/Product";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

export function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middlewares?: Middleware<any>[]
) {
  @Resolver()
  class BaseResolver {
    // @Query(type => [returnType], { name: `getAll${suffix}` })
    // async getAll(@Arg("first", type => Int) first: number): Promise<T[]> {
    //   return entity.find();
    // }

    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middlewares || []))
    async create(@Arg("data", () => inputType) data: any) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @Field()
  name: string;
}

export const BaseCreateUser = createResolver("User", User, RegisterInput, User);
export const BaseCreateProduct = createResolver(
  "Product",
  Product,
  ProductInput,
  Product
);
