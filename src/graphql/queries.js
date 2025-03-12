import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query Repositories(
        $orderBy: AllRepositoriesOrderBy, 
        $orderDirection: OrderDirection, 
        $searchKeyword: String,
        $first: Int,
        $after: String
    ) {
        repositories(
            orderBy: $orderBy,
            orderDirection: $orderDirection, 
            searchKeyword: $searchKeyword,
            first: $first,
            after: $after
        ) {
            totalCount
            edges {
                node {
                    id
                    fullName
                    description
                    language
                    forksCount
                    stargazersCount
                    ratingAverage
                    reviewCount
                    ownerAvatarUrl
                }
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`;

export const GET_ME = gql`
    query Me($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        rating
                        createdAt
                        text
                        repository {
                            id
                            fullName
                        }
                        repositoryId
                    }
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query Repository($repositoryId: ID!, $first: Int, $after: String) {
        repository(id: $repositoryId) {
            id
            fullName
            description
            language
            forksCount
            stargazersCount
            ratingAverage
            reviewCount
            ownerAvatarUrl
            url
            reviews(first: $first, after: $after) {
                totalCount
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repositoryId
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
`;