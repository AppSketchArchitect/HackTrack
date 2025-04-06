import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext(null); //Context of the spinner to null at default

export const LoadingProvider = ({ children }) => { //Provider of the loading context
    const [isLoading, setIsLoading] = useState(false); //Set a default state to the context at false to hide the spinner

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}> {/* Provide to chidren the capability to show or hide the spinner at any time and know if it is visible */}
            {children}
        </LoadingContext.Provider>
    );
};

export function useLoadingContext(){ //Function to make secure the provider of the context
    const loadingContext = useContext(LoadingContext);

    if(loadingContext == null){ //If any Provider is define for the chidren, the loading context going to be null
        throw new Error('useUserContext must be used with a LoadingProvider');
    }
    return loadingContext;
}

export default useLoadingContext;