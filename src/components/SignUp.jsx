import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: theme.colors.white,
        padding: 15,
        gap: 15
    },
    fields: {
        height: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
        paddingLeft: 25,
        fontSize: theme.fontSizes.subheading
    },
    button: {
        height: 60,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: theme.fontSizes.subheading,
        fontFamily: "Roboto",
        color: theme.colors.white,
    }
});

const initialValues = {
    username: "",
    password: "",
    passwordConfirm: ""
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(5, "Username must be at least 5 characters long")
        .max(30, "Username must be 30 or less characters long"),
    password: yup
        .string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters long")
        .max(50, "Password must be 50 or less characters long"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null])
        .required("Password confirmation is required")
});

const SignUp = () => {
    const [signIn] = useSignIn();
    const [signUp] = useSignUp();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password, passwordConfirm } = values;
        try {
            const data = await signUp({ username, password });
            const data2 = await signIn({ username, password });
            console.log(data);
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <View style={styles.mainView}>
            <TextInput style={[styles.fields, (formik.errors.username) ? { borderColor: theme.colors.error } : null]}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange("username")}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
            )}

            <TextInput style={[styles.fields, (formik.errors.password) ? { borderColor: theme.colors.error } : null]}
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                secureTextEntry
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: theme.colors.error }}>{formik.errors.password}</Text>
            )}

            <TextInput style={[styles.fields, (formik.errors.passwordConfirm) ? { borderColor: theme.colors.error } : null]}
                placeholder="Password Confirmation"
                value={formik.values.passwordConfirm}
                onChangeText={formik.handleChange("passwordConfirm")}
                secureTextEntry
            />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                <Text style={{ color: theme.colors.error }}>{formik.errors.passwordConfirm}</Text>
            )}

            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
        </View>
    )
};

export default SignUp;