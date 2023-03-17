import React from "react";
import { render } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading component", () => {
  test("renders loading animation", () => {
    const { container } = render(<Loading />);
    const pulseDivs = container.querySelectorAll(".animate-pulse > div");
    expect(pulseDivs.length).toBe(3);
    pulseDivs.forEach((div) => {
      expect(div).toHaveClass("bg-blue-400");
      expect(div).toHaveClass("rounded-full");
    });
  });

  test("has a screen height", () => {
    const { container } = render(<Loading />);
    const screenDiv = container.querySelector(".h-screen");
    expect(screenDiv).toBeInTheDocument();
  });
});
