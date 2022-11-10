import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading and 2 tabs one for sign in and the other for sign up", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Questionnare App/i,
    });
    const signInTab = screen.getByRole("tab", { name: "Sign In" });
    const signUpTab = screen.getByRole("tab", { name: "Sign Up" });

    expect(signInTab).toBeInTheDocument();
    expect(signUpTab).toBeInTheDocument;
    expect(heading).toBeInTheDocument();
  });
});

describe("Signing in", () => {
  it("renders sign in form when user clicks on sign in tab", async () => {
    render(<Home />);

    //const tab = screen.getByRole("")
    //screen.debug();
    const signInTab = screen.getByRole("tab", { name: "Sign In" });
    const signInButton = await screen.findByRole("button", {
      name: /sign in/i,
    });

    const name = screen.queryByPlaceholderText(/name/i);
    expect(signInTab).toBeInTheDocument();
    expect(name).not.toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    //expect(signInButton).toBeDisabled();

    userEvent.type(
      screen.getByPlaceholderText(/email address/i, {
        name: "test@test.com",
      })
    );
    userEvent.type(screen.getByPlaceholderText(/password/i, { name: "test" }));

    expect(signInButton).toBeEnabled();
    //userEvent.click(signInButton);
    /* const name = tab.getByRole("input", {
        name: "name",
      }) */
    //expect(name).not.toBeInTheDocument();
  });
});

describe("signing up", function () {
  it("shows signup form when user clicks sign up tab", () => {
    render(<Home />);

    screen.getByRole("tab", { name: "Sign Up" }).click();
    userEvent.type(screen.getByPlaceholderText(/name/i), "john doe");
    userEvent.type(
      screen.getByPlaceholderText(/email address/i),
      "email@yahoo.com"
    );
    userEvent.type(screen.getByPlaceholderText(/password/i), "passss");

    //screen.debug();
    //screen.getByRole("tab", { name: "Sign Up" }).click();
  });
});
