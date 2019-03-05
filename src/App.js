import React from 'react';
import { Route } from 'react-router-dom';
import Contacts from './Components/Contacts';


class App extends React.Component {

  render(){
    return (
      <div className="container mt-5">
        <Route exact path="/" component={Contacts}/>
      </div>
    )
  }
}

export default App;