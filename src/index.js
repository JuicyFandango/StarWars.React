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
    this._botarJedi = this._botarJedi.bind(this);

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

  _botarJedi(e){
    this._transferirJedi(null);
  }

  _moverJedi(arrastre) {
    this.setState({ arrastre : arrastre });
    console.log(arrastre)
  }

  _transefrirJedi(componente){
    let jedis = this.state.jedis;
    let planetas = this.state.planetas;

    switch (componente.tipo) {
      case 'lista':
        //planetas.find( planeta => planeta === );
        jedis.push(this.state.arrastre);
        this.setState({planetas: planetas, jedis:jedis, arrastre:null});
        break;

      case 'planeta':
        const indiceJedi = jedis.indexOf(this.state.arrastre);
        jedis.splice(indiceJedi, 1);
        const indicePlaneta = planetas.indexOf(componente.nombre);
        planetas[indicePlaneta].jedi = this.arrastre;
        this.setState({planetas: planetas, jedis:jedis, arrastre:null});
        break;

      default:
        console.log('jedi botado')
        break;
    }
  }

  componentDidMount() {
    this._obtenerJedis();
    this._obtenerPlanetas();
  }

  render() {
    return (
      <container
        onDragStop={this._botarJedi}
      >
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
