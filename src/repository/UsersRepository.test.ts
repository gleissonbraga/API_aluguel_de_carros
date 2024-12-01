import { UsersRepository } from "./UsersRepository";
import { db_query_params } from "../config/db";

jest.mock("../config/db", () => ({
  db_connect: jest.fn(),
  db_query: jest.fn(),
  db_query_params: jest.fn(),
}));

describe("UsersRepository - findUserById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a user without a password when a valid ID is provided", async () => {
    const mockId = 1;
    const mockUser = {
      id_user: mockId,
      name: "John Doe",
      cpf: "12345678900",
      email: "johndoe@example.com",
      password: "hashedpassword",
      created_at: new Date(),
    };

    (db_query_params as jest.Mock).mockResolvedValueOnce({
      rows: [mockUser],
    });

    const result = await UsersRepository.findUserById(mockId);

    expect(db_query_params).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE id_user = $1",
      [mockId]
    );
    expect(result).toEqual({
      id_user: mockUser.id_user,
      name: mockUser.name,
      cpf: mockUser.cpf,
      email: mockUser.email,
      created_at: mockUser.created_at,
    });
  });

  it("should return null if no user is found for the provided ID", async () => {
    const mockId = 2;

    (db_query_params as jest.Mock).mockResolvedValueOnce({
      rows: [],
    });

    const result = await UsersRepository.findUserById(mockId);

    expect(db_query_params).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE id_user = $1",
      [mockId]
    );
    expect(result).toBeNull();
  });
});
