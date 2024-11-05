import React from 'react';
import BallButton from './BallButton';

const NumberGrid = ({updateSelectedCombination, selectedStars, selectedBalls, setSelectedBalls, maxBalls}) => {


    const handleBallSelection = (number, event) => {
        const button = event.target; 

        if (selectedBalls.includes(number)) {
            setSelectedBalls(prevBalls => {
                const newBalls = prevBalls.filter(n => n !== number);
                updateSelectedCombination(newBalls, selectedStars);
                return newBalls;
            });
            button.classList.remove('selected');
        } else if (selectedBalls.length < maxBalls) {
            setSelectedBalls(prevBalls => {
                const newBalls = [...prevBalls, number];
                updateSelectedCombination(newBalls, selectedStars);
                return newBalls;
            });
            button.classList.add('selected');
        }
    };

    const renderBallsGrid = () => {
        const ballButton = []
        for (let i = 1; i <= 50; i++) {
            const number = i;
            const newCase = <BallButton number={number} selectedBalls={selectedBalls} handleBallSelection={handleBallSelection} isClickable={true} />
            
            ballButton.push(newCase);
        }
        return ballButton;
      }

    return (
        <article>
            <h3>Sélectionnez 5 Boules</h3>
            <section class="balls-grid">
                {renderBallsGrid()}
            </section>
        </article>
    );
}

export default NumberGrid;