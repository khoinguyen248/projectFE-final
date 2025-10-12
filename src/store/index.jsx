import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext({
    setCurrentPage(currentPage) { },
    
    setListWorkers(listWorkers) {},
    setPerson(person) {},
    setAccount(accountt) {}
});

const StoreProvider = ({ children }) => {
    // thuc hien cac chuc nang filter 
    const [currentPage, setCurrentPage] = useState(null);
    const [person, setPerson] = useState({});
    const [accountt, setAccount] = useState(() => {
    const stored = localStorage.getItem('account');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    if (accountt && Object.keys(accountt).length > 0) {
      localStorage.setItem('account', JSON.stringify(accountt));
    }
  }, [accountt]);
    const [listWorkers, setListWorkers] = useState([]);
    return <StoreContext.Provider value={
        {
            currentPage,
            person,
            listWorkers,
            accountt,
            setCurrentPage: (currentPage) => {
                setCurrentPage(currentPage);
            },

            setListWorkers: (listWorkers) => {
                setListWorkers(listWorkers);
            },
            
            setPerson: (person) => {
                setPerson(person);
            },
            setAccount: (accountt) =>{
                setAccount(accountt)
            }
        }
    }>{children}</StoreContext.Provider>;
}

export default StoreProvider;