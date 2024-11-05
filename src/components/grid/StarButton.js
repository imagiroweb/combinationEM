import React, { useEffect, useState } from 'react';
import { handleClick } from '../../utils/utils';

const StarButton = ({ number, selectedStars, handleStarSelection, isClickable }) => {
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        const isSelected = selectedStars.includes(number);
        setSelected(isSelected);
    }, [number, selectedStars])
   
    const renderImage = () =>{ 
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="none"
                viewBox="0 0 30 28"
                className="star-svg"
            >
                <path
                fillRule="evenodd"
                d="M20.423 8.033a1.045 1.045 0 0 0-.832-.734l-5.661-.86-2.532-5.365a1.028 1.028 0 0 0-.924-.601c-.393 0-.751.233-.925.6L7.018 6.44l-5.661.86c-.389.06-.712.344-.833.734s-.02.82.26 1.106l4.097 4.176-.967 5.897c-.066.404.093.814.41 1.055a.994.994 0 0 0 1.087.082l5.063-2.784 5.063 2.784a.996.996 0 0 0 1.086-.082c.317-.241.476-.65.41-1.055l-.967-5.897 4.096-4.176c.281-.287.382-.716.261-1.106Z"
                clipRule="evenodd"
                fill={selected ? "#FFD700" : "#D3D3D3"}
            />
                <text
                    x="35%" 
                    y="45%" 
                    dominantBaseline="middle" 
                    textAnchor="middle" 
                    fontSize="11" 
                    fill={selected ? "#fff" : "#333"}
                >
                    {number}
                </text>
            </svg>
        )}
    return (
        <button className={isClickable ? "star-button" : "star-button selected result"} onClick={(event) => handleClick(number, event, handleStarSelection, isClickable)} disabled={!isClickable}>
              {selectedStars && renderImage()}
          </button>
        
    );
}

export default StarButton;
