import { Button, Stack, TextField } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"


const Comment = () => {
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
    dateComment: new Date(),
    authorComment : user.firstname,
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
    return <Stack width={"60%"} sx={{ marginTop: '30px' }} >
      
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" gap={3}>
                <TextField id="postPub"
                    label="Commentaire"
                    variant="outlined"
                    size="small"
              
                    fullWidth
                    {...register("postPub", { required: true, minLength:5 })} rows={4} />
               
                <Button variant="contained" type="submit">Commenter</Button>
            </Stack>
        </form>

    </Stack>
}

export default Comment