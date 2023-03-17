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
import MockAdapter from "axios-mock-adapter";
import UpdateContainer from "../UpdateContainer";
import { toast } from "react-toastify";
const userInfo = { token: "abc" };
const setUserInfo = jest.fn();
const mockedUsedNavigate = jest.fn();
const mockedToastSuccess = jest.spyOn(toast, "success");
const mockedToastError = jest.spyOn(toast, "error");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({
    id: "3",
  }),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: jest.fn(),
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe("UpdateForm", () => {
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
          <UpdateContainer />
        </AuthContext.Provider>
      );
    });
  });
  test("renders a form with three input fields", async () => {
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  });
  test("should call axios.get old data with the correct id", async () => {
    mockAxios.onGet("/users/3").reply(400, { message: "error" });
    expect(mockedToastError).toHaveBeenCalledWith("Error");
  });
  it("displays error messages when inputs are empty", async () => {
    const loginButton = screen.getByRole("button", { name: "Save Changes" });
    userEvent.click(loginButton);
    const nameError = await screen.findByText("email is a required field");
    expect(nameError).toBeInTheDocument();
    const lastName = await screen.findByText("last_name is a required field");
    expect(lastName).toBeInTheDocument();
    const firstName = await screen.findByText("first_name is a required field");
    expect(firstName).toBeInTheDocument();
  });
  it("should successfully update the user", async () => {
    const firstName = screen.getByLabelText("First Name");
    const lastName = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Save Changes" });
    fireEvent.change(email, { target: { value: "eve.holt@reqres.in" } });
    fireEvent.change(lastName, { target: { value: "cityslicka_update" } });
    fireEvent.change(firstName, { target: { value: "cityslicka_update" } });
    const mockedUserInfo = {
      email: "eve.holt@reqres.in",
      last_name: "cityslicka_update",
      first_name: "cityslicka_update",
      updatedAt: "2023-03-16T09:00:40.617Z",
    };
    const data = {
      email: "eve.holt@reqres.in",
      last_name: "cityslicka_update",
      first_name: "cityslicka_update",
    };
    fireEvent.click(submitButton);
    await waitFor(() => {
      mockAxios.onPut("/users/3", data).reply(200, mockedUserInfo);
    });
    expect(mockedToastSuccess).toHaveBeenCalledWith("Update success");
  });
  it("should navigate to homepage when there is no id parameter", async () => {
    const useParamsMock = jest.spyOn(require("react-router-dom"), "useParams");
    useParamsMock.mockReturnValue({ id: null });

    await act(async () => {
      render(
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
          <UpdateContainer />
        </AuthContext.Provider>
      );
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
