import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { FlatList, Pressable, View, Linking, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";

const fixedWith = 50;
const styles = StyleSheet.create({
    separator: {
        height: 10
    },
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
        width: "85%",
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
    },
    githubButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    },
    githubText: {
        color: theme.colors.white
    },
    githubView: {
        paddingTop: 10
    },
    reviewRating: {
        width: fixedWith,
        height: fixedWith,
        borderRadius: fixedWith / 2,
        borderColor: theme.colors.primary,
        borderWidth: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    reviewRatingText: {
        color: theme.colors.primary,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold
    }
});

const RepositoryInfo = ({ repository }) => {
    return (
        <View key={repository.id} testID="repositoryItem" style={styles.mainView}>
            <View style={styles.rowDir}>
                <Image style={styles.tinyLogo} source={{ uri: repository.ownerAvatarUrl }} />
                <View style={styles.repositoryInfoView}>
                    <Text style={styles.darkText}>{repository.fullName}</Text>
                    <Text style={styles.lightText}>{repository.description}</Text>
                    <Text style={styles.languageText}>{repository.language}</Text>
                </View>
            </View>
            <View style={[styles.rowDir, styles.repositoryCountersView]}>
                <View style={styles.alignItemsCenter}>
                    <Text style={styles.darkText}>{repository.stargazersCount >= 1000 ? `${Math.round(repository.stargazersCount / 1000 * 10) / 10}k` : repository.stargazersCount}</Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.alignItemsCenter}>
                    <Text style={styles.darkText}>{repository.forksCount >= 1000 ? `${Math.round(repository.forksCount / 1000 * 10) / 10}k` : repository.forksCount}</Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.alignItemsCenter}>
                    <Text style={styles.darkText}>{repository.reviewCount}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.alignItemsCenter}>
                    <Text style={styles.darkText}>{repository.ratingAverage}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
            <View style={styles.githubView}>
                <Pressable style={styles.githubButton} onPress={() => Linking.openURL(repository.url)}>
                    <Text style={styles.githubText}>Open in GitHub</Text>
                </Pressable>
            </View>

        </View>
    );
};

const ReviewItem = ({ review }) => {
    return (
        <View key={review.id} style={styles.mainView}>
            <View style={styles.rowDir}>
                <View style={styles.reviewRating}>
                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                </View>
                <View style={styles.repositoryInfoView}>
                    <Text style={styles.darkText}>{review.user.username}</Text>
                    <Text style={styles.lightText}>{format(review.createdAt, "dd.MM.yyyy")}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
        </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, fetchMore } = useRepository({first: 3, repositoryId: id});

    if (!repository) {
        return null;
    }

    const reviews = repository.reviews ? repository.reviews.edges.map(edge => edge.node) : [];

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <View>
                    <RepositoryInfo repository={repository} />
                    <ItemSeparator />
                </View>
            )}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    )
};

export default SingleRepository;