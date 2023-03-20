import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import React from "react";
import MockAdapter from "axios-mock-adapter";
import HomeContainer from "../HomeContainer";
import axiosApi from "../../../axios/axiosApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/auth-context";
import "@testing-library/jest-dom";
import { API } from "../../../config/constants";
const userInfo = { token: "abc" };
const setUserInfo = jest.fn();
const mockedUsedNavigate = jest.fn();
const mockedToastError = jest.spyOn(toast, "error");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useCallback: jest.fn((cb) => cb),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));
const data = {
  page: 2,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [
    {
      id: 1,
      email: "michael.lawson@reqres.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    },
  ],
};
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
    mockAxios.onGet(API.LIST_USER).reply(200, data);
    await act(async () => {
      render(
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
          <HomeContainer />
        </AuthContext.Provider>
      );
    });
  });

  it("should get list data user", async () => {
    const btnTest = screen.getAllByTestId("delete-item");
    fireEvent.click(btnTest[0]);
    const confirm = await screen.findByText("Are you sure?");
    expect(confirm).toBeInTheDocument();
    const confirmOk = await screen.findByText("OK");
    fireEvent.click(confirmOk);
    mockAxios.onDelete(API.DELETE_USER + "/1").reply(204);
    const confirmSuccess = await screen.findByText(
      "Your file has been deleted."
    );
    expect(confirmSuccess).toBeInTheDocument();
  });

  it("displays error messages when delete error", async () => {
    const btnTest = screen.getAllByTestId("delete-item");
    fireEvent.click(btnTest[0]);
    const confirm = await screen.findByText("Are you sure?");
    expect(confirm).toBeInTheDocument();
    const confirmOk = await screen.findByText("OK");
    fireEvent.click(confirmOk);
    await waitFor(() => {
      mockAxios.onDelete(API.DELETE_USER + "/5").reply(400);
    });
    expect(mockedToastError).toHaveBeenCalledWith("Error");
  });
});
