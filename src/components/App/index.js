import React, { Component } from 'react';

import SidebarLeft from '../SidebarLeft';
import MainContent from '../MainContent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SidebarLeft />
        <MainContent />
      </div>
    );
  }
}

export default App;
