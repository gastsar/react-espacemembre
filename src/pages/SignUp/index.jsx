import { Box, Stack, Typography, TextField, Button } from "@mui/material"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm()





    const onSubmit = (data) => {
        if (data.password !== data.passwordConfirm) {
            toast.error("Le mot de passe ne correspond pas")
        } else {
            axios.get(`http://localhost:3000/user?email=${data.email}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        toast.error("Adresse mail déja utilisée")
                    } else {
                        axios
                            .post("http://localhost:3000/user", data)
                            .then((res) => {
                                console.log(res),
                                    toast.success("Inscription réussie") 
                                    navigate("/connexion")
                            })
                       
                            .catch((err) => {
                                console.error(err),
                                    toast.error("Une erreur est survenue")
                            })
                    }
                })


        }
    }
    return (
        <>
            <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"}  >
                <Box width={400} sx={{ background: "#f5f5f5", padding: "20px" }} flexDirection={"row"}>

                    <Typography variant="h5" gutterBottom>
                        Inscription
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction={"column"} gap={4}>
                            <TextField
                                id="firstname"
                                label="Veuillez saisir votre nom"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("firstname", { required: "Veuillez saisir votre nom", minLength: 3, maxLenght: 100 })}
                            />
                            <TextField
                                id="lasttname"
                                label="Veuillez saisir votre prénom"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("lastname", { required: "Veuillez saisir votre prénom", minLength: 3, maxLenght: 100 })}
                            />

                            <TextField
                                id="mail"
                                label="Veuillez saisir votre adresse mail"
                                type="mail"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("email", {
                                    required: "Veuillez saisir votre adresse e-mail",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Adresse e-mail invalide",
                                    }
                                })}
                            />
                            <TextField id="password-input"
                                label="Saisir votre mot de passe"
                                type="password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("password", { required: "Veuillez saisir votre mot de passe", minLenght: { value: 7, message: "Veuillez saisir un mot de passe avec plus de 7 caractères" } })} />
                            <TextField id="password-input-confirm"
                                label="Confirmer votre mot de passe"
                                type="password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("passwordConfirm", { required: "Veuillez confirmer votre mot de passe", minLenght: 7 })}
                            />
                            <TextField id="imgProfil"
                                label="Url de votre image"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("imgProfil", { required: "Veuillez saisir l'url" })} />
                        </Stack>
                        <Button variant="contained" sx={{ marginTop: 2, textAlign: "centrer" }} type="submit">Inscription</Button>
                        <Typography>Pas de compte ?<Link to={"/connexion"}> Inscription</Link></Typography>
                    </form>

                </Box>
            </Stack>
        </>
    )
}

export default SignUp