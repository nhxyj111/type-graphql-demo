import { Arg, Mutation, Resolver } from "type-graphql";
import { confirmationPrefix } from "../../constants/redisPrefixes";
import { User } from "../../entity/User";
import { redis } from "../../redis";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string) {
    const userId = await redis.get(confirmationPrefix + token);

    if (!userId) {
      return false;
    }

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(confirmationPrefix + token);

    return true;
  }
}
