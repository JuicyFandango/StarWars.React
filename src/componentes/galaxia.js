import React from 'react';
import Planeta from './planeta';

class Galaxia extends React.Component {
  render() {
    const planetas = this.props.planetas.map( (planeta) => {
      return (
        <li className="collection-item avatar" key={planeta.id}>
        <img src={planeta.avatar} className="circle" />
        <Planeta
          key={planeta.id}
          transferirJedi={this.props.transferirJedi}
          moverJedi={this.props.moverJedi}
          planeta={planeta}
        />
        </li>
      );
    });
    return (
      <div>
        <ul className="collection">
        {planetas}
        </ul>
      </div>
    );
  }
}

export default Galaxia;