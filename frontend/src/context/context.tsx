import { createContext, ReactNode} from "react";
import  Store  from "../data/Store"

type ProviderProps = {
    children: ReactNode;
}

const SMContext = createContext<Store | undefined>(undefined);

const SMProvider = ({ children }: ProviderProps) => {

    const store = new Store();

    return (
        <SMContext.Provider value={store}>
            {children}
        </SMContext.Provider>
    );
};

export { SMProvider, SMContext };