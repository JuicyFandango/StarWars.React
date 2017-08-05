import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Icon, Collection} from 'react-materialize';
import './index.css';
import Galaxia from './componentes/galaxia'
import ListaJedi from './componentes/listaJedi'
// Archivo de configuración
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
      resolve([])
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
          if(
              this.state.arrastre.lugar === componente.nombre ) {
            break;
          }
          const indicePlanetaArrastre = planetas.findIndex( planeta => planeta.nombre === this.state.arrastre.lugar );

          if(indicePlanetaArrastre !== -1) {
            planetas[indicePlanetaArrastre].jedi = null;
          } else {
            const indiceJedi = jedis.indexOf(this.state.arrastre.jedi);
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
    // Obtención de Jedis desde la API
    this._obtenerJedis().then( jedis => {
      this.setState({ jedis : jedis })
    });

    // Obtención de planetas !!!
    this._obtenerPlanetas().then( planetas => {
      this.setState({ planetas : planetas })
    });
  }

  render() {
    return (
      // Contenedor principal de la aplicación
      <div className="App">
        <nav className="black">
          <div className="nav-wrapper">
             <img width="100" height="85" src="https://www.merchoid.com/wp-content/uploads/2016/02/xreflogo-starwars.jpg.pagespeed.ic.-cU0EJSd2O.jpg" className="App-logo" alt="logo" />
             <ul id="nav-mobile" className="right hide-on-med-and-down">
             </ul>
          </div>
        </nav>

       <div className="container">
         <div className="row">
           <h3 className="center">Star Wars Commander</h3>
           <h5 className="center">Arrastra los jedis hacia los planetas para calcular el porcentaje de exito de la misión</h5>
           <container>
             <br/>
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
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
