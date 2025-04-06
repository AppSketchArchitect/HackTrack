import { getFormattedDate } from '../utils/DateManager';

export default function HackathonDescription({ data, simplify = false }) { //Show the description of a hackathon
  const teams = data.teams ? data.teams.length : data.registeredTeams; //Make the function flexible to different requests

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">{data.name}</h3>
      <p className="text-sm text-gray-300">
        Débute le <strong>{getFormattedDate(data.startDate).formatted}</strong> et termine le <strong>{getFormattedDate(data.endDate).formatted}</strong>
      </p>

      {(simplify == null || simplify) == false && ( //Simplify parameter is a parameter to show more precise data to the user
        <>
          <p className="text-sm text-gray-300">
            Le thème sera <strong>{data.theme}</strong>
          </p>
          <p className="text-sm text-gray-300">
            Le nombre d'équipe(s) enregistrée(s) actuellement est de <strong>{teams}</strong>
          </p>
        </>
      )}
    </div>
  );
}
