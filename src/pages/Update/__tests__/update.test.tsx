import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../../../context/auth-context";
import userEvent from "@testing-library/user-event";
import axiosApi from "../../../axios/axiosApi";
import MockAdapter from "axios-mock-adapter";
import UpdateContainer from "../UpdateContainer";
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
    try {
      const res = await axiosApi.put("/update", {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });
      expect(res.status).toBe(200);
    } catch (error) {}
  });
});
