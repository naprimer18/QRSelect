import React, { Component } from 'react';
import Select from './components/Select';
import fruit from "./resourse/options";
import menuContainerStyle from './styles/menuContainerStyle/menuContainerStyle'

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Dropdown menu examples</p>
        <div className="wrapper">
          <Select
              menuContainerStyle={menuContainerStyle}
              listParent={document.getElementById("best")}
              data={fruit}
              placeHolder="Select fruit"
<<<<<<< HEAD
              isMulti
              onClose={ () => { console.log('Close') } }
              onOpen={ () => { console.log('Open') } }   
=======
              isMulti={true}
              // onClose={ () => { console.log('Close') } }
              // onOpen={ () => { console.log('Open') } }
>>>>>>> d888f04bfe2cf017125a8a5b8e9640637d8982b7
              className ={'ClassDropdown'}
              inputClassName ={'inputClassName'}
              listClassName ={'listClassName'}
              // onChange={(newValue) => {console.log('change', newValue)}}
              valueKey="id"
              labelKey="title"
              maxListHeight={5}
              isFilterable
          />
        </div>
      </div>
    );
  };
}

export default App;
