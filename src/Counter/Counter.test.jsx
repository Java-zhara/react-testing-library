import { render, screen } from "@testing-library/react";
import Counter from "./Counter";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createReduxStore } from "../store/store";

describe("Counter test", () => {
  it("Test router", () => {
    render(
      <Provider
        store={createReduxStore({
          counter: { value: 10 },
        })}
      >
        <Counter />
      </Provider>
    );

    const incrementBtn = screen.getByTestId("increment-btn");
    expect(screen.getByTestId("value-title")).toHaveTextContent("10");
    userEvent.click(incrementBtn);
    expect(screen.getByTestId("value-title")).toHaveTextContent("11");
  });
});
