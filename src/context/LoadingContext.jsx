import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext(null); //Contexte de base égal à null (Privé)

export const LoadingProvider = ({ children }) => { //Fournisseur du contexte à l'ensemble des enfants (Composants)
    const [isLoading, setIsLoading] = useState(false); //Défini un état de base du contexte (Autre que null pour les enfants)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}> {/* Fourni user et setUser aux enfants dans le contexte */}
            {children}
        </LoadingContext.Provider>
    );
};

export function useLoadingContext(){ //Fonction pour obtenir le contexte de façon sécurisée
    const loadingContext = useContext(LoadingContext);

    if(loadingContext == null){ //Si aucun UserProvider n'est défini dans la hiérarchie alors UserContext = null
        throw new Error('useUserContext must be used with a LoadingProvider');
    }
    return loadingContext;
}

export default useLoadingContext;