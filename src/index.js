import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Galaxia from './componentes/galaxia'
import ListaJedi from './componentes/listaJedi'
import Config from './config.js'

class App extends React.Component {

  constructor(props) {
    super(props);
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
    return new Promise( (resolve, reject) => {
      fetch(`${Config.API_URL}/api/occupation/jedi/people`)
        .then( response => {
          response.json().then( body => {
            resolve(body);
          })
        })
        .catch( (error) => {
          reject(`Error al obtener jedis: ${error}`);
        })
    })
  }

  _obtenerPlanetas() {
    return new Promise((resolve, reject) => {
      fetch(`${Config.API_URL}/api/planets`)
        .then(response => {
          response.json().then(body => {
            resolve(body);
          })
        })
        .catch((error) => {
          reject(`Error al obtener jedis: ${error}`);
        })
    })
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
    this._obtenerJedis().then( jedis => {
      this.setState({ jedis : jedis })
    });
    this._obtenerPlanetas().then( planetas => {
      this.setState({ planetas : planetas })
    });
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
