import { createContext } from "react";

type AppContextType = {
  user: object | null,

  userData: {
    name: string;
    email: string;
    uid: string;
    firstName: string;
    lastName: string;
    toDo: object;
    done: object;
  } | null,
  
  setContext: React.Dispatch<React.SetStateAction<{ user: object | null, userData: object | null }>>
};

const AppContext = createContext<AppContextType>({
  user: null,
  userData: null,
  setContext: () => { },
});


export default AppContext;