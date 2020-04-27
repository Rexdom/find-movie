import { createContext } from 'react';

const UserContext = createContext( {
    darkMode: true,
    showName: false,
    isLogIn: false,
} );

export default UserContext;