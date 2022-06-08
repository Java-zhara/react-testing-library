import axios from "axios";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Async } from "./Async";

jest.mock("axios");

const hits = [
  { objectID: "1", title: "React" },
  { objectID: "2", title: "Angular" },
];

describe("Async", () => {
  it("fetches news from an API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
    render(<Async />);
    userEvent.click(screen.getByRole("button"));
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);
    // Additional
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "http://hn.algolia.com/api/v1/search?query=React"
    );
  });

  it("fetches news from an API and reject", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    render(<Async />);
    userEvent.click(screen.getByRole("button"));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });

  it("fetches news from an API (alternative)", async () => {
    const promise = Promise.resolve({ data: { hits } });
    axios.get.mockImplementationOnce(() => promise);
    render(<Async />);
    userEvent.click(screen.getByRole("button"));
    await act(() => promise);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
