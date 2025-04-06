import { useEffect } from 'react';
import useUserContext from "../context/UserContext";
import useLoadingContext from '../context/LoadingContext';

export default function LoginValidator(){ //The login validator component will ensure that if the token in the localStorage is valid, we login it with its different informations

    const userContext = useUserContext();
    const loadingContext = useLoadingContext();

    const token = localStorage.getItem("token");
    
    useEffect(() => {
        loadingContext.setIsLoading(true);
        if (token != null && token != "") {
            fetch("http://localhost:3002/auth/me", { //Send request to API to get information of the user if the token is valid
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(async res => {
                setTimeout(async () => { //Make a delay to show spinner
                    switch (res.status) {
                        case 200:
                            const json = await res.json(); //Get the data
                            const user = {
                                email: json.email,
                                name: json.name,
                                isAuthentified: true
                            };
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