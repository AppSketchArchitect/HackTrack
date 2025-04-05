import { useEffect } from 'react';
import useUserContext from "../context/UserContext";
import useLoadingContext from '../context/LoadingContext';

export default function LoginValidator(){

    const userContext = useUserContext();
    const loadingContext = useLoadingContext();

    const token = localStorage.getItem("token");
    
    useEffect(() => {
        loadingContext.setIsLoading(true);
        if(userContext.user.isAuthentified){
            userContext.setUser({
                email: userContext.user.email,
                name: userContext.user.name,
                isAuthentified: true
            });
            navigate("/");
        }
        if (token != null && token != "") {
            fetch("http://localhost:3002/auth/me", { //Envoie une requête à l'api pour essayer de se connecter
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(async res => {
                setTimeout(async () => { //Simule un délai de la réponse de 3s
                    switch (res.status) {
                        case 200:
                            const json = await res.json(); //Récupération des données
                            const user = {
                                email: json.email,
                                name: json.name,
                                isAuthentified: true
                            };
                            console.log(json);
                            userContext.setUser(user);
                            break;
                        case 400:
                            localStorage.clear("token");
                            userContext.setUser({
                                email: "",
                                name: "",
                                isAuthentified: false
                            });
                            break;
                        default:
                            localStorage.clear("token");
                            userContext.setUser({
                                email: "",
                                name: "",
                                isAuthentified: false
                            });
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
    }, []);
}