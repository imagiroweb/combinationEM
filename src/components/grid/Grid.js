import { useEffect } from "react";
import { renderBalls, renderStars } from "../../utils/utils";
import NumberGrid from "./NumberGrid";
import StarsGrid from "./StarsGrid";

const Grid = ({
    maxStars,
    setSelectedStars,
    maxBalls,
    setSelectedBalls,
    selectedBalls,
    selectedStars,
    setRenderSelectedBalls,
    setRenderSelectedStars,
}) => {

    const updateSelectedCombination = (balls, stars)  => {
        setRenderSelectedBalls(renderBalls(balls, selectedBalls));
        setRenderSelectedStars(renderStars(stars, selectedStars));
    }
    useEffect(() => {
        updateSelectedCombination(selectedBalls, selectedStars)
    }, [selectedBalls, selectedStars])

    return (
        <section className="grid-container">
                <NumberGrid
                    updateSelectedCombination={updateSelectedCombination}
                    selectedStars={selectedStars}
                    selectedBalls={selectedBalls}
                    setSelectedBalls={setSelectedBalls}
                    maxBalls={maxBalls}
                />
                <StarsGrid
                    updateSelectedCombination={updateSelectedCombination}
                    selectedBalls={selectedBalls}
                    selectedStars={selectedStars}
                    setSelectedStars={setSelectedStars}
                    maxStars={maxStars} />
            </section>
    );
}

export default Grid;