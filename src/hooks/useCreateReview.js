import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const create = async ({ ownerName, repositoryName, rating, text }) => {
        const { data } = await mutate({
            variables: { ownerName, repositoryName, rating, text },
        });
        return data;
    };

    return [create, result];
};

export default useCreateReview;