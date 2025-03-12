import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    mainView: {
        padding: 15,
        backgroundColor: theme.colors.white
    },
    rowDir: {
        flexDirection: "row",
    },
    repositoryInfoView: {
        paddingLeft: 15,
        gap: 5
    },
    darkText: {
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeights.bold
    },
    lightText: {
        color: theme.colors.textSecondary,
        width: 330
    },
    languageText: {
        color: theme.colors.white,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
        alignSelf: "flex-start"
    },
    repositoryCountersView: {
        justifyContent: "space-between",
        paddingTop: 15,
        paddingHorizontal: 30,
    },
    alignItemsCenter: {
        alignItems: "center"
    }
});

const RepositoryItem = ({ item }) => {
    const navigate = useNavigate();

    return (
        <View key={item.id} testID="repositoryItem" style={styles.mainView}>
            <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
                <View style={styles.rowDir}>
                    <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
                    <View style={styles.repositoryInfoView}>
                        <Text style={styles.darkText}>{item.fullName}</Text>
                        <Text style={styles.lightText}>{item.description}</Text>
                        <Text style={styles.languageText}>{item.language}</Text>
                    </View>
                </View>
                <View style={[styles.rowDir, styles.repositoryCountersView]}>
                    <View style={styles.alignItemsCenter}>
                        <Text style={styles.darkText}>{item.stargazersCount >= 1000 ? `${Math.round(item.stargazersCount / 1000 * 10) / 10}k` : item.stargazersCount}</Text>
                        <Text>Stars</Text>
                    </View>
                    <View style={styles.alignItemsCenter}>
                        <Text style={styles.darkText}>{item.forksCount >= 1000 ? `${Math.round(item.forksCount / 1000 * 10) / 10}k` : item.forksCount}</Text>
                        <Text>Forks</Text>
                    </View>
                    <View style={styles.alignItemsCenter}>
                        <Text style={styles.darkText}>{item.reviewCount}</Text>
                        <Text>Reviews</Text>
                    </View>
                    <View style={styles.alignItemsCenter}>
                        <Text style={styles.darkText}>{item.ratingAverage}</Text>
                        <Text>Rating</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default RepositoryItem;