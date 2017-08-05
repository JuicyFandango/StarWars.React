import React from 'react';
import Jedi from './jedi';

class ListaJedi extends React.Component {
  constructor(props) {
    super(props);
    this._transferirJedi = this._transferirJedi.bind(this);
    this._permitirArrastre = this._permitirArrastre.bind(this);
    this._manejarArrastre = this._manejarArrastre.bind(this);
  }

  _permitirArrastre(e) {
    e.preventDefault();
  }

  _transferirJedi() {
    this.props.transferirJedi({tipo:'lista'})
  }

  _manejarArrastre(jedi) {
    this.props.moverJedi({jedi:jedi, lugar:'lista'});
  }

  render(){
    const jedis = this.props.jedis.map( (jedi) => {
      return (


        <li className="collection-item avatar" key={jedi.id}>
           <img src={jedi.avatar} className="circle" />
          <span className="title">
          <Jedi
            manejarArrastre={this._manejarArrastre}
            jedi={jedi}
          />
          </span>
          <a className="secondary-content">
            <i className="material-icons">grade</i>Agilidad:{jedi.agility}
            <i className="material-icons">grade</i>Fuerza:{jedi.strength}
            <i className="material-icons">grade</i>Fortaleza:{jedi.resilience}
            <i className="material-icons">grade</i>Sabiduria:{jedi.wisdom}
          </a>
        </li>
      );
    });
    return(
      <div>



        <ul className="collection"
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