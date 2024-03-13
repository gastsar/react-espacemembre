import React ,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar";
import Publication from "../../components/Publication";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CardPost from "../../components/CardPost";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/connexion");
        }
    }, [navigate]);

    const { data: posts, isLoading: isLoadingPosts } = useQuery({
        queryKey: ["post"],
        queryFn: () =>
            axios.get("http://localhost:3000/post")
                .then((res) => res.data),
        onError: (error) => console.log(error),
    });

    const { data: users, isLoading: isLoadingUsers } = useQuery({
        queryKey: ["user"],
        queryFn: () =>
            axios.get("http://localhost:3000/user")
                .then((res) => res.data),
        onError: (error) => console.log(error),
    });

    if (isLoadingPosts || isLoadingUsers) {
        return <div>Chargement....</div>;
    }

    let postFiltre = posts.sort((a, b) => new Date(b.datePost) - new Date(a.datePost));

    return (
        <Box bgcolor={"#eef4ff"}>
            <Navbar />
            <Publication />
            <Box width={"60%"} margin={"auto"}>
                {posts && postFiltre.map((post) =>
                    <CardPost key={post.id} post={post} users={users} />
                )}
            </Box>
        </Box>
    );
};

export default Home;
