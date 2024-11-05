// src/CombinationExtractor.js
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import CustomGrid from './grid/CustomGrid';
import { calculateNumberFrequency, checkForDuplicates, extractCombinationsWithDates } from '../utils/utils';
import Frequency from './results/Frequency';
import CombinationsResult from './results/CombinationsResult';
import Header from './Header';
import Card from './shared/Card';
import * as allFiles from '../assets/mock';
import LastResults from './results/LastResult';

const CombinationExtractor = () => {
  const [combinationsWithDates, setCombinationsWithDates] = useState([]);
  const [duplicateCombinations, setDuplicateCombinations] = useState([]);
  const [numberFrequency, setNumberFrequency] = useState({
    balls: [],
    stars: [],
  });

  const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        download: true,
        complete: (results) => {
          const data = results.data;
          resolve(data);
        },
        header: true,
        error: (error) => reject(error),
      });
    });
  };

  const loadCombinationsFromFiles = async () => {
    try {
      const allCombinationsWithDates = [];
      
      for (const key in allFiles) {
        const fileData = await parseCSV(allFiles[key]);
        const extractedCombinations = extractCombinationsWithDates(fileData);
        allCombinationsWithDates.push(...extractedCombinations);
      }

      allCombinationsWithDates.sort((a, b) => b.date.localeCompare(a.date));

      setCombinationsWithDates(allCombinationsWithDates);
      checkForDuplicates(allCombinationsWithDates, setDuplicateCombinations);
      calculateNumberFrequency(allCombinationsWithDates, setNumberFrequency);
    } catch (error) {
      console.error('Erreur lors du chargement des fichiers CSV', error);
    }
  };

  useEffect(() => {
    loadCombinationsFromFiles()
  }, []);

  return (
    <>
        <Header />
        <div className="main-content">
          <LastResults />
          <CustomGrid combinationsWithDates={combinationsWithDates} />
          <section>
              <CombinationsResult combinationsWithDates={combinationsWithDates} />
              {duplicateCombinations.length > 0 && (
                  <Card data={duplicateCombinations} title='Combinaisons dupliquées' />
              )}
              <Frequency numberFrequency={numberFrequency} />
          </section>
        </div>
    </>
  );
};

export default CombinationExtractor
