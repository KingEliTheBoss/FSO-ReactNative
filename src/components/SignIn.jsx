import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

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
    password: ""
};

const onSubmit = values => {
    const username = values.username;
    const password = values.password;

    console.log(username, password);
};

const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
});

const SignIn = () => {
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
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    )
};

export default SignIn;