import { createContext, useState, ReactNode } from "react";

interface DataContextType {
    data: any,
    setDataInLocal: (data: any) => void
    resetData: () => void
}
interface DataProviderType {
    children: ReactNode;
}

const DataContext = createContext<DataContextType>({
    data: {} as any,
    setDataInLocal: (data: any) => { localStorage.setItem('CollectifData', JSON.stringify(data)) },
    resetData: () => confirm("Voulez-vous reinitialiser les données ?") && localStorage.removeItem("CollectifData") && window.location.reload()
});


export function DataProvider({ children }: DataProviderType) {
    const localData = JSON.parse(localStorage.getItem("CollectifData") || "{}");
    (Object.keys(localData).length === 0)
    const [data] = useState<any>(localData);
    return <DataContext.Provider
        value={{
            data,
            setDataInLocal: (data: any) => {
                localStorage.setItem('CollectifData', JSON.stringify(data));
            },
            resetData: () => {
                confirm("Voulez-vous reinitialiser les données ?");

                window.location.reload()
            }
        }}> {
            children
        }
    </DataContext.Provider >;
}

export default DataContext;