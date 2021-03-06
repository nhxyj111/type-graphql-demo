import faker from "faker";
import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";

let conn: Connection;

beforeAll(async () => {
  jest.setTimeout(20000);
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(data: $data) {
    email
    firstName
    lastName 
  }
}
`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const { password, ...userNoPass } = user;

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });
    expect(response).toMatchObject({
      data: {
        register: {
          ...userNoPass
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.email).toBe(user.email);
    expect(dbUser!.confirmed).toBeFalsy();
  });
});
