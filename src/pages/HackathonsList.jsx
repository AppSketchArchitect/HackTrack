import { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router";
import useLoadingContext from '../context/LoadingContext';
import HackathonDescription from '../components/HackathonDescription';
import Error from '../components/Error';

export default function HackathonsList() {
    const loadingContext = useLoadingContext();

    const navigate = useNavigate();

    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    let response;

    const onPageDecrement = (e) => {
        e.preventDefault();
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
            setData(null);
            setError("");
        }
    }

    const onPageIncrement = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3002/hackathons?page=${pageNumber + 1}&limit=3`, { /* Envoie une requête à l'api pour récupérer les données par rapport au token */
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                response = res;
                return res.json();
            })
            .then(data => {
                if (response.status === 200) {
                    console.log(data);
                    if (data.length > 0) {
                        setPageNumber(pageNumber + 1);
                        setData(null);
                        setError("");
                    }
                } else {
                    console.log("Une erreur est survenue avec l'API.");
                    setError("Une erreur est survenue avec l'API.");
                }
            })
            .catch((e) => {
                console.log(e); //Si erreur l'afficher dans la console
                setError("Une erreur est survenue avec l'API.");
            });

    }

    if (data == null && error == "") {
        loadingContext.setIsLoading(true);
        setTimeout(async () => { //Simule un délai de la réponse de 3s
            fetch(`http://localhost:3002/hackathons?page=${pageNumber}&limit=3`, { /* Envoie une requête à l'api pour récupérer les données par rapport au token */
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(async res => {
                    response = res;
                    return await res.json();
                })
                .then(data => {
                    if (response.status === 200) {
                        setData(data);
                        setError("");
                        loadingContext.setIsLoading(false);
                    } else {
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

    return (
        <>
          <Navbar />
          <PageTitle title="Liste des hackathons" />
      
          <div className="max-w-4xl mx-auto my-8 px-6 py-8 bg-[#2a2a2a] rounded-lg shadow-lg">
            {data != null && data.map(item => (
              <div key={item.id} onClick={() => navigate("/hackathons/" + item.id)} className="cursor-pointer bg-[#383838] hover:bg-[#434343] transition rounded-lg p-4 mb-4 shadow">
                <HackathonDescription data={item} simplify={true} />
              </div>
            ))}
      
            <div className="flex items-center justify-center gap-4 mt-6 bg-[#383838] p-3 rounded-lg shadow">
              <button onClick={onPageDecrement} className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition">Page précédente</button>
              <p className="bg-[#474747] px-6 py-2 rounded text-white font-semibold">Page {pageNumber}</p>
              <button onClick={onPageIncrement} className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition">Page suivante</button>
            </div>
      
            <Error message={error} />
          </div>
        </>
      );

}