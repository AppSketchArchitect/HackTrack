import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null); //Contexte de base égal à null (Privé)

export const UserProvider = ({ children }) => { //Fournisseur du contexte à l'ensemble des enfants (Composants)
    const [user, setUser] = useState({
        email: '',
        name: '',
        isAuthentified: false
    }); //Défini un état de base du contexte (Autre que null pour les enfants)

    return (
        <UserContext.Provider value={{ user, setUser }}> {/* Fourni user et setUser aux enfants dans le contexte */}
            {children}
        </UserContext.Provider>
    );
};

export function useUserContext(){ //Fonction pour obtenir le contexte de façon sécurisée
    const userContext = useContext(UserContext);

    if(userContext == null){ //Si aucun UserProvider n'est défini dans la hiérarchie alors UserContext = null
        throw new Error('useUserContext must be used with a UserProvider');
    }
    return userContext;
}

export default useUserContext;