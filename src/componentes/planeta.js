import React from 'react';
import Jedi from './jedi'

class Planeta extends React.Component {
  render() {
    const jedi = this.props.planeta.jedi;
    return (
      <div>
        {this.props.planeta.nombre}
        <br />
        {jedi ? (
          <Jedi
            moverJedi={this.props.moverJedi}
            jedi={this.props.planeta.jedi} 
          />
        ) : (
          <a>Vacío</a>
        )}
      </div>
    );
  }
}

export default Planeta;