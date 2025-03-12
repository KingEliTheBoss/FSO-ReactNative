import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.secondary
    },
    scrollView: {
        flexDirection: "row"
    }
});

const AppBar = () => {
    const { data, error, loading } = useQuery(GET_ME, { variables: { includeReviews: false }, fetchPolicy: "cache-and-network" });
    
    if (!data) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab tabText={"Repositories"} route={"/"} />
                <AppBarTab tabText={"Create a review"} route={"/createReview"} />
                {data.me && <AppBarTab tabText={"My Reviews"} route={"/myReviews"} />}
                {data.me && <AppBarTab tabText={"Sign Out"} route={"/signout"} />}
                {!data.me && <AppBarTab tabText={"Sign in"} route={"/signin"} />}
                {!data.me && <AppBarTab tabText={"Sign Up"} route={"/signup"} />}
            </ScrollView>
        </View>
    );
};

export default AppBar;