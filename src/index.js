import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class JediInfo extends React.Component {
  constructor(props) {
    super(props)
    this._handleJediClick = this._handleJediClick.bind(this)
  }

  _handleJediClick(e) {
    this.props.seleccionarJedi(this.props.jedi)
  }

  render() {
    const clase = this.props.jedi.seleccionado ? 'jediSeleccionado' : 'heckNo'
    return (
      <li onClick={this._handleJediClick} className={clase}>
        {this.props.jedi.name}, {clase}
      </li>
    )
  }
}

class JediList extends React.Component {

  render(){
    const listaJedis = this.props.listaJedis.map( (jedi) => {
      return <JediInfo jedi={jedi} seleccionarJedi={this.props.seleccionarJedi} key={jedi.id}/>
    })
    return(
      <ul>
        {listaJedis}
      </ul>
    )
  }
}

class Root extends React.Component {

  constructor(props) {
    super(props)
    this._obtenerJedis = this._obtenerJedis.bind(this)
    this._seleccionarJedi = this._seleccionarJedi.bind(this)

    //this.state = { listaJedis : [] }

    this.state = { listaJedis : [{id: 1, name: 'ObiWan', seleccionado: false}] }
  }

  _seleccionarJedi(jedi) {
    const listaJedis = this.state.listaJedis
    const jediPos = listaJedis.indexOf(jedi)

    if (jediPos == -1 || listaJedis[jediPos].seleccionado) {
      return
    }

    listaJedis[jediPos].seleccionado = true

    this.setState = { listaJedis : listaJedis }
  }

  _obtenerJedis() {
    let listaJedis = []

    // TODO: Programar la API!!!
    fetch( '' , (data) => {
      listaJedis = data;
    })

    this.setState({ listaJedis : listaJedis })
  }

  componentDidMount() {
    //this._obtenerJedis()
  }


  render() {
    return (
      <JediList listaJedis={this.state.listaJedis} seleccionarJedi={this._seleccionarJedi}/>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
