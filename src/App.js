import React from 'react';
import { Route } from 'react-router-dom';
import Contacts from './Components/Contacts';
import ContactByID from './Components/ContactByID';


class App extends React.Component {

  render(){
    return (
      <div className="container mt-5">
        <Route exact path="/" component={Contacts} />
        <Route path="/contact/:id" component={ContactByID} />
      </div>
    )
  }
}

export default App;