import { useEffect, useState } from "react";
import { handleClick } from "../../utils/utils";

const BallButton = ({number, selectedBalls, handleBallSelection, isClickable}) => {
    const [selected, setSelected] = useState(false);
    const isSelectedButton = selected ? "ball-button selected" : "ball-button";
    const clickableButton = isClickable ? isSelectedButton : "ball-button result selected";

    useEffect(() => {
        const isSelected = selectedBalls?.includes(number);
        setSelected(isSelected);
    }, [number, selectedBalls])
   
    return (
        <button className={clickableButton} onClick={(event) => handleClick(number, event, handleBallSelection, isClickable)}>{number}</button>
    );
}

export default BallButton;