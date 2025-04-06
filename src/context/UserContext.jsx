import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null); //Context of the user to null at default

export const UserProvider = ({ children }) => { //Provider of the user context
    const [user, setUser] = useState({
        email: '',
        name: '',
        isAuthentified: false
    }); //Set a default state to the context

    return (
        <UserContext.Provider value={{ user, setUser }}> {/* Provide to chidren the capability to set or get the user at any time */}
            {children}
        </UserContext.Provider>
    );
};

export function useUserContext(){ //Function to make secure the provider of the context
    const userContext = useContext(UserContext);

    if(userContext == null){ //If any Provider is define for the chidren, the loading context going to be null
        throw new Error('useUserContext must be used with a UserProvider');
    }
    return userContext;
}

export default useUserContext;