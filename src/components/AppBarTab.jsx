import { StyleSheet, Pressable, Text } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

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
    return (
        <Pressable style={styles.tab}>
            <Link to={route}>
                <Text style={styles.text}>{tabText}</Text>
            </Link>
        </Pressable>
    )
};

export default AppBarTab;