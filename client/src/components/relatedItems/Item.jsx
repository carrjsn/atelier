import React from 'react';
import './relatedItems.css';
import Stars from '../stars/stars.jsx';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // category
  // name
  // price
  // stars
  // photo

  render() {
    return (
      // <div style={styles.card}>
      <div className='card' onClick={() => this.props.updateProductId(this.props.id)}>
        <img className='card-image' alt='related-image' height='225px' width='198px' src={this.props.photo}></img>
        <div className='card-text-box'>
          <div className='card-category'>{this.props.category}</div>
          <div className='card-name'>{this.props.name}</div>
          <div className='card-price'>${this.props.price}</div>
          <div className='card-stars'><Stars size={16} rating={this.props.stars}/></div>
        </div>
      </div>
    )
  }
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    height: '350px',
    backgroundColor: 'blue',
    border:'2px solid black',
    boxSizing: 'border-box',
    fontSize: '2.5em',
    color: 'white'
  },
  // card_container: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   width: 'fit-content'
  // }
}



export default Item;
