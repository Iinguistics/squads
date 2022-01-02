import React from "react";
import LoginForm from "./LoginForm";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Testing LoginForm component", () => {
    test("should render to page", () => {
        // const loginFormComp = render(<LoginForm />);
        // loginFormComp.debug();

        render(<LoginForm />);

        const form = screen.getByTestId("login-form");
        const inputs = form.getElementsByClassName("shadow-none")[0];

        expect(inputs.length).toBe(2);
    });
});
