import "../styles/globals.css";
import {AppContextProvider} from "../context/AppContext/AppContextProvider"


function App({ Component, pageProps }) {
  //const contexts = pageProps.context || [];
  return(
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>);
}

export default App;