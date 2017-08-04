import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Galaxia from './componentes/galaxia'
import ListaJedi from './componentes/listaJedi'

class App extends React.Component {

  constructor(props) {
    super(props);
    this._obtenerJedis = this._obtenerJedis.bind(this);
    this._obtenerPlanetas = this._obtenerPlanetas.bind(this);
    this._moverJedi = this._moverJedi.bind(this);

    this.state = { 
      jedis : [],
      planetas: [],
      arrastre: null
    }
  }

  _obtenerJedis() {
    let jedis = 
    [
      {id: 0, nombre: 'Obiwan Kenobi'},
      {id: 1, nombre: 'Negro Piñera'},
      {id: 2, nombre: 'Lucho Jara'}
    ];

    this.setState({ jedis : jedis });
  }

  _obtenerPlanetas() {
    let planetas =
    [
      {id:0, nombre: 'Tierra', jedi: null},
      {id:1, nombre: 'Phobos', jedi: null},
      {id:2, nombre: 'Pluton', jedi: null}
    ]

    this.setState({ planetas : planetas });
  }

  _moverJedi(arrastre) {
    this.setState({ arrastre : arrastre });
    console.log(arrastre)
  }

  componentDidMount() {
    this._obtenerJedis();
    this._obtenerPlanetas();
  }

  render() {
    return (
      <container>
        <ListaJedi
          jedis={this.state.jedis}
          moverJedi={this._moverJedi}
          transferirJedi={this._transefrirJedi}
        />
        <Galaxia
          planetas={this.state.planetas}
          moverJedi={this._moverJedi}
          transferirJedi={this._transferirJedi}
        />
      </container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
