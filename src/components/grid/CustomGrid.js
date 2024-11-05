import React, { useState } from 'react';
import CombinationVerification from './CombinationVerification';
import Grid from './Grid';

const CustomGrid = ({ combinationsWithDates }) => {
    const [selectedBalls, setSelectedBalls] = useState([]);
    const [selectedStars, setSelectedStars] = useState([]);
    const [renderSelectedBalls, setRenderSelectedBalls] = useState(null);
    const [renderSelectedStars, setRenderSelectedStars] = useState(null);
    const maxBalls = 5;
    const maxStars = 2;

    return (
        <div class="euromillions-grid">
            <CombinationVerification
                combinationsWithDates={combinationsWithDates}
                renderSelectedBalls={renderSelectedBalls}
                renderSelectedStars={renderSelectedStars}
                selectedBalls={selectedBalls}
                selectedStars={selectedStars}
                setSelectedStars={setSelectedStars}
                setSelectedBalls={setSelectedBalls}
                setRenderSelectedBalls={setRenderSelectedBalls}
                setRenderSelectedStars={setRenderSelectedStars}
            />
            <Grid
                maxStars={maxStars}
                maxBalls={maxBalls}
                setSelectedStars={setSelectedStars}
                setSelectedBalls={setSelectedBalls}
                selectedBalls={selectedBalls}
                selectedStars={selectedStars}
                setRenderSelectedBalls={setRenderSelectedBalls}
                setRenderSelectedStars={setRenderSelectedStars}
            />
        </div>
    );
}

export default CustomGrid;
