import { Button, Stack, TextField, Tooltip } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import React from "react"

const Publication = () => {
    //const navigate = useNavigate(); 
    const {
        register,
        handleSubmit,reset,

    } = useForm()


  const user = JSON.parse(localStorage.getItem('user') );
  const queryClient = useQueryClient()



   const mutation = useMutation({
    mutationFn: (pub) => {
      return axios.post("http://localhost:3000/post", pub)
    },
    onError: () => {
       
        toast.error("erreur survenue lorsdu publication")
       
    } ,
    onSuccess: () => { 
        reset()
        queryClient.invalidateQueries("post")


        toast.success("erreur survenue lorsdu publication")
    }
  })

const onSubmit = (data) => {
   const  posts = {
    ...data,
    idUser: user.id,
    datePost: new Date(),
    likePost : 0,
    author : `${user.firstname} ${user.lastname}`,
   }
   mutation.mutate(posts)


/* 
    axios
    .post("http://localhost:3000/post", posts)
    .then((res)=>{ 
        console.log(res.data), 
        toast.success("Publier avec succés")})
        reset()
    .catch((err) => {
        console.error(err),
        toast.error("Une erreur est survenue")  
    }) */
}
    return <Stack width={"60%"} margin={"auto"}>
        <h4>Publications</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
                <TextField id="postPub"
                    label="Quoi de neuf?"
                    variant="outlined"
                    size="small"
                    multiline
                    fullWidth
                    {...register("postPub", { required: true, minLength:5 })} rows={4} />
                <TextField id="urlImg"
                    label="Url de votre image"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("linkImage",{required: "Veuillez saisir l'url"})} />
                    <Tooltip title="Publier">
                         <Button type="submit" sx={{background: '#7875B5' }} >Publier</Button>
                    </Tooltip>
               
            </Stack>
        </form>

    </Stack>
}

export default Publication