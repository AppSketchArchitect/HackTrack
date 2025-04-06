import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router";
import useLoadingContext from "../context/LoadingContext";
import HackathonDescription from '../components/HackathonDescription';
import Error from '../components/Error';

export default function Home() { //Home page
  const navigate = useNavigate();

  const loadingContext = useLoadingContext();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  let response;

  if (data == null && error == "") { //Get the data at the start or if needed
    loadingContext.setIsLoading(true);
    setTimeout(async () => { //To show spinner
      fetch("http://localhost:3002/hackathons", {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          response = res;
          return res.json();
        })
        .then(data => {
          if (response.status == 200) {
            //The next operations is just to get the the 3 hackathons in function of the data of each
            const today = new Date();
            const filtered = data.filter(item => new Date(item.startDate) > today);
            const sorted = filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            const finalized = sorted.slice(0, 3);
            setData(finalized);
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
          console.log(e);
          setData(null);
          setError("Une erreur est survenue avec l'API.");
          loadingContext.setIsLoading(false);
        });
    }, 500);
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto my-8 px-6 py-8 bg-[#2a2a2a] rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">HackTrack</h1>
        <h2 className="text-2xl font-semibold mb-3">Présentation</h2>
        <p className="text-base leading-relaxed text-gray-200">
          L'hacktrack est une plateforme permettant de s'informer autour des hackathons ainsi que de créer ou de rejoindre une équipe pour participer à l'un d'eux.
        </p>
      </div>

      <div className="max-w-4xl mx-auto my-8 px-6 py-8 bg-[#2a2a2a] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Prochains hackathons...</h2>

        {data != null && data.map(item => (
          <div key={item.id} onClick={() => navigate("/hackathons/" + item.id)} className="cursor-pointer bg-[#383838] hover:bg-[#434343] transition rounded-lg p-4 mb-4 shadow">
            <HackathonDescription data={item} simplify={true} />
          </div>
        ))}

        <Error message={error} />
      </div>
    </>
  );

}