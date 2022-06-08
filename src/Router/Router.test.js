import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Router } from "./Router";

describe("TEST APP", () => {
  it("Router test", () => {
    render(
      <MemoryRouter>
        <Router />
      </MemoryRouter>
    );
    const mainLink = screen.getByTestId("main-link");
    const aboutLink = screen.getByTestId("about-link");
    userEvent.click(aboutLink);
    expect(screen.getByTestId("about-link")).toBeInTheDocument();
    userEvent.click(mainLink);
    expect(screen.getByTestId("main-link")).toBeInTheDocument();
  });

  test("Error page test", () => {
    render(
      <MemoryRouter initialEntries={["/qwert"]}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });
});
