import React from 'react';
import Jedi from './jedi';

class ListaJedi extends React.Component {
  constructor(props) {
    super(props);
    this._transferirJedi = this._transferirJedi.bind(this);
    this._permitirArrastre = this._permitirArrastre.bind(this);
  }

  _permitirArrastre(e) {
    e.preventDefault();
  }

  _transferirJedi() {
    this.props.transferirJedi({tipo:'lista'})
  }

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
        <ul
        onDragOver={this._permitirArrastre}
        onDrop={this._transferirJedi}
        >
          {jedis}
        </ul>
      </div>
    );
  }
}

export default ListaJedi;