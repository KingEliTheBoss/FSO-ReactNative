import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);

    const fetchRepositories = async () => {
        setLoading(true);

        //Change url depending on what expo gives, keep the same port unless changed in code
        const response = await fetch("http://192.168.1.78:5000/api/repositories");
        const json = await response.json();

        setLoading(false);
        setRepositories(json);
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return { repositories, loading, refetch: fetchRepositories };
}

export default useRepositories;