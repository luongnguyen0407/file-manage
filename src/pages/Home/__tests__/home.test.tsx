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
const mockedToastSuccess = jest.spyOn(toast, "success");
const mockSetState = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initialState: any) => [initialState, mockSetState],
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
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
          <HomeContainer />
        </AuthContext.Provider>
      );
    });
  });
  it("should get list data user", async () => {
    const setUsers = jest.fn();
    const data = {
      page: 2,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 7,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
      ],
    };
    mockAxios.onGet(API.LIST_USER, {}).reply(200, data);
    expect(mockSetState).toHaveBeenCalledWith(data.data);
  });
});
