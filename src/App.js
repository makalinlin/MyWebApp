import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Personne/Personne';

class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Linette', age: 24 },
      { id: 'vasdf1', name: 'Elvis', age: 22 },
      { id: 'asdf11', name: 'Julie', age: 23 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );

    const person = {
      ...this.state.persons[personIndex]
    };

   

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons } );
  }

  deletePersonHandler = ( personIndex ) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice( personIndex, 1 );
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map( ( person, index ) => {
            return <Person
              click={() => this.deletePersonHandler( index )}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={( event ) => this.nameChangedHandler( event, person.id )} />
          } )}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    const classes = [];
    if ( this.state.persons.length <= 2 ) {
      classes.push( 'red' ); 
    }
    if ( this.state.persons.length <= 1 ) {
      classes.push( 'bold' ); 
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Bonjour, Voici mom app react JS</h1>
          <p className={classes.join( ' ' )}>Cela fonctionne vraiment!</p>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Changer de personne</button>
          {persons}
        </div>
      </StyleRoot>
    );
    
  }
}

export default Radium( App );
