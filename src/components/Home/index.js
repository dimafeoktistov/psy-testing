import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Психологические тесты:
          </p>
          <Link to="/shulte" className="">Таблица Шульте</Link>
          <Link to="/perception1">Корректурная проба 1</Link>
        </header>
        
      </div>
    );
  }
}

export default Home;