import { useState } from 'react';
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import useUserContext from "../context/UserContext";
import useLoadingContext from '../context/LoadingContext';
import PageTitle from '../components/PageTitle';
import Error from '../components/Error';

export default function Login(){
    const userContext = useUserContext();
    const loadingContext = useLoadingContext();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const [errorMessage, setErrorMessage] = useState(""); //To show an error

    const onLogin = (data) => { //Function to login
        loadingContext.setIsLoading(true); //Show the spinner
        setErrorMessage("");

        const fetchData = {
            email: data.email,
            password: data.password
        }

        fetch("http://localhost:3002/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchData)
        })
        .then(async res => {
            setTimeout(async () => {
                switch (res.status) {
                    case 200:
                        const json = await res.json();
                        localStorage.setItem("token", json.token); //We register the token
                        /**
                         * We send a second http request to get the user data on login if the credentials is correct
                         */
                        fetch("http://localhost:3002/auth/me", {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${json.token}`
                            }
                        })
                        .then(async res => {
                            setTimeout(async () => { //To show the spinner
                                switch (res.status) {
                                    case 200:
                                        const json = await res.json();
                                        const user = {
                                            email: json.email,
                                            name: json.name,
                                            isAuthentified: true
                                        };
                                        userContext.setUser(user); //Modify the context
                                        navigate("/"); //Redirect to home
                                        break;
                                    case 400:
                                        setErrorMessage("Token invalide.");
                                        localStorage.clear("token");
                                        break;
                                    default:
                                        console.log(res);
                                        setErrorMessage("Une erreur s'est produite.");
                                        localStorage.clear("token");
                                        break;
                                }
                                loadingContext.setIsLoading(false);
                            }, 500);
                        })
                        .catch(err => {
                            console.log("Erreur:", err)
                            loadingContext.setIsLoading(false);
                        });
                        break;
                    case 404:
                        setErrorMessage("Utilisateur non trouvé.");
                        break;
                    case 400:
                        setErrorMessage("Les entrées sont incorrectes.");
                        break;
                    default:
                        console.log(res);
                        setErrorMessage("Une erreur s'est produite.");
                        break;
                }
                loadingContext.setIsLoading(false);
            }, 500);
        })
        .catch(err => {
            console.log("Erreur:", err)
            loadingContext.setIsLoading(false);
        });
    }

    return (
        <>
          <Navbar />
          <PageTitle title="Se connecter" />
      
          <form onSubmit={handleSubmit(onLogin)} className="bg-[#2a2a2a] px-6 py-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8 flex flex-col gap-5">
            <input {...register("email")} placeholder="Email" className="p-3 rounded-md bg-[#444] text-white placeholder:text-gray-400 focus:outline-none focus:bg-[#555] focus:ring-2 focus:ring-[#888]" />
            <input type="password" {...register("password")} placeholder="Mot de passe" className="p-3 rounded-md bg-[#444] text-white placeholder:text-gray-400 focus:outline-none focus:bg-[#555] focus:ring-2 focus:ring-[#888]" />
            <button type="submit" className="py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition">Se connecter</button>
            <Error message={errorMessage} />
          </form>
        </>
      );
      
}