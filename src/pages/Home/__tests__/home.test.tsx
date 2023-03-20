import { render, screen, act, fireEvent } from "@testing-library/react";
import React from "react";
import MockAdapter from "axios-mock-adapter";
import HomeContainer from "../HomeContainer";
import axiosApi from "../../../axios/axiosApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/auth-context";
import "@testing-library/jest-dom";
import { API } from "../../../config/constants";
import Swal, { SweetAlertResult } from "sweetalert2";
import Home from "../Home";
const userInfo = { token: "abc" };
const setUserInfo = jest.fn();
const mockedUsedNavigate = jest.fn();
const mockedToastSuccess = jest.spyOn(toast, "success");
const mockSetState = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useCallback: jest.fn((cb) => cb),
}));
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
const mockFire = jest.spyOn(Swal, "fire").mockImplementation(() => {
  return Promise.resolve({
    isConfirmed: true,
  } as SweetAlertResult<unknown>);
});
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
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: jest.fn(),
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe("CreateForm", () => {
  let mockAxios: MockAdapter;
  let handleDeleteUser;
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
    mockAxios.onGet(API.LIST_USER, {}).reply(200, data);
    await act(async () => {
      render(
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
          <HomeContainer />
        </AuthContext.Provider>
      );
    });
  });
  it("should get list data user", async () => {
    expect(mockSetState).toHaveBeenCalledWith(data.data);
  });
  it("should show confirm dialog when clicking on delete icon", async () => {
    const handleDelete = jest.fn();
    const users = [
      {
        id: 1,
        email: "test1@example.com",
        first_name: "John",
        last_name: "Doe",
        avatar: "avatar1.jpg",
      },
      {
        id: 2,
        email: "test2@example.com",
        first_name: "Jane",
        last_name: "Doe",
        avatar: "avatar2.jpg",
      },
    ];
    render(<Home users={users} handleDelete={handleDelete} />);
    const btnTest = screen.getAllByTestId("delete-item");
    fireEvent.click(btnTest[0]);
    expect(handleDelete).toHaveBeenCalled();
    mockAxios.onDelete(API.DELETE_USER + "/1").reply(204);
  });
});
