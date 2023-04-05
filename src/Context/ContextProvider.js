import { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";

const initialState = {
  requests: [],
  users: [],
  isAdmin: 0,
  currentUser: "",
  apps: [],
  isLogged: false,
  fsrequests: [],
  enqrequests: [],
  cmdrequests: [],
  home: false,
  sidebarState: false,
};
 
export const Context = createContext();
export default Context;
export const useValue = () => {
  return useContext(Context);
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextData = {
    state: state,
    dispatch: dispatch,
  };
  return <Context.Provider value={contextData}> {children} </Context.Provider>;
};
