import { StyleSheet, Pressable, Text } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
    tab: {
        paddingLeft: 15,
        paddingTop: 10,
        height: 50,
    },
    text: {
        color: theme.colors.textLight,
        fontSize: 20
    }
});

const AppBarTab = ({ tabText, route }) => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    };

    if (route === "/signout") {
        return (
            <Pressable style={styles.tab} onPress={signOut}>
                <Text style={styles.text}>{tabText}</Text>
            </Pressable>
        )
    } else {
        return (
            <Pressable style={styles.tab}>
                <Link to={route}>
                    <Text style={styles.text}>{tabText}</Text>
                </Link>
            </Pressable>
        )
    }
};

export default AppBarTab;