import { Box, Stack, Typography, TextField, Button } from "@mui/material"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import React,{ useEffect } from "react";

const LogIn = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/")
        }
    })
    const { register, handleSubmit} = useForm()
    const onSubmit = (data) => {
        axios.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`)
            .then((res) => {
                if (res.data.length > 0) {
                    toast.success("Connexion réussie")
                    localStorage.setItem("user", JSON.stringify(res.data[0]));
                    navigate("/")
                } else {
                    toast.error("Identifiant incorrects")
                }
            })



    }
    return (
        <>
            <Stack alignItems={"center"} sx={{ background: "linear-gradient(90deg, #C7C5F4, #776BCC) " }} justifyContent={"center"} width={"100%"} height={"100vh"}  >
                <Box width={400} sx={{ background: "#f5f5f5", padding: "20px", textAlign: "center", borderRadius: "10px" }}>

                    <Typography variant="h5" gutterBottom>
                       Connexion
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction={"column"} gap={4}>

                            <TextField
                                id="mail"
                                label="Veuillez saisir votre adresse mail"
                                type="mail"
                                variant="filled"
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
                                variant="filled"
                                size="small"
                                fullWidth
                                {...register("password", { required: "Veuillez saisir votre mot de passe", minLenght: { value: 7, message: "Veuillez saisir un mot de passe avec plus de 7 caractères" } })} />


                        </Stack>
                        <Button variant="contained" sx={{ margin: 2, background:"none",color:' #4C489D',fontWeight: 600 }} type="submit">Me connecter</Button>
                        <Typography>Pas de compte ?<Link to={"/inscription"}> Inscription</Link></Typography>
                    </form>

                </Box>
            </Stack>
        </>
    )
}

export default LogIn