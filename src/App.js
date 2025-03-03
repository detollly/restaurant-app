import MyRoutes from './components/routing/MyRoutes';
import MenuItem from "./components/MenuItem"
import styled from 'styled-components'


function App() {
  return (
    <AppCSS>
      <MyRoutes/>
    </AppCSS>
  );
}

export default App;

const AppCSS = styled.div `

  box-sizing: border-box;

  border: solid purple 1px; /* Debugging */


`
