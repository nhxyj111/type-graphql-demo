import { Connection } from "typeorm";
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
    id
    email
    firstName
    lastName 
    name
  }
}
`;

describe("Register", () => {
  it("create user", async () => {
    await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          firstName: "fff",
          lastName: "LLL",
          email: "me@me.me",
          password: "123456"
        }
      }
    });
  });
});
