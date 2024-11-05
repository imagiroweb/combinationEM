import BallButton from "../components/grid/BallButton";
import StarButton from "../components/grid/StarButton";

export const handleClick = (number, event, action, condition) => {
    if (condition) {
        action(number, event);
    }
}

export const normalizeDate = (date) => {
    if (!date || date === '') return '';
    if (date.includes('/')) {
      const [day, month, year] = date.split('/');
      return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
    } else if (date.length === 8) {
      return date;
    }
    return '';
  };

  export const extractCombinationsWithDates = (data) => {
    const combinationsSet = new Set();
    const combinationsWithDates = [];
    
    data.forEach((row) => {
      const winnerRow = row.nombre_de_gagnant_au_rang1_en_europe || row.nombre_de_gagnant_au_rang1_Euro_Millions_en_europe;
      const isWinner = parseInt(winnerRow) >= 1 || winnerRow !== "0";
      const combination = [];
      for (const key in row) {
        if (key.startsWith('boule_') || key.startsWith('etoile_')) {
          combination.push(row[key]);
        }
      }

      if (combination.length > 0) {
        const normalizedDate = normalizeDate(row.date_de_tirage);
        if (normalizedDate) {
          const combinationStr = combination.join(',');
          combinationsWithDates.push({
            combination: combinationStr,
            date: normalizedDate,
            isWinner: isWinner,
          });

          combinationsSet.add(combinationStr);
        }
      }
    });

    return combinationsWithDates;
  };

  export const checkForDuplicates = (extractedCombinationsWithDates, action) => {
    const combinationCount = {};
    
    extractedCombinationsWithDates.forEach(({ combination }) => {
      combinationCount[combination] = (combinationCount[combination] || 0) + 1;
    });

    const duplicates = Object.entries(combinationCount)
      .filter(([_, count]) => count > 1)
      .map(([comb]) => comb.split(','));

    action(duplicates);
  };

  export const calculateNumberFrequency = (extractedCombinationsWithDates, action) => {
    const ballFrequencyCount = {};
    const starFrequencyCount = {};
    let totalBalls = 0;
    let totalStars = 0;

    extractedCombinationsWithDates.forEach(({ combination }) => {
      const comb = combination.split(',');
      for (let i = 0; i < 5; i++) {
        const num = comb[i];
        ballFrequencyCount[num] = (ballFrequencyCount[num] || 0) + 1;
        totalBalls++;
      }
      for (let i = 5; i < 7; i++) {
        const star = comb[i];
        starFrequencyCount[star] = (starFrequencyCount[star] || 0) + 1;
        totalStars++;
      }
    });

    const ballsArray = Object.entries(ballFrequencyCount).map(([num, count]) => ({
      number: num,
      count,
      percentage: ((count / totalBalls) * 100).toFixed(2),
    }));

    const starsArray = Object.entries(starFrequencyCount).map(([num, count]) => ({
      number: num,
      count,
      percentage: ((count / totalStars) * 100).toFixed(2),
    }));

    ballsArray.sort((a, b) => b.count - a.count);
    starsArray.sort((a, b) => b.count - a.count);

    action({ balls: ballsArray, stars: starsArray });
  };
  export const renderBalls = (balls, selectedBalls) => balls?.map((ball) => <BallButton key={ball} number={ball} selectedBalls={selectedBalls} />)
  export const renderStars = (stars, selectedStars) => stars?.map((star) => <StarButton key={star} number={star} selectedStars={selectedStars} />)
   

  export const generateUniqueCombination = (combinationsWithDates) => {
    const uniqueBalls = [];
    const uniqueStars = [];

    // Générer 5 boules uniques
    while (uniqueBalls.length < 5) {
        const randomNum = Math.floor(Math.random() * 50) + 1;
        if (!uniqueBalls.includes(randomNum)) {
            uniqueBalls.push(randomNum);
        }
    }

    // Générer 2 étoiles uniques
    while (uniqueStars.length < 2) {
        const randomStar = Math.floor(Math.random() * 12) + 1;
        if (!uniqueStars.includes(randomStar)) {
            uniqueStars.push(randomStar);
        }
    }

    // Vérifier si la combinaison existe déjà
    const uniqueCombination = [...uniqueBalls, ...uniqueStars];
    if (combinationsWithDates.some(comb => comb.combination === uniqueCombination.join(','))) {
        return generateUniqueCombination(combinationsWithDates);
    }

    return {
        balls: uniqueBalls,
        stars: uniqueStars
    };
};


  export const createStarsAndGlitter = (numStars) => {
    const container = document.querySelector('.gradient-background');
    
    // Créer des étoiles
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Position aléatoire des étoiles
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;

      // Durée et délais aléatoires pour chaque étoile
      const animationDuration = Math.random() * 5 + 3; // Durée entre 3 et 8 secondes
      star.style.animationDuration = `${animationDuration}s`;
      
      // Délai d'apparition aléatoire pour chaque étoile
      const appearanceDelay = i * (animationDuration / numStars); // Délai d'apparition
      star.style.animationDelay = `${appearanceDelay}s, ${Math.random() * 5}s`; // Animer le scintillement après le délai d'apparition

      const starOpacity = Math.random() * 0.5 + 0.5; // Opacité entre 0.5 et 1
      star.style.opacity = starOpacity;

      const brightness = Math.random() * 0.8 + 0.3; // Force de brillance entre 0.5 et 1
      star.style.background = `rgba(255, 255, 255, ${brightness})`;

      // Mouvements aléatoires
      star.style.setProperty('--x', (Math.random() < 0.5 ? -1 : 1) * Math.random());
      star.style.setProperty('--y', (Math.random() < 0.5 ? -1 : 1) * Math.random());
      star.style.animationName = 'twinkle, move'; // Ajouter les deux animations
      star.style.animationTimingFunction = 'ease-in-out, ease-in-out';
      star.style.animationIterationCount = 'infinite'; // Animer indéfiniment
      star.style.animationDuration = `${animationDuration}s, ${animationDuration * 2}s`; // Différentes durées
      star.style.animationDelay = `${Math.random() * 5}s, ${Math.random() * 5}s`; // Différentes délais


      // Ajouter l'étoile au conteneur
      container.appendChild(star);
    }

    // Créer des paillettes
    for (let j = 0; j < numStars / 5; j++) { // Moins de paillettes que d'étoiles
      const glitter = document.createElement('p');
      glitter.classList.add('glitter');

      const sizeClasses = ['small', 'medium', 'large'];
      const opacityClasses = ['faint', 'bright'];

      glitter.classList.add(sizeClasses[Math.floor(Math.random() * sizeClasses.length)]);
      glitter.classList.add(opacityClasses[Math.floor(Math.random() * opacityClasses.length)]);

      // Ajouter une couleur de bleu aléatoire
      const blueShades = ['blue-light', 'blue-medium', 'blue-dark'];
      glitter.classList.add(blueShades[Math.floor(Math.random() * blueShades.length)]);


      // Position aléatoire des paillettes
      glitter.style.top = `${Math.random() * 100}vh`;
      glitter.style.left = `${Math.random() * 100}vw`;
      
      // Taille aléatoire pour les paillettes
      const glitterSize = Math.random() * 40 + 10; // Taille entre 5 et 15 pixels
      glitter.style.width = `${glitterSize}px`;
      glitter.style.height = `${glitterSize}px`;

      // Délai d'apparition aléatoire pour chaque paillette
      const glitterAppearanceDelay = j * (1 / (numStars / 5)); // Délai d'apparition
      glitter.style.animationDelay = `${glitterAppearanceDelay}s, ${Math.random() * 5}s`; // Animer le scintillement après le délai d'apparition

      // Ajouter la paillette au conteneur
      container.appendChild(glitter);
    }
  };
