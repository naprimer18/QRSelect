import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import fruit from "./resourse/options";
import menuContainerStyle from './styles/menuContainerStyle/menuContainerStyle'

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Dropdown menu examples</p>
        <div className="wrapper">
          <Dropdown
              menuContainerStyle={menuContainerStyle}
              listParent={document.getElementById("best")}
              options={fruit}
              placeHolder="Select fruit"
              isMulti={true}
              onClose={ () => { console.log('Close') } }
              onOpen={ () => { console.log('Open') } }   
              classNameByDropdown={'someClassDropdown'}
              classNameByInput={'someClassByInput'}
              classNameByList={'someClassByList'}
              onChange={(newValue) => {console.log('change', newValue)}}
              valueKey="id"
              labelKey="title"
              maxListHeight={6}
          />
        </div>
      </div>
    );
  };
}

export default App;
