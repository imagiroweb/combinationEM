import React from 'react';

const Card = ({ list, title, text, source, state }) => {
    const mostPopularNumber = list.slice(0, 5);
    return (
        <article className='card-container'>
        <h2>{title}</h2>
        <ul>
            {mostPopularNumber.map((elt) => {
                return (
                    <li key={elt.date ? elt.date : elt.number}>
                        {elt.combination && 
                            <p className={elt.isWinner ? "bold" : ""}>
                                {elt.combination} - Date de tirage : {elt.date}
                            </p>
                        }
                        {elt.count && 
                            <span>{text} : {elt.number}, Compte : {elt.count}, Pourcentage : {elt.percentage}%</span>
                        }
                    </li>
                );
            })}
        </ul>
        {list && source && <p>Nombre total de combinaisons : {list.length}</p>}
        {state && <p>Nombre de jackpot : {state}</p>}
    </article>
    );
}

export default Card;