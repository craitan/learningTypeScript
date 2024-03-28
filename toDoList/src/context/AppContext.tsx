import { createContext } from "react";

type AppContextType = {
  user: object | null,
  userData: {
    username: string,
    email: string,
    uid: string,
    tasks: object

  } | null,
  setContext: React.Dispatch<React.SetStateAction<{ user: object | null, userData: object | null }>>
};

const AppContext = createContext<AppContextType>({
  user: null,
  userData: null,
  setContext: () => { },
});


export default AppContext;