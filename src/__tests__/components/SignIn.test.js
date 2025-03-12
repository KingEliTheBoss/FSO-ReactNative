import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";
import { useFormik } from "formik";
jest.mock("formik");

describe("SignIn", () => {
    describe("SignInContainer", () => {
        it("call onSubmit function with correct arguments when a valid form is submitted", async () => {
            const mockFormik = {
                initialValues: { username: "", password: "" },
                values: { username: "", password: "" },
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                onSubmit: jest.fn(),
                validationSchema: jest.fn(),
                errors: {},
                touched: {}
            }

            //useFormik.mockReturnValue(mockFormik);

            render(<SignInContainer formik={mockFormik} />)

            fireEvent.changeText(screen.getByTestId("testUsername"), "kalle");
            fireEvent.changeText(screen.getByTestId("testPassword"), "password");
            fireEvent.press(screen.getByText("Sign in"));

            await waitFor(() => {
                expect(mockFormik.handleSubmit).toHaveBeenCalledTimes(1);
                console.log(mockFormik.handleSubmit.mock.calls[0][0]);
                /*expect(mockFormik.handleSubmit.mock.calls[0][0]).toErual({
                    username: "kalle",
                    password: "password"
                });*/
            });
        });
    });
});