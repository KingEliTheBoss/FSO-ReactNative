import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

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
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab tabText={"Repositories"} route={"/"} />
                <AppBarTab tabText={"Sign in"} route={"/signin"} />
            </ScrollView>
        </View>
    );
};

export default AppBar;