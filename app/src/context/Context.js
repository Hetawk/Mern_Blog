import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

// using user in every pages when successful
const INITIAL_STATE = {
    // fetching user in local storage
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);


export const ContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() =>{
        // local storage for user
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);
    return(
        <Context.Provider 
        value={
            {
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }
        }
        >
            {children}
        </Context.Provider>
    );
};