import React, { useEffect, useState } from "react";
import Card from "../shared/Card";

const Frequency = ({numberFrequency}) => {
    const [ballsResult, setBallsResult] = useState([]);
    const [starsResult, setStarsResult] = useState([]);

    useEffect(() => {
        setBallsResult(numberFrequency.balls);
        setStarsResult(numberFrequency.stars);
    }, [numberFrequency])

    const renderResult = (title, list, text) => {
        return (
            <Card list={list} title={title} text={text} />
        )
    }
    return (
        <>
            {renderResult('Numéros les plus sortis', ballsResult, 'numéro')}
            {renderResult('Étoiles les plus fréquentes', starsResult, 'étoile')}
        </>
    );
}

export default Frequency;