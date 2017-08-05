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
    this._transferirJedi = this._transferirJedi.bind(this);
    this._permitirArrastre = this._permitirArrastre.bind(this);

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

  _permitirArrastre(e) {
    e.preventDefault();
  }

  _moverJedi(arrastre) {
    this.setState({ arrastre : arrastre });
  }

  _transferirJedi(componente){
    if(!componente) {
      this.setState({arrastre:null});
      return;
    }
    let jedis = this.state.jedis;
    let planetas = this.state.planetas;
    switch (componente.tipo) {
      case 'lista':
        {
          if(this.state.arrastre.lugar === 'lista') {
            break;
          }
          const indicePlaneta = planetas.findIndex( planeta => planeta.jedi === this.state.arrastre.jedi );
          planetas[indicePlaneta].jedi = null;
          jedis.push(this.state.arrastre.jedi);
          this.setState({planetas: planetas, jedis:jedis, arrastre:null});
        }
        break;

      default:
        {
          if(this.state.arrastre.lugar === componente.nombre) {
            break;
          }
          const indicePlanetaArrastre = planetas.findIndex( planeta => planeta.nombre === this.state.arrastre.lugar );
          
          if(indicePlanetaArrastre !== -1) {
            planetas[indicePlanetaArrastre].jedi = null;
          } else {
            const indiceJedi = jedis.indexOf(this.state.arrastre);
            jedis.splice(indiceJedi, 1);
          }
          const indicePlaneta = planetas.findIndex( planeta => planeta.nombre === componente.nombre );
          planetas[indicePlaneta].jedi = this.state.arrastre.jedi;
          this.setState({planetas: planetas, jedis:jedis, arrastre:null});
        }
        break;
    }
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
          transferirJedi={this._transferirJedi}
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
