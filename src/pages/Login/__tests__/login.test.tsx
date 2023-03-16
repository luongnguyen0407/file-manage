import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../../../context/auth-context";
import LoginContainer from "../LoginContainer";
import userEvent from "@testing-library/user-event";
import axiosApi from "../../../axios/axiosApi";
import MockAdapter from "axios-mock-adapter";
import { toast } from "react-toastify";
const userInfo = { token: "abc" };
const setUserInfo = jest.fn();
const mockedUsedNavigate = jest.fn();
const mockedToastSuccess = jest.spyOn(toast, "success");
const mockedToastError = jest.spyOn(toast, "error");
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
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.change(emailInput, { target: { value: "eve.holt@reqres.in" } });
    fireEvent.change(passwordInput, { target: { value: "cityslicka" } });
    const mockedUserInfo = {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      token: "abcxyz",
    };
    const data = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };
    fireEvent.click(submitButton);
    await waitFor(() => {
      mockAxios.onPost("/login", data).reply(200, mockedUserInfo);
    });
    expect(mockedToastSuccess).toHaveBeenCalledWith("Login success");
  });
  it("should failed log in the user", async () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.change(emailInput, { target: { value: "eve.holt@reqresss.in" } });
    fireEvent.change(passwordInput, { target: { value: "cityslicksssa" } });
    const mockedUserInfo = {
      error: "user not found",
    };
    const data = {
      email: "eve.holt@reqresss.in",
      password: "cityslicksssa",
    };
    fireEvent.click(submitButton);
    await waitFor(() => {
      mockAxios.onPost("/login", data).reply(400, mockedUserInfo);
    });
    expect(mockedToastError).toHaveBeenCalledWith("Error");
  });
});
