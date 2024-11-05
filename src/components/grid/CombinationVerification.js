import React, { useState } from "react";
import { generateUniqueCombination, renderBalls, renderStars } from "../../utils/utils";

const CombinationVerification = ({
    combinationsWithDates,
    selectedStars,
    selectedBalls,
    setSelectedStars,
    setSelectedBalls,
    renderSelectedBalls,
    renderSelectedStars,
    setRenderSelectedBalls,
    setRenderSelectedStars,
}) => {
    const [combinationExists, setCombinationExists] = useState(null);


    const maxBalls = 5;
    const maxStars = 2;
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
    const handleValidation = () => {
        if (selectedBalls.length === maxBalls && selectedStars.length === maxStars) {
            checkCombination(selectedBalls, selectedStars);
        }
    }
    const handleReset = () => {
        if (selectedBalls.length === maxBalls && selectedStars.length === maxStars) {
            setSelectedStars([]);
            setSelectedBalls([])
        }
    }

    const handleSuggestCombination = () => {
        const newCombination = generateUniqueCombination(combinationsWithDates);
        setRenderSelectedStars(renderStars(newCombination.stars, selectedStars));
        setRenderSelectedBalls(renderBalls(newCombination.balls, selectedBalls));
        setSelectedBalls(newCombination.balls);
        setSelectedStars(newCombination.stars);
      };
    
    return (
        <div className="container-bg">
                <button onClick={handleSuggestCombination}>Proposer une Combinaison Unique</button>
                <button onClick={() => handleValidation()}>Vérifier la Combinaison</button>
                <div>{renderSelectedBalls}</div>
                <div>{renderSelectedStars}</div>
                {combinationExists !== null && (
                    <div>
                    {combinationExists ? (
                        <p>Cette combinaison est déjà sortie !</p>
                    ) : (
                        <p>Cette combinaison est unique !</p>
                    )}
                    </div>
                )}
                <button onClick={() => handleReset()} disabled={selectedBalls.length > 0 ? false : true}>Tout effacer</button>
            </div>
    );
}

export default CombinationVerification;