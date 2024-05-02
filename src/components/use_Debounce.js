import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  // State pour stocker la valeur debounced
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Mettre à jour la valeur debounced après un délai
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nettoyer le timeout lors de chaque changement de la valeur ou au démontage du composant
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Exécuter l'effet lorsque la valeur ou le délai change

  // Renvoyer la valeur debounced
  return debouncedValue;
};

export default useDebounce;