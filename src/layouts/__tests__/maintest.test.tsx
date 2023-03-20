import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { PAGE } from "../../config/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import MainLayout from "../MainLayout";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(),
}));

describe("Main Layout", () => {
  it("should navigate to login page when token is available", () => {
    (useLocalStorage as jest.Mock).mockReturnValue([null, jest.fn()]);
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<MainLayout />);

    expect(mockNavigate).toHaveBeenCalledWith(PAGE.LOGIN);
  });
});
