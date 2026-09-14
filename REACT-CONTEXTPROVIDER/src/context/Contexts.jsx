import { createContext, useState } from 'react';


export const Context = createContext();

export function Provider({ children }){
  const [languages] = useState(['javaScript', 'react', 'python', 'typeScript']);
  const [fruits] = useState(['apple', 'banana', 'strawbery']);
  const [countries] = useState(['georgia', 'france', 'usa']);

  return(
    <Context.Provider value={{ languages, fruits, countries }}>
      {children}
    </Context.Provider>
  );
}