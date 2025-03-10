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
    const { data, error, loading } = useQuery(GET_ME, { fetchPolicy: "cache-and-network" });
    if (!data) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab tabText={"Repositories"} route={"/"} />
                {data.me
                    ? <AppBarTab tabText={"Sign Out"} route={"/signout"} />
                    : <AppBarTab tabText={"Sign in"} route={"/signin"} />}
            </ScrollView>
        </View>
    );
};

export default AppBar;