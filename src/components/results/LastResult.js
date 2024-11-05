import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LastResults = () => {
    const [results, setResults] = useState([]);
	console.log("​LastResults -> results", results)

    useEffect(() => {
        axios.get('http://localhost:3001/api/euromillions')
          .then(response => {
            setResults(response.data);
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des résultats :", error);
          });
      }, []);

    return (
        <div>
            <h1>Derniers résultats EuroMillions</h1>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <p>Date : {result.date}</p>
                        <p>Boules : {result.balls.join(', ')}</p>
                        <p>Étoiles : {result.stars.join(', ')}</p>
                        <p>Jackpot : {result.jackpot}</p>
                        <p>Infos sur les gagnants : {result.winnerInfo}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LastResults;
