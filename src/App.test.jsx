/* eslint-disable testing-library/no-debugging-utils */
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

/*
Search variants:
  getBy:                    queryby:                    findBy:
- getByText               - queryByText               - findByText
- getByRole               - queryByRole               - findByRole
- getByLabelText          - queryByLabelText          - findByLabelText
- getByPlaceholderText    - queryByPlaceholderText    - findByPlaceholderText
- getByAltText            - queryByAltText            - findByAltText
- getByDisplayValue       - queryByDisplayValue       - findByDisplayValue
- getAllBy                - queryAllBy                - findAllBy
*/

/*
Assertive Functions:
- toBeDisabled            - toBeEnabled               - toBeEmpty
- toBeEmptyDOMElement     - toBeInTheDocument         - toBeInvalid
- toBeRequired            - toBeValid                 - toBeVisible
- toContainElement        - toContainHTML             - toHaveAttribute
- toHaveClass             - toHaveFocus               - toHaveFormValues
- toHaveStyle             - toHaveTextContent         - toHaveValue
- toHaveDisplayValue      - toBeChecked               - toBePartiallyChecked
- toHaveDescription
*/

describe("App", () => {
  it("renders App component get", () => {
    render(<App />);
    expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("search text...")).toBeInTheDocument();
    expect(screen.getByAltText("search image")).toBeInTheDocument();
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });

  it("renders App component get, query, fetch", async () => {
    render(<App />);
    // expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    expect(screen.queryByText(/Logged in as/)).toBeNull();
    screen.debug();
    expect(await screen.findByText(/Logged in as/)).toBeInTheDocument();
    screen.debug();
    // Assertive Functions Examples:
    expect(screen.getByAltText(/search image/)).toHaveClass("image");
    expect(screen.getByLabelText(/search/i)).not.toBeRequired();
    expect(screen.getByLabelText(/search/i)).toBeEmptyDOMElement();
    expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
  });

  it("renders App component fireEvent", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for React/)).toBeNull();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });
    expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
  });

  it("renders App component userEvent", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for React/)).toBeNull();
    userEvent.type(screen.getByRole("textbox"), "React");
    expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
  });
});

describe("fireEvent", () => {
  it("checkbox click", () => {
    const handleChange = jest.fn();
    render(<input type="checkbox" onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });

  it("input focus", () => {
    render(<input type="text" data-testid="simple-input" />);
    const input = screen.getByTestId("simple-input");
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });
});

describe("userEvent", () => {
  it("checkbox click", () => {
    const handleChange = jest.fn();
    render(<input type="checkbox" onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
    userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });

  it("double click", () => {
    const onChange = jest.fn();
    render(<input type="checkbox" onChange={onChange} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    userEvent.dblClick(checkbox);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("focus TAB", () => {
    render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    );
    const [checkbox, radio, number] = screen.getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  it("select option", () => {
    render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    userEvent.selectOptions(screen.getByRole("combobox"), "1");
    expect(screen.getByText("A").selected).toBeTruthy();

    userEvent.selectOptions(screen.getByRole("combobox"), "2");
    expect(screen.getByText("B").selected).toBeTruthy();
    expect(screen.queryByText("A").selected).toBeFalsy();
  });
});
