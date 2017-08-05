import React from 'react';
import Planeta from './planeta';

class Galaxia extends React.Component {
  render() {
    const planetas = this.props.planetas.map( (planeta) => {
      return (
        <Planeta
          key={planeta.id}
          transferirJedi={this.props.transferirJedi}
          moverJedi={this.props.moverJedi}
          planeta={planeta}
        />
      );
    });
    return (
      <div>
        {planetas}
      </div>
    );
  }
}

export default Galaxia;