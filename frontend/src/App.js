import React, { useEffect } from 'react';
import FabricCanvas from './components/FabricCanvas';
import FabricToolbar from './components/FabricToolbar';
import { FabricContextProvider } from './context/FabricContext';
import { NavBar } from './components/NavBar';
import { NavItem } from './components/NavItem';
import { DropdownMenu } from './components/DropdownMenu';
import { LoginButton } from './components/Login';
import { ReactComponent as ProfileIcon } from './profileicon.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { FpsView } from 'react-fps';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Fade } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

// class App extends Component {
//   constructor(props) {
// 	super(props);
// 	this.state = { apiResponse: "" };
//   }

//   callAPI() {
// 	fetch("http://localhost:9000/testAPI")
// 	  .then(res => res.text())
// 	  .then(res => this.setState({ apiResponse: res }));
//   }
//   callDB() {
// 	fetch("http://localhost:9000/testDB")
// 	  .then(res => res.text())
// 	  .then(res => this.setState({ dbResponse: res }))
// 	  .catch(err => err);
//   }

//   componentDidMount() {
// 	this.callAPI();
// 	this.callDB();
//   }

//   render() {
// 	return (
// 	  <div style={{"padding": "0px 0px", 'height':'100vh' }}>
// 		<p>{this.state.apiResponse}</p>
// 		<p>{this.state.dbResponse}</p>
// 		<FabricContextProvider>
// 		  <div style={{ "display": "flex", "alignItems": "stretch" }}>
// 			<div style={{ "width": "100px", "background": "gray", "padding": "20px 20px 0 20px" }}>
// 			  <FabricToolbar/>
// 			  <FpsView width={100} height={20} top={window.innerHeight-50} left={0}/>
// 			</div>
// 			<div style={{ "flex": "1" }}>
// 			  <FabricCanvas/>
// 			</div>
// 		  </div>
// 		</FabricContextProvider>
// 	  </div>
// 	  );
//   }
// }

function App() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <>
      <div style={{ padding: '0px 0px', height: '100vh' }}>
        {/* <LoginButton />*/}
        {isAuthenticated ? (
          <>
            <NavBar>
              <NavItem icon={<ProfileIcon />}>
                <DropdownMenu />
              </NavItem>
            </NavBar>
            <FabricContextProvider>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div>
                  <FabricToolbar />

                  <FpsView
                    width={100}
                    height={20}
                    top={window.innerHeight - 50}
                    left={0}
                  />
                </div>
                <Fade
                  in={true}
                  style={{ transitionDelay: '500ms' }}
                  timeout={1000}
                >
                  <div style={{ flex: '1' }}>
                    <FabricCanvas />
                  </div>
                </Fade>
              </div>
            </FabricContextProvider>
          </>
        ) : (
          <>
            <TransitionGroup>
              <Fade in={true} timeout={500}>
                <div>
                  <LoginButton />
                </div>
              </Fade>
            </TransitionGroup>
          </>
        )}
      </div>
    </>
  );
}

export default App;
