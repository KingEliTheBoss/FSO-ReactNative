import { FlatList, View, StyleSheet, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Picker } from "@react-native-picker/picker";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme";

/*const repositories = [
    {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1589,
        stargazersCount: 21553,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4"
    },
    {
        id: "rails.rails",
        fullName: "rails/rails",
        description: "Ruby on Rails",
        language: "Ruby",
        forksCount: 18349,
        stargazersCount: 45377,
        ratingAverage: 100,
        reviewCount: 2,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4"
    },
    {
        id: "django.django",
        fullName: "django/django",
        description: "The Web framework for perfectionists with deadlines",
        language: "Python",
        forksCount: 21015,
        stargazersCount: 48496,
        ratingAverage: 75,
        reviewCount: 5,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4"
    },
    {
        id: "reduxjs.redux",
        fullName: "reduxjs/redux",
        description: "Predictable state container for Javascript apps",
        language: "TypeScript",
        forksCount: 13902,
        stargazersCount: 52869,
        ratingAverage: 0,
        reviewCount: 0,
        ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4"
    }
];*/

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
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, handleSortSelection, filterWord, handleFilterWord, onEndReach }) => {
    const [selectedOrder, setSelectedOrder] = useState("latest");

    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            renderItem={({ item }) => <RepositoryItem item={item} />}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={
                <View style={styles.mainView}>
                    <TextInput
                        style={styles.fields}
                        placeholder="Filter"
                        value={filterWord}
                        onChangeText={(value) => handleFilterWord(value)} />
                    <Picker
                        selectedValue={selectedOrder}
                        onValueChange={(itemValue, itemIndex) => {
                            handleSortSelection(itemValue);
                            setSelectedOrder(itemValue);
                        }}
                    >
                        <Picker.Item label="Select and item..." enabled={false} />
                        <Picker.Item label="Latest repositories" value={"latest"} />
                        <Picker.Item label="Highest rated repositories" value={"highest"} />
                        <Picker.Item label="Lowest rated repositories" value={"lowest"} />
                    </Picker>
                </View>
            }
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    )
};

const RepositoryList = () => {
    const [sortSelected, setSortSelected] = useState("latest");
    const [filterWord, setFilterWord] = useState("");
    const [debouncedFilter] = useDebounce(filterWord, 500);

    const orderBy = sortSelected === "latest" ? "CREATED_AT" : "RATING_AVERAGE";
    const orderDirection = sortSelected === "lowest" ? "ASC" : "DESC";

    const { repositories, fetchMore } = useRepositories({ first: 8, orderBy, orderDirection, searchKeyword: debouncedFilter });
    
    const onEndReach = ()=>{
        fetchMore();
    };

    return <RepositoryListContainer
        repositories={repositories}
        sortSelected={sortSelected}
        handleSortSelection={(selection) => setSortSelected(selection)}
        filterWord={filterWord}
        handleFilterWord={(word) => setFilterWord(word)}
        onEndReach={onEndReach} />
};

export default RepositoryList;