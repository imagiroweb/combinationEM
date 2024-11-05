// src/CombinationChecker.js
import React, { useState } from 'react';

const CombinationChecker = ({ combinationsWithDates }) => {
  const [selectedBalls, setSelectedBalls] = useState([]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [combinationExists, setCombinationExists] = useState(null);

  // Gérer la sélection des boules
  const handleBallChange = (ball) => {
    if (selectedBalls.includes(ball)) {
      setSelectedBalls(selectedBalls.filter(b => b !== ball));
    } else if (selectedBalls.length < 5) {
      setSelectedBalls([...selectedBalls, ball]);
    }
  };

  // Gérer la sélection des étoiles
  const handleStarChange = (star) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter(s => s !== star));
    } else if (selectedStars.length < 2) {
      setSelectedStars([...selectedStars, star]);
    }
  };

  // Vérifier si la combinaison existe dans les combinaisons extraites
  const checkCombination = () => {
    const userBalls = selectedBalls.sort((a, b) => a - b).join(',');
    const userStars = selectedStars.sort((a, b) => a - b).join(',');

    const exists = combinationsWithDates.some(comb => {
         // Transformer la chaîne comb.combination en tableau
    const combinationArray = comb.combination.split(','); // Diviser la chaîne en tableau

    const combBalls = combinationArray.slice(0, 5).sort((a, b) => a - b); // Trier les 5 boules
    const combStars = combinationArray.slice(5, 7).sort((a, b) => a - b); // Trier les 2 étoiles

    // Comparer les boules et les étoiles de l'utilisateur avec celles de la combinaison existante
    return combBalls.join(',') === userBalls && combStars.join(',') === userStars;
    });

    setCombinationExists(exists);
  };

  // Créer une chaîne affichant la combinaison sélectionnée
  const displayCombination = [
    `Boules: ${selectedBalls.join(', ')}`,
    `Étoiles: ${selectedStars.join(', ')}`
  ].join(' | ');

  return (
    <div className="grid">
      <h2>Vérifier une Combinaison</h2>
      
      <div>
        <h3>Choisissez 5 Boules :</h3>
        <div className="balls-grid">
          {[...Array(50)].map((_, i) => (
            <label className="balls-grid" key={i + 1}>
              <input
                type="checkbox"
                hidden
                value={i + 1}
                onChange={() => handleBallChange((i + 1).toString())}
                checked={selectedBalls.includes((i + 1).toString())}
                disabled={!selectedBalls.includes((i + 1).toString()) && selectedBalls.length >= 5}
              />
              {i + 1}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3>Choisissez 2 Étoiles :</h3>
        <div className="stars-grid">
          {[...Array(12)].map((_, i) => (
            <label key={i + 1}>
              <input
                type="checkbox"
                value={i + 1}
                onChange={() => handleStarChange((i + 1).toString())}
                checked={selectedStars.includes((i + 1).toString())}
                disabled={!selectedStars.includes((i + 1).toString()) && selectedStars.length >= 2}
              />
              {i + 1}
            </label>
          ))}
        </div>
      </div>

      {/* Affichage de la combinaison sélectionnée avant la validation */}
      {selectedBalls.length === 5 && selectedStars.length === 2 && (
        <div>
          <h4>Votre Combinaison Sélectionnée :</h4>
          <p>{displayCombination}</p>
        </div>
      )}

      <button onClick={checkCombination} disabled={selectedBalls.length !== 5 || selectedStars.length !== 2}>
        Vérifier la Combinaison
      </button>

      {combinationExists !== null && (
        <div>
          {combinationExists ? (
            <p>Cette combinaison existe déjà dans la liste !</p>
          ) : (
            <p>Cette combinaison est unique !</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CombinationChecker;
