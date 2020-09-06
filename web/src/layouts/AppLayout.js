import React, { useState }  from "react";
import { connect } from "react-redux";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import NavBar from "../components/navbar/NavBar";
import {CssBaseline,Container} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

/** Main layout of the App, includes dark mode toggle, NavBar and Container
 * @param  {React.Component} {children} React Componentes inside of the layour
 */
function AppLayout({ children }) {
  const [themeState, setThemeState] = useState(false);
  const palletType = themeState ? "light" : "dark";
  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary:{
        main: themeState ? '#FFF': grey[900]
      }
    },
   
  });
  const handleThemeChange = () => {
    setThemeState(!themeState);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar palletType={palletType} handleThemeChange={handleThemeChange}/>
      <Container maxWidth="lg">{children}</Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(AppLayout);
