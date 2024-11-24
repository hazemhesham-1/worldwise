import PropTypes from "prop-types";
import { useReducer, createContext, useContext } from "react";

const AuthContext = createContext();

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "123456",
    avatar: "https://i.pravatar.cc/100?u=zz"
};

const initialState = {
    user: {},
    isAuthenticated: false
};

function reducer(state, action) {
    switch(action.type) {
        case "login": return {...state, user: action.payload, isAuthenticated: true};
        case "logout": return initialState;
        default: throw new Error("Unknown action type");
    }
}

function AuthProvider({ children }) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

    function userLogin(email, password) {
        if(email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    }

    function userLogout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, userLogin, userLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("AuthContext was used outside of AuthProvider");
    }
    return context;
}

AuthProvider.propTypes = {
    children: PropTypes.any
};

export { useAuth, AuthProvider };