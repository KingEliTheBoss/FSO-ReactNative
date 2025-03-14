import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
        variables,
        fetchPolicy: "cache-and-network"
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables
            }
        })
    };

    return {
        repository: data?.repository,
        fetchMore: handleFetchMore,
        loading,
        ...result
        //refetch: useQuery(GET_REPOSITORY, { fetchPolicy: "cache-and-network" })
    };
};

export default useRepository;