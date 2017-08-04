import React from 'react';
import Jedi from './jedi';

class ListaJedi extends React.Component {
  render(){
    const jedis = this.props.jedis.map( (jedi) => {
      return (
        <li key={jedi.id}>
          <Jedi
            moverJedi={this.props.moverJedi}
            jedi={jedi}
          />
        </li>
      );
    });
    return(
      <div>
        <ul>
          {jedis}
        </ul>
      </div>
    );
  }
}

export default ListaJedi;