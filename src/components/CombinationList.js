const CombinationList = ({ combinations }) => {
    return (
        <ul>
            {combinations.map((combination, index) => (
                <li key={index}>{combination.join(', ')}</li>
            ))}
        </ul>
    );
}

export default CombinationList;