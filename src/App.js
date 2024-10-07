import logo from './logo.svg';
import './App.css';
import SideBar from './components/side-bar/SideBar.Component';
import NavBar from './components/menu/Menu.component';
import ProfileBar from './components/profile-bar/Profile.Component';
import UseShowHideSideBar from './hooks/UseShowHideSideBar';
import UseShowHideProfileBar from './hooks/UseShowHideProfileBar';


const App =()=>{
  // Call the personalized hooks
  const {isVisible,ShowHideSideBar} = UseShowHideSideBar(false);
  const {isVisibleP,ShowHideProfileBar} = UseShowHideProfileBar(false);

  return (
    <div>
      <div>
        {/* passing the function as props to change the state of the bar */}
        <NavBar ShowHideSideBar={ShowHideSideBar} ShowHideProfileBar={ShowHideProfileBar}></NavBar>
        {/* passing the value to the bars to set the state */}
        <SideBar isVisible = {isVisible}></SideBar>
        <ProfileBar isVisibleP={isVisibleP}></ProfileBar>
      </div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      
      
    </div>
  );
}

export default App;
