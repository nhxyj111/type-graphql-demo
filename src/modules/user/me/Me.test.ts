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

const meQuery = `
{
  me {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Me", () => {
  it("get user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id
    });
    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`
        }
      }
    });
  });
});
