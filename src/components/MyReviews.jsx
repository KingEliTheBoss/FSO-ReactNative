import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

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
        padding: 15,
        width: "50%"
    },
    githubButtonRed: {
        backgroundColor: theme.colors.error,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "50%"
    },
    githubText: {
        color: theme.colors.white,
        fontSize: theme.fontSizes.subheading
    },
    githubView: {
        paddingTop: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%"
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

const ReviewItem = ({ review, refetchReviews }) => {
    const navigate = useNavigate();
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const handleDeletion = () => {
        Alert.alert("Delete review", "Are you sure that you want to delete this review", [
            { text: "CANCEL", style: "cancel" },
            {
                text: "DELETE", onPress: async () => {
                    await mutate({ variables: { deleteReviewId: review.id } });
                    refetchReviews();
                }
            }
        ]);
    };

    return (
        <View key={review.id} style={styles.mainView}>
            <View style={styles.rowDir}>
                <View style={styles.reviewRating}>
                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                </View>
                <View style={styles.repositoryInfoView}>
                    <Text style={styles.darkText}>{review.repository.fullName}</Text>
                    <Text style={styles.lightText}>{format(review.createdAt, "dd.MM.yyyy")}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            <View style={[styles.githubView, styles.rowDir]}>
                <Pressable style={styles.githubButton} onPress={() => navigate(`/repository/${review.repositoryId}`)}>
                    <Text style={styles.githubText}>View Repository</Text>
                </Pressable>
                <Pressable style={styles.githubButtonRed} onPress={handleDeletion}>
                    <Text style={styles.githubText}>Delete review</Text>
                </Pressable>
            </View>
        </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { data, error, loading, refetch } = useQuery(GET_ME, {
        variables: { includeReviews: true },
        fetchPolicy: "cache-and-network"
    });
    if (!data) {
        return null;
    }

    const reviews = data.me.reviews ? data.me.reviews.edges.map(edge => edge.node) : [];

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} refetchReviews={refetch} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    )
};

export default MyReviews;