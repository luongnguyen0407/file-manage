import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../../../context/auth-context";
import userEvent from "@testing-library/user-event";
import axiosApi from "../../../axios/axiosApi";
import CreateContainer from "../CreateContainer";
const userInfo = { token: "abc" };
const setUserInfo = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: jest.fn(),
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe("CreateForm", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
          <CreateContainer />
        </AuthContext.Provider>
      );
    });
  });
  test("renders a form with two input fields", async () => {
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  });
  it("displays error messages when inputs are empty", async () => {
    const loginButton = screen.getByRole("button", { name: "Create" });
    userEvent.click(loginButton);
    const nameError = await screen.findByText("email is a required field");
    expect(nameError).toBeInTheDocument();
    const lastName = await screen.findByText("last_name is a required field");
    expect(lastName).toBeInTheDocument();
    const firstName = await screen.findByText("first_name is a required field");
    expect(firstName).toBeInTheDocument();
  });
  it("should successfully create the user", async () => {
    const res = await axiosApi.post("/users", {
      name: "morpheus",
      job: "leader",
    });
    expect(res.status).toBe(201);
  });
});
