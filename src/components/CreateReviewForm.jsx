import { View, StyleSheet, TextInput, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
    separator: {
        height: 10
    },
    mainView: {
        padding: 15,
        backgroundColor: theme.colors.white,
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
    ownerName: "",
    repositoryName: "",
    rating: 0,
    text: ""
};

const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Username is required"),
    repositoryName: yup.string().required("Name of repository is required"),
    rating: yup
        .number("Rating must be a number")
        .integer()
        .min(0, "Rating must be 0 or more")
        .max(100, "Rating must be 100 or less")
        .required("Rating is required"),
    text: yup.string().optional()
});

const CreateReviewForm = () => {
    const [create] = useCreateReview();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;
        try {
            const data = await create({ ownerName, repositoryName, rating: Number(rating), text });
            console.log(data);
            navigate(`/repository/${data.createReview.repositoryId}`);
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
            <TextInput style={[styles.fields, (formik.errors.ownerName) ? { borderColor: theme.colors.error } : null]}
                placeholder="Repository owner name"
                value={formik.values.ownerName}
                onChangeText={formik.handleChange("ownerName")}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={{ color: theme.colors.error }}>{formik.errors.ownerName}</Text>
            )}

            <TextInput style={[styles.fields, (formik.errors.repositoryName) ? { borderColor: theme.colors.error } : null]}
                placeholder="Repository name"
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange("repositoryName")}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={{ color: theme.colors.error }}>{formik.errors.repositoryName}</Text>
            )}

            <TextInput style={[styles.fields, (formik.errors.rating) ? { borderColor: theme.colors.error } : null]}
                placeholder="Rating between 0 and 100"
                value={formik.values.rating}
                onChangeText={formik.handleChange("rating")}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={{ color: theme.colors.error }}>{formik.errors.rating}</Text>
            )}

            <TextInput style={[styles.fields, (formik.errors.text) ? { borderColor: theme.colors.error } : null]}
                placeholder="text"
                value={formik.values.text}
                onChangeText={formik.handleChange("text")}
                multiline
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={{ color: theme.colors.error }}>{formik.errors.text}</Text>
            )}

            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
        </View>
    );
};

export default CreateReviewForm;