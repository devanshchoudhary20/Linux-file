export const SaveToLocalStorage = (key : any,value :any) => {
    localStorage.setItem(key,JSON.stringify(value));
};

export const getFromLocalStorage = (key : any) => {
    const value = localStorage[key];
    if(value && JSON.parse(value)){
      return localStorage.getItem(JSON.parse(key))
    };
     
};

