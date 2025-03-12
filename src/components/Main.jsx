import { StyleSheet, View, Platform } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import theme from "../theme";
import SingleRepository from "./SingleRepository";
import CreateReviewForm from "./CreateReviewForm";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.backgroundLight,
        fontFamily: Platform.select({
            android: "Roboto",
            ios: "Arial",
            default: "System"
        })
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/createReview" element={<CreateReviewForm />} />
                <Route path="/myReviews" element={<MyReviews />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/repository/:id" element={<SingleRepository />} />
                <Route path="*" element={<Navigate to={"/"} replace />} />
            </Routes>
        </View>
    )
};

export default Main;