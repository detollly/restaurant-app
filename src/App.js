import React, { createContext } from 'react'
import MyRoutes from "./components/routing/MyRoutes";
import GlobalStyle from "./GlobalStyle";

import fauxFetch from './backend/server.js'

const BackendContext = createContext(); 
export { BackendContext };

function App() {

  return (

    <BackendContext.Provider value={fauxFetch}> 

    <div>
      <GlobalStyle />
      <MyRoutes />
    </div>

    </BackendContext.Provider>
  );
}
export default App;
