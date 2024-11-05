import React, { useEffect, useMemo, useState } from 'react';
import Card from '../shared/Card';

const CombinationsResult = ({ combinationsWithDates }) => {
    const [allWinner, setAllWinner] = useState(0);

    const preprocessedCombinations = useMemo(() => 
        combinationsWithDates.map(comb => ({
            ...comb
        }))
        , [combinationsWithDates]);

    useEffect(() => {
        let count = 0;
        preprocessedCombinations.forEach(element => {
            if (element.isWinner) {
                count += 1;
            }
        });

        setAllWinner(count);
    }, [combinationsWithDates])

    const renderCombinationsResult = preprocessedCombinations.length > 0 && (
        <Card list={preprocessedCombinations} title='Les 5 derniers tirages' state={allWinner} source="result" />
    );

    return <>{renderCombinationsResult}</>;
};

export default CombinationsResult;
