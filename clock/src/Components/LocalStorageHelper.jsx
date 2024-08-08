export const saveToLocalStorage = (key, value) => {
    try {
      const valueToSave = typeof value === "object" ? JSON.stringify(value) : value;
      localStorage.setItem(key, valueToSave);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };
  
  export const getItemFromLocalStorage = (key) => {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;
  
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  };