import React,{useEffect} from 'react';
import Header from "./Header";
import {ThemeProvider,createGlobalStyle} from "styled-components";
import Home from "./Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Provider} from "react-redux";
import store from "./services";

const theme = {
  maincolor: '#b0e2a7',
  extrcolor: '#d4f5c5',
  fontcolor: '#000',
  activecold: '#2b5eff',
  activecoldfilter: "invert(27%) sepia(48%) saturate(2739%) hue-rotate(214deg) brightness(115%) contrast(115%)",
  fontfamily: 'Source Sans Pro'
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

  *, *:before, *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 10px;
    font-family: ${props => props.theme.fontfamily} 'sans-serif';
  }
  a {
    text-decoration: none;
  }
`;
//this component help us to relate i18n and redux
const TranslationProvider = ({children}) => {
  const language = useSelector(s => s.language.language);
  const {i18n, t} = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language])
  return <>{children}</>
};

function App() {
  return (
    <div className="App">
      <Provider store={store()}>
        <ThemeProvider theme={theme}>
          <TranslationProvider>
            <GlobalStyle />
            <Router>
              <Header />
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
              </Switch>
            </Router>
          </TranslationProvider>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
