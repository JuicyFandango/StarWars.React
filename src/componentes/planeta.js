import React from 'react';
import Jedi from './jedi'

class Planeta extends React.Component {
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
    if(!this.props.planeta.jedi) {
      this.props.transferirJedi
      ({
        tipo:'planeta', 
        nombre:this.props.planeta.nombre
      });
    }
  }

  _manejarArrastre(jedi) {
    this.props.moverJedi({jedi:jedi, lugar:this.props.planeta.nombre});
  }

  render() {
    const jedi = this.props.planeta.jedi;
    const clima = this.props.planeta.clima;
    let icono = 'a';
    let exito = 0;
    const stats = 
    {
      str: 0,
      agi: 0,
      fort: 0,
      wiz: 0
    }
    const style = {color: ''};
    console.log(jedi)
    if(jedi) {
      stats.str = this.props.planeta.jedi.strength;
      stats.agi = this.props.planeta.jedi.agility;
      stats.fort = this.props.planeta.jedi.resilience;
      stats.wiz = this.props.planeta.jedi.wisdom;
    }
    
    switch(clima) {
      case 'temperado':
        exito = (stats.str*0.50 + stats.agi*0.05 + stats.fort*0.05 + stats.wiz*0.05)*10;
        icono = 'wb_sunny';
        break;
      case 'seco':
        exito = (stats.str*0.05 + stats.agi*0.50 + stats.fort*0.05 + stats.wiz*0.05)*10;
        icono = 'multiline_chart'
        break;
      case 'pantanoso':
        exito = (stats.str*0.05 + stats.agi*0.05 + stats.fort*0.50 + stats.wiz*0.05)*10;
        icono = 'cloud';
        break;
      default:
        icono = 'help_outline';
        exito = (stats.str*0.05 + stats.agi*0.05 + stats.fort*0.05 + stats.wiz*0.50)*10;
        break;
    }
    if(exito <= 25 && exito > 0) {
      style.color = 'red';
    } else if (exito <= 50 && exito > 25) {
      style.color = 'yellow';
    } else if (exito <= 100 && exito > 50) {
      style.color = 'green';
    }
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
            manejarArrastre={this._manejarArrastre}
          />
        ) : (
          <a>Vacío</a>
        )}
        <a className="secondary-content">
            <i className="material-icons">{icono}</i>Clima:{clima}
            <br />
            Porcentaje de exito:<span style={style}>{Math.trunc(exito)}</span>%
          </a>
      </div>
    );
  }
}

export default Planeta;