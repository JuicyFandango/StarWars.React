import React from 'react';

class Jedi extends React.Component {
  constructor(props) {
    super(props);

    this._arrastrarJedi = this._arrastrarJedi.bind(this);
  }

  _arrastrarJedi(event) {
    this.props.manejarArrastre(this.props.jedi);
  }

  render() {
    return (
      <div
        onDragStart={this._arrastrarJedi}
        draggable='true'
      >
        {this.props.jedi.nombre}
      </div>
    );
  }
}

export default Jedi;