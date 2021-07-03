import React, { Component } from "react";
import Item from './Item.jsx';
// import ChevronLeft from '../productOverview/icons/ChevronLeft.jsx';
// import ChevronRight from '../productOverview/icons/ChevronRight.jsx';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_card: 1,
      relatedItems: [
        {
          id: 22122,
          campus: 'hr-rpp',
          name: 'Camo Onesie',
          slogan: 'Blend in to your crowd',
          description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
          category: 'Jackets',
          default_price: '140.00',
          created_at: '2021-03-18T16:09:30.589Z',
          updated_at: '2021-03-18T16:09:30.589Z',
          stars: 4,
          url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          features: [
            { feature: 'Fabric', value: 'Canvas' },
            { feature: 'Buttons', value: 'Brass' }
          ]
        },
        {
          id: 22129,
          campus: 'hr-rpp',
          name: 'YEasy 350',
          slogan: 'Just jumped over jumpman',
          description: 'These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.',
          category: 'Kicks',
          default_price: '450.00',
          created_at: '2021-03-18T16:09:30.589Z',
          updated_at: '2021-03-18T16:09:30.589Z',
          stars: 0,
          url: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
          features: [
            { feature: 'Sole', value: 'Rubber' },
            { feature: 'Material', value: 'FullControlSkin' },
            { feature: 'Stitching', value: 'Double Stitch' }
          ]
        },
        {
          id: 22161,
          campus: 'hr-rpp',
          name: 'Adell 300 Shoes',
          slogan: 'Doloribus voluptas impedit est qui voluptates omnis non omnis soluta.',
          description: 'Ex molestiae maxime atque ullam quod perspiciatis aut corporis. Perspiciatis consectetur soluta quos corrupti error aut qui est provident. Voluptatem cum id totam temporibus velit rem deleniti.',
          category: 'Shoes',
          default_price: '129.00',
          created_at: '2021-03-18T16:09:31.545Z',
          updated_at: '2021-03-18T16:09:31.545Z',
          stars: 3,
          url: 'https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
          features: [
            { feature: 'Cut', value: '"Skinny"' },
            { feature: 'Stitching', value: '"Double Stitch"' },
            { feature: 'Non-GMO', value: null }
          ]
        },
        {
          id: 22124,
          campus: 'hr-rpp',
          name: 'Morning Joggers',
          slogan: 'Make yourself a morning person',
          description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
          category: 'Pants',
          default_price: '40.00',
          created_at: '2021-03-18T16:09:30.589Z',
          updated_at: '2021-03-18T16:09:30.589Z',
          stars: 4,
          url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          features: [
            { feature: 'Fabric', value: '100% Cotton' },
            { feature: 'Cut', value: 'Skinny' }
          ]
        },
        {
          id: 22134,
          campus: 'hr-rpp',
          name: 'The Ezekiel Hoodie',
          slogan: 'Optio explicabo dolores illo deleniti aliquid perferendis reprehenderit.',
          description: 'Maxime repellat adipisci necessitatibus veniam dolore est dolores perspiciatis architecto. Cumque deleniti ratione laudantium. Exercitationem nulla saepe dignissimos magni nisi aut veritatis.',
          category: 'Hoodie',
          default_price: '359.00',
          created_at: '2021-03-18T16:09:31.545Z',
          updated_at: '2021-03-18T16:09:31.545Z',
          stars: 3,
          url: 'https://images.unsplash.com/photo-1536830220630-ce146cccac84?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
          features: [
            { feature: 'Lifetime Guarantee', value: null },
            { feature: 'Frame', value: '"AllLight Composition Resin"' },
            { feature: 'Lifetime Guarantee', value: null },
            { feature: 'Fabric', value: '"Canvas"' }
          ]
        }
      ]
    }

  }

  componentDidMount() {
    // console.log('card_container children: ', this.card_container.children[0]);
    let first_card_clone = this.card_container.children[0].cloneNode(true);
    let last_card_clone = this.card_container.children[this.card_container.children.length - 1].cloneNode(true);

    this.card_container.insertBefore(last_card_clone, this.card_container.children[0]);
    this.card_container.append(first_card_clone);
    this.card_container.style.transitionDuration = '0s';
    this.card_container.style.transform = `translate(-${250}px)`;
  }

  handle_next = () => {
    // console.log('Click triggered');
    if (this.state.current_card < this.card_container.children.length - 1) {
      let new_current_card = this.state.current_card + 1;

      this.setState({ current_card: new_current_card }, () => {
        this.card_container.style.transitionDuration = '0.5s';
        this.card_container.style.transform = `translate(-${250 * this.state.current_card}px)`;

        if (this.state.current_card === this.card_container.children.length - 1) {
          setTimeout(() => {
            this.card_container.style.transitionDuration = '0s';
            this.card_container.style.transform = `translate(-${250}px)`;

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
        this.card_container.style.transform = `translate(-${250 * this.state.current_card}px)`;

        if (this.state.current_card === 0) {
          setTimeout(() => {
            this.card_container.style.transitionDuration = '0s';
            this.card_container.style.transform = `translate(-${250 * (this.card_container.children - 2)}px)`;

            this.setState({current_card: this.card_container.children.length - 2});
          }, 500);

        }

      });

    } else {
      return;
    }

  }

  // todo: onclick change main product id

  render() {
    return (
      <div className='related-items'>
        <h4 className='related-heading'>RELATED PRODUCTS</h4>
        <button className='card-button' onClick={this.handle_previous}>Previous</button>
        <button className='card-button' onClick={this.handle_next}>Next</button>
        <div className="viewPort">
          <div ref={ref_id => this.card_container = ref_id} className="card_container">
          {this.state.relatedItems.map((item, idx) => <Item key={idx} updateProductId={this.props.updateProductId} id={item.id} category={item.category} name={item.name} price={item.default_price} stars={item.stars} photo={item.url}/>)}
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



// mock product 1
// product {
//   id: 22122,
//   campus: 'hr-rpp',
//   name: 'Camo Onesie',
//   slogan: 'Blend in to your crowd',
//   description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//   category: 'Jackets',
//   default_price: '140.00',
//   created_at: '2021-03-18T16:09:30.589Z',
//   updated_at: '2021-03-18T16:09:30.589Z',
//   features: [
//     { feature: 'Fabric', value: 'Canvas' },
//     { feature: 'Buttons', value: 'Brass' }
//   ]
// }

// mockproduct 2

// product {
//   id: 22129,
//   campus: 'hr-rpp',
//   name: 'YEasy 350',
//   slogan: 'Just jumped over jumpman',
//   description: 'These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.',
//   category: 'Kicks',
//   default_price: '450.00',
//   created_at: '2021-03-18T16:09:30.589Z',
//   updated_at: '2021-03-18T16:09:30.589Z',
//   features: [
//     { feature: 'Sole', value: 'Rubber' },
//     { feature: 'Material', value: 'FullControlSkin' },
//     { feature: 'Stitching', value: 'Double Stitch' }
//   ]
// }

// mock product 3

// product {
//   id: 22161,
//   campus: 'hr-rpp',
//   name: 'Adell 300 Shoes',
//   slogan: 'Doloribus voluptas impedit est qui voluptates omnis non omnis soluta.',
//   description: 'Ex molestiae maxime atque ullam quod perspiciatis aut corporis. Perspiciatis consectetur soluta quos corrupti error aut qui est provident. Voluptatem cum id totam temporibus velit rem deleniti.',
//   category: 'Shoes',
//   default_price: '129.00',
//   created_at: '2021-03-18T16:09:31.545Z',
//   updated_at: '2021-03-18T16:09:31.545Z',
//   features: [
//     { feature: 'Cut', value: '"Skinny"' },
//     { feature: 'Stitching', value: '"Double Stitch"' },
//     { feature: 'Non-GMO', value: null }
//   ]
// }