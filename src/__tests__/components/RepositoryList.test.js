import { render, fireEvent, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
    describe("RepositoryListContainer", () => {
        it("renders repository information correctly", () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd'
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ]
            };

            render(<RepositoryListContainer repositories={repositories} />);

            const repositoryItems = screen.getAllByTestId("repositoryItem");
            const [firstRepoItem, secondRepoItem] = repositoryItems;

            //screen.debug();

            expect(firstRepoItem).toHaveTextContent("jaredpalmer/formik", { exact: false });
            expect(firstRepoItem).toHaveTextContent("Build forms in React, without the tears", { exact: false });
            expect(firstRepoItem).toHaveTextContent("TypeScript", { exact: false });
            expect(firstRepoItem).toHaveTextContent("1.6k", { exact: false });
            expect(firstRepoItem).toHaveTextContent("21.9k", { exact: false });
            expect(firstRepoItem).toHaveTextContent("88", { exact: false });
            expect(firstRepoItem).toHaveTextContent("3", { exact: false });

            expect(secondRepoItem).toHaveTextContent("async-library/react-async", { exact: false });
            expect(secondRepoItem).toHaveTextContent("Flexible promise-based React data loader", { exact: false });
            expect(secondRepoItem).toHaveTextContent("JavaScript", { exact: false });
            expect(secondRepoItem).toHaveTextContent("69", { exact: false });
            expect(secondRepoItem).toHaveTextContent("1.8k", { exact: false });
            expect(secondRepoItem).toHaveTextContent("72", { exact: false });
            expect(secondRepoItem).toHaveTextContent("3", { exact: false });
        });
    });
});