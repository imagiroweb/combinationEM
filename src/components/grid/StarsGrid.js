import React from 'react';
import StarButton from './StarButton';

const StarsGrid = ({updateSelectedCombination, selectedBalls, selectedStars, setSelectedStars, maxStars}) => {

    const handleStarSelection = (number, event) => {
        const button = event.target;

        if (selectedStars?.includes(number)) {
            setSelectedStars(prevStars => {
                const newStars = prevStars.filter(n => n !== number);
                updateSelectedCombination(selectedBalls, newStars); // Mettre à jour la combinaison
                return newStars;
            });
            button.classList.remove('selected');
        } else if (selectedStars.length < maxStars) {
            setSelectedStars(prevStars => {
                const newStars = [...prevStars, number];
                updateSelectedCombination(selectedBalls, newStars); // Mettre à jour la combinaison
                return newStars;
            });
            button.classList.add('selected');
        }
    };

    const renderStarsGrid = () => {
        const starButton = [];
        for (let i = 1; i <= 12; i += 1) {
            const number = i;
            const newCase = <StarButton key={number} number={number} selectedStars={selectedStars} handleStarSelection={handleStarSelection} isClickable={true} />
           
            starButton.push(newCase);
        }
        return starButton;
    }

    return (
        <article>
            <h3>Sélectionnez 2 Étoiles</h3>
            <section class="stars-grid">
                {renderStarsGrid()}
            </section>
        </article>
    );
}

export default StarsGrid;