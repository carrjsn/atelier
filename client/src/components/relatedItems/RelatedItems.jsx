import React, { Component } from "react";
import Item from './Item.jsx';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_card: 1
    }
  }

  componentDidMount() {
    // console.log('card_container children: ', this.card_container.children[0]);
    let first_card_clone = this.card_container.children[0].cloneNode(true);
    let last_card_clone = this.card_container.children[this.card_container.children.length - 1].cloneNode(true);

    this.card_container.insertBefore(last_card_clone, this.card_container.children[0]);
    this.card_container.append(first_card_clone);
    this.card_container.style.transitionDuration = '0s';
    this.card_container.style.transform = `translate(-${350}px)`;
  }

  handle_next = () => {
    // console.log('Click triggered');
    if (this.state.current_card < this.card_container.children.length - 1) {
      let new_current_card = this.state.current_card + 1;

      this.setState({ current_card: new_current_card }, () => {
        this.card_container.style.transitionDuration = '0.5s';
        this.card_container.style.transform = `translate(-${350 * this.state.current_card}px)`;

        if (this.state.current_card === this.card_container.children.length - 1) {
          setTimeout(() => {
            this.card_container.style.transitionDuration = '0s';
            this.card_container.style.transform = `translate(-${350}px)`;

            this.setState({current_card: 1});
          }, 500);

        }

      });

    } else {
      return;
    }


  }

  handle_previous = () => {
    if (this.state.current_card > 0) {
      let new_current_card = this.state.current_card - 1;

      this.setState({ current_card: new_current_card }, () => {
        this.card_container.style.transitionDuration = '0.5s';
        this.card_container.style.transform = `translate(-${350 * this.state.current_card}px)`;

        if (this.state.current_card === 0) {
          setTimeout(() => {
            this.card_container.style.transitionDuration = '0s';
            this.card_container.style.transform = `translate(-${350 * (this.card_container.children - 2)}px)`;

            this.setState({current_card: this.card_container.children.length - 2});
          }, 500);

        }

      });

    } else {
      return;
    }

  }

  render() {
    return (
      <div className='related-items'>
        <h1>Related Products</h1>
        <div>
        <button onClick={this.handle_previous}>Previous</button>
        <button onClick={this.handle_next}>Next</button>
        </div>
        <div className="viewPort">
          <div ref={ref_id => this.card_container = ref_id} className="card_container">
          {/* <div ref={ref_id => this.card_container = ref_id} className="cardContainer"> */}
          {/* <i class="fa fa-chevron-left"></i> */}
            <Item itemNumber={0}/>
            <Item itemNumber={1}/>
            <Item itemNumber={2}/>
            <Item itemNumber={3}/>
            <Item itemNumber={4}/>
            <Item itemNumber={5}/>
          </div>
        </div>
      </div>
    )
  }
}

// const styles = {
  // view_port: {
  //   position: 'absolute',
  //   // top: '50%',
  //   // left: '50%',
  //   // transform: 'translate(0%, -50%)',
  //   width: '350px',
  //   height: '100px',
  //   backgroundColor: 'red',
  //   overflow: 'hidden',
  // },
  // card_container: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   width: 'fit-content'
  // }
// }

export default RelatedItems;
