import React from 'react';
import Planeta from './planeta';

class Galaxia extends React.Component {
  render() {
    const planetas = this.props.planetas.map( (planeta) => {
      return (
        <Planeta
          key={planeta.id}
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