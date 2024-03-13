import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Comment from "../Comment";
import React from "react";
import PropTypes from "prop-types";
const CardPost = ({ post, users }) => {
    
    const user = users.find(u => u.id === post.idUser);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const useQuery = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`http://localhost:3000/post/${id}`);
        },
        onError: () => {
            toast.error("Error deleting post");
        },
        onSuccess: () => {
            useQuery.invalidateQueries("post");
            toast.success("Post deleted successfully");
        }
    });

    const deletePost = (id) => {
        mutation.mutate(id);
    };

    const postDate = new Date(post.datePost);

    const optionsDate = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const optionsHeure = {
        hour: '2-digit',
        minute: '2-digit',
    };

    const formattedDate = postDate.toLocaleDateString(undefined, optionsDate);
    const formattedHeure = postDate.toLocaleTimeString(undefined, optionsHeure);

    return (
        <Box width={"100%"} marginTop={2} bgcolor={"#ffff"} padding={2} marginBottom={5} borderRadius={4}>
           <Stack>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
                {user && <Avatar src={user.imgProfil} />} {/* Vérifiez si l'utilisateur existe avant d'afficher l'avatar */}
                <Typography>{post.author}</Typography>
                {loggedInUser.id === post.idUser && user && 
                    <IconButton aria-label="delete" onClick={() => deletePost(post.id)}>
                        <DeleteIcon />
                    </IconButton>
                }
            </Stack>
            <Typography color={"#89868685"}>Publié le {formattedDate} à {formattedHeure}</Typography>
       
            <Typography> {post.postPub}</Typography>
            <img src={post.linkImage} style={{ width: "100%",height:"300px", objectFit:"contain" }} alt="" />
        </Stack>
        <Comment/>
        </Box>
    );
};

CardPost.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      idUser: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      postPub: PropTypes.string.isRequired,
      linkImage: PropTypes.string.isRequired,
      datePost: PropTypes.string.isRequired, // Assuming date is provided as a string
    }).isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        imgProfil: PropTypes.string.isRequired,
      })
    ).isRequired,
  };


export default CardPost;
