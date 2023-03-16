import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../../../context/auth-context";
import LoginContainer from "../LoginContainer";
import userEvent from "@testing-library/user-event";
import axiosApi from "../../../axios/axiosApi";
import MockAdapter from "axios-mock-adapter";
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

describe("LoginForm", () => {
  let mockAxios: MockAdapter;
  beforeAll(() => {
    mockAxios = new MockAdapter(axiosApi);
  });
  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });
  beforeEach(async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
          <LoginContainer />
        </AuthContext.Provider>
      );
    });
  });
  test("renders a form with two input fields", async () => {
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });
  it("renders the headingElement", () => {
    const headingElement = screen.getByRole("heading", { name: "Login" });
    expect(headingElement).toBeInTheDocument();
  });
  it("displays error messages when inputs are empty", async () => {
    const loginButton = screen.getByRole("button", { name: "Login" });
    userEvent.click(loginButton);
    const nameError = await screen.findByText("email is a required field");
    expect(nameError).toBeInTheDocument();

    const emailError = await screen.findByText("password is a required field");
    expect(emailError).toBeInTheDocument();
  });
  it("should successfully log in the user", async () => {
    const res = await axiosApi.post("/login", {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });
    expect(res.status).toBe(200);
  });
});
