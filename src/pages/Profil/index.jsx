import { Avatar, Box, Stack, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardPost from "../../components/CardPost";
import Publication from "../../components/Publication";
import React from "react";


const Profil = () => {
  const user = JSON.parse(localStorage.getItem('user') );

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

  let postFiltre = posts.filter(post => post.idUser === user.id)
                         .sort((a, b) => new Date(b.datePost) - new Date(a.datePost));

  return (
    <Box>
      <Navbar />
     
      <Stack alignItems={"center"}>
        <Avatar src={user.imgProfil} sx={{width:"150px",height:"150px"}}/>
        <Typography>{user.firstname} {user.lastname}</Typography>
        <Typography>{user.email}</Typography>
      </Stack>
 <Publication/>
      <Box width={"60%"} margin={"auto"}>
        {postFiltre.map((post) =>
          <CardPost key={post.id} post={post} users={users} />
        )}
      </Box>
    </Box>
  );
};

export default Profil;
