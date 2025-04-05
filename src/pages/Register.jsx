import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import z from "zod";
import Navbar from '../components/Navbar';
import useUserContext from "../context/UserContext";
import useLoadingContext from '../context/LoadingContext';
import PageTitle from '../components/PageTitle';
import Error from '../components/Error';
import Success from '../components/Success';

const registerSchema = z.object({ //Schéma d'enregistrement
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(3)
});

export default function Register(){

    const userContext = useUserContext();
    const loadingContext = useLoadingContext();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    
    const [errorMessage, setErrorMessage] = useState(""); //Permet d'afficher un message d'erreur
    const [successMessage, setSuccessMessage] = useState(""); //Permet d'afficher le message de succès

    useEffect(() => {
        if(userContext.user.isAuthentified){
            navigate("/");
        }
    }, []);

    const onRegister = (data) => {
        loadingContext.setIsLoading(true); //Active le spinner

        //Reset les messages
        setErrorMessage("");
        setSuccessMessage("");

        //Vérifie que les mots de passe ne soit pas différents
        if(data.password != data.confirmedPassword){
            setErrorMessage("Les mots de passe doivent être identiques.");
            loadingContext.setIsLoading(false);
            return;
        }
        
        const fetchData = {
            email: data.email,
            password: data.password,
            name: data.name
        }

        //Vérifie si les données sont valide à l'enregistrement
        const registerParsed = registerSchema.safeParse(fetchData);

        if(registerParsed.success == true){
            fetch("http://localhost:3002/auth/register",{ //Requête à l'api avec les données
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fetchData)
            })
            .then(async res => {
                setTimeout(async () => { //Simule un délai de la réponse de 3s
                    switch(res.status){ //Affichage d'un message en fonction de la réussite
                        case 201:
                            setSuccessMessage("Inscription réussie !");
                            navigate("/");
                            break;
                        case 400:
                            setErrorMessage("L'email est déja utilisé ou le mot de passe est trop court (6).");
                            break;
                        default:
                            console.log(res);
                            setErrorMessage("Une erreur s'est produite.");
                            break;
                    }
                    loadingContext.setIsLoading(false); //Désactivation du spinner
                }, 500);
            })
            .catch(err => {
                console.log("Erreur:", err);
                loadingContext.setIsLoading(false);
            });
        }else{
            setErrorMessage("Entrée (email ou mot de passe) incorrect pour l'enregistrement.");
            loadingContext.setIsLoading(false);
        }
    }

    return (
        <>
          <Navbar />
          <PageTitle title="S'inscrire" />
      
          <form onSubmit={handleSubmit(onRegister)} className="bg-[#2a2a2a] px-6 py-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8 flex flex-col gap-5">
            <input {...register("email")} placeholder="Email" className="p-3 rounded-md bg-[#444] text-white placeholder:text-gray-400 focus:outline-none focus:bg-[#555] focus:ring-2 focus:ring-[#888]" />
            <input {...register("name")} placeholder="Nom d'utilisateur" className="p-3 rounded-md bg-[#444] text-white placeholder:text-gray-400 focus:outline-none focus:bg-[#555] focus:ring-2 focus:ring-[#888]" />
            <input type="password" {...register("password")} placeholder="Mot de passe" className="p-3 rounded-md bg-[#444] text-white placeholder:text-gray-400 focus:outline-none focus:bg-[#555] focus:ring-2 focus:ring-[#888]" />
            <input type="password" {...register("confirmedPassword")} placeholder="Confirmation du mot de passe" className="p-3 rounded-md bg-[#444] text-white placeholder:text-gray-400 focus:outline-none focus:bg-[#555] focus:ring-2 focus:ring-[#888]" />
            <button type="submit" className="py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition">S'inscrire</button>
            <Error message={errorMessage} />
            <Success message={successMessage} />
          </form>
        </>
      );
      
}