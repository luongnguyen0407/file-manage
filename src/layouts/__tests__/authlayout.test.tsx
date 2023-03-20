import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { PAGE } from "../../config/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import AuthLayout from "../AuthLayout";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(),
}));

describe("AuthLayout", () => {
  it("should navigate to home page when token is available", () => {
    (useLocalStorage as jest.Mock).mockReturnValue(["my-token", jest.fn()]);
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<AuthLayout />);

    expect(mockNavigate).toHaveBeenCalledWith(PAGE.HOME);
  });
});
