import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../../../context/auth-context";
import userEvent from "@testing-library/user-event";
import axiosApi from "../../../axios/axiosApi";
import CreateContainer from "../CreateContainer";
import MockAdapter from "axios-mock-adapter";
import { toast } from "react-toastify";
const userInfo = { token: "abc" };
const setUserInfo = jest.fn();
const mockedUsedNavigate = jest.fn();
const mockedToastSuccess = jest.spyOn(toast, "success");

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
  it("should successfully create the user", async () => {
    const firstName = screen.getByLabelText("First Name");
    const lastName = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Create" });
    fireEvent.change(email, { target: { value: "eve.holt@reqres.in" } });
    fireEvent.change(lastName, { target: { value: "cityslicka" } });
    fireEvent.change(firstName, { target: { value: "cityslicka" } });
    const mockedUserInfo = {
      email: "eve.holt@reqres.in",
      last_name: "cityslicka",
      first_name: "cityslicka",
      updatedAt: "2023-03-16T09:00:40.617Z",
    };
    const data = {
      email: "eve.holt@reqres.in",
      last_name: "cityslicka",
      first_name: "cityslicka",
    };
    fireEvent.click(submitButton);
    await waitFor(() => {
      mockAxios.onPost("/users", data).reply(201, mockedUserInfo);
    });
    expect(mockedToastSuccess).toHaveBeenCalledWith("Create success");
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
});
