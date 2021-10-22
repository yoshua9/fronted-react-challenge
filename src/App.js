import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import PhoneListContainer from "./containers/PhoneListContainer";
import PhoneDetailComponent from "./components/PhoneDetailComponent";
import { connect } from "react-redux";
import { getPhones } from "./store/clientFetchReducer";

class App extends Component {
  componentDidMount() {
    this.props.getPhones()
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="app__header">
            <Link to='/phones/' className="app__header--title">Phone Catalog</Link>
          </div>
        </header>
        <main className="app__main">
          <Switch>
            <Route exact path='/phones/' render={() =>
              <PhoneListContainer />
            } />
            <Route path='/phones/:id' render={(props) =>
              <PhoneDetailComponent
                phone={this.props.phones.filter(phone => phone.id == props.match.params.id)}
              />
            } />
          </Switch>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    phones: state.clientFetch.phones
  }
}
const mapDispatchToProps = {
  getPhones
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

