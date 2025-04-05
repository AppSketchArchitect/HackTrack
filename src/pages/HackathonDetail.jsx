import { useState } from 'react';
import { useParams } from 'react-router-dom';
import z from "zod";
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import useUserContext from "../context/UserContext";
import useLoadingContext from '../context/LoadingContext';
import Error from '../components/Error';
import Success from '../components/Success';
import PageTitle from '../components/PageTitle';
import HackathonDescription from '../components/HackathonDescription';

const registerTeamSchema = z.object({ //Schéma d'enregistrement
    name: z.string().min(6)
});

export default function HackathonDetail(){
    const { id } = useParams();
    const userContext = useUserContext();
    const loadingContext = useLoadingContext();

    const { register, handleSubmit } = useForm();

    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const [errorMessage, setErrorMessage] = useState(""); //Pour afficher un msg d'erreur
    const [successMessage, setSuccessMessage] = useState(""); //Pour afficher un msg de réussite

    const [errorJoinTeam, setErrorJoinTeam] = useState(""); 
    const [successJoinTeam, setSuccessJoinTeam] = useState("");
    const [idJoinTeamMessage, setIdJoinTeamMessage] = useState(-1);

    let response;

    if(data == null && error == ""){
        loadingContext.setIsLoading(true);
        setTimeout(async () => { //Simule un délai de la réponse de 3s
            fetch(`http://localhost:3002/hackathons/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                response = res;
                return res.json();
            })
            .then(data => {
                if(response.status == 200){
                    setData(data);
                    setError("");
                    loadingContext.setIsLoading(false);
                }else if(response.status == 404){
                    setError("Hackathon non trouvé !");
                    loadingContext.setIsLoading(false);
                }
                else{
                    console.log("Une erreur est survenue avec l'API.");
                    setData(null);
                    setError("Une erreur est survenue avec l'API.");
                    loadingContext.setIsLoading(false);
                }
            })
            .catch((e) => {
                console.log(e); //Si erreur l'afficher dans la console
                setData(null);
                setError("Une erreur est survenue avec l'API.");
                loadingContext.setIsLoading(false);
            });
             //Désactivation du spinner à la fin
        }, 500);
    }

    const onCreateTeam = (data) => {

        loadingContext.setIsLoading(true);

        setData(null);
        setError("");
        setErrorMessage("");
        setSuccessMessage("");

        if(!userContext.user.isAuthentified){
            setErrorMessage("Vous devez être connecté pour créer une équipe.");
            loadingContext.setIsLoading(false);
            return;
        }

        const fetchData = {
            name: data.name,
            hackathonId: parseInt(id)
        }

        const registerTeamParsed = registerTeamSchema.safeParse(fetchData);

        if(!registerTeamParsed.success == true){
            setErrorMessage("Données invalides, 6 caractères minimum.");
            loadingContext.setIsLoading(false);
            return;
        }

        fetch("http://localhost:3002/teams/create", { //Envoie une requête à l'api pour essayer de se connecter
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(fetchData)
        })
        .then(async res => {
            setTimeout(async () => { //Simule un délai de la réponse de 3s
                switch (res.status) {
                    case 201:
                        await res.json();
                        setSuccessMessage("Équipe correctement créé !");
                        break;
                    case 401:
                        console.log(res);
                        setErrorMessage("Erreur d'autorisation.");
                        break;
                    case 400:
                        console.log(res);
                        setErrorMessage("Erreur de validation.");
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
            console.log("Erreur:", err)
            loadingContext.setIsLoading(false);
        });
    }

    const onJoinTeam = (id) => {

        setData(null);
        setError("");
        setErrorJoinTeam("");
        setSuccessJoinTeam("");
        setIdJoinTeamMessage(id);
        loadingContext.setIsLoading(true);

        if(!userContext.user.isAuthentified){
            setErrorJoinTeam("Vous devez être connecté pour rejoindre une équipe.");
            loadingContext.setIsLoading(false);
            return;
        }

        fetch(`http://localhost:3002/teams/join/${id}`, { //Envoie une requête à l'api pour essayer de se connecter
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(async res => {
            setTimeout(async () => { //Simule un délai de la réponse de 3s
                switch (res.status) {
                    case 201:
                        await res.json();
                        setSuccessJoinTeam("Tu as bien rejoint l'équipe !");
                        break;
                    case 401:
                        console.log(res);
                        setErrorJoinTeam("Erreur d'autorisation.");
                        break;
                    case 400:
                        console.log(res);
                        setErrorJoinTeam("Erreur de validation.");
                        break;
                    default:
                        console.log(res);
                        setErrorJoinTeam("Une erreur s'est produite.");
                        break;
                }
                loadingContext.setIsLoading(false); //Désactivation du spinner
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
          <PageTitle title="Liste des hackathons" error={error} />
      
          {data != null && (
            <>
              <div className="max-w-4xl mx-auto my-8 px-6 py-8 bg-[#2a2a2a] rounded-lg shadow-lg">
                <HackathonDescription data={data} />
              </div>
      
              {data.teams.length > 0 && (
                <div className="max-w-4xl mx-auto my-8 px-6 py-8 bg-[#2a2a2a] rounded-lg shadow-lg space-y-6">
                  {data.teams.map(item => (
                    <div key={item.id} className="bg-[#383838] rounded-lg p-4 shadow space-y-3">
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-300">L'équipe possède {item.users.length} participant(s).</p>
      
                      {item.users.length > 0 && item.users.map(userItem => (
                        <div key={userItem.id} className="bg-[#474747] rounded-md px-4 py-2 text-white shadow">
                          <p>{userItem.name}</p>
                        </div>
                      ))}
      
                      {idJoinTeamMessage === item.id && (
                        <>
                          <Error message={errorJoinTeam} />
                          <Success message={successJoinTeam} />
                        </>
                      )}
      
                      <button onClick={() => onJoinTeam(item.id)} className="mt-2 px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
                        Rejoindre l'équipe
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
      
          {error === "" && (
            <form onSubmit={handleSubmit(onCreateTeam)} className="max-w-md mx-auto mt-10 bg-[#2a2a2a] p-6 rounded-lg shadow space-y-4">
              <input {...register("name")} placeholder="Nom de l'équipe" className="w-full p-3 rounded-md bg-[#444] text-white placeholder:text-gray-400 focus:outline-none focus:bg-[#555] focus:ring-2 focus:ring-[#888]" />
              <button type="submit" className="w-full py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">Créer une équipe</button>
              <Error message={errorMessage} />
              <Success message={successMessage} />
            </form>
          )}
        </>
      );
      
      
}