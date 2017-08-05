import React from 'react';
import Jedi from './jedi'

class Planeta extends React.Component {
  constructor(props) {
    super(props);
    this._transferirJedi = this._transferirJedi.bind(this);
    this._permitirArrastre = this._permitirArrastre.bind(this);
  }

  _permitirArrastre(e) {
    e.preventDefault();
  }

  _transferirJedi() {
    this.props.transferirJedi({tipo:'planeta', nombre:this.props.planeta.nombre})
  }

  render() {
    const jedi = this.props.planeta.jedi;
    return (
      <div 
        onDragOver={this._permitirArrastre}
        onDrop={this._transferirJedi}
      >
        {this.props.planeta.nombre}
        <br />
        {jedi ? (
          <Jedi
            jedi={this.props.planeta.jedi}
            moverJedi={this.props.moverJedi}
          />
        ) : (
          <a>Vacío</a>
        )}
      </div>
    );
  }
}

export default Planeta;