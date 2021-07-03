import React from 'react';
import CartStar from './icons/CartStar.jsx';
import {BACKEND_URL} from '../app/app.jsx';

// const BACKEND_URL = process.env.NODE_ENV === 'development' ? `http://localhost:3000` : `http://54.86.190.136`;

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: null,
      quantity: 1,
      clickNoSize: false,
      favoriteProduct: false
    }

    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleToggleFavorite= this.handleToggleFavorite.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);

    this.selectBox = React.createRef();
  }

  componentDidMount() {
    // for checking cart updates - can move elsewhere
    fetch(`${BACKEND_URL}/cart`)
      .then((results) => {
        return results.json();
      })
      .then((cart) => {
        // console.log('success getting cart from server', cart);
        return;
      })
      .then(() => {
        // console.log('favs', window.localStorage.getItem('favorites'));
        // this.checkFavorite();
      })
      .catch(() => {
        console.log('error getting Cart from server')
      });

  }

  componentDidUpdate(prevProps) {
    if (this.state.size && this.state.clickNoSize) {
      this.setState({ clickNoSize: false});
    }

    if (this.state.clickNoSize) {
      this.selectBox.focus();
      // document.body.addEventListener('click', () => this.setState({ clickNoSize: false}))
      // setTimeout(() => this.setState({ clickNoSize: false}), 5000);
    }

    if (this.props.product.id !== prevProps.product.id) {
      this.checkFavorite();
    }

    // reset size and quantity if style is changed
    if (this.props.currStyle.style_id !== prevProps.currStyle.style_id) {
      this.setState({
        size: null,
        quantity: 1,
        clickNoSize: false
      }, () => console.log('update cart state', this.state));
    }
  }

  handleSizeChange(e) {
    this.setState({size: e.target.value}, () => console.log(this.state));
  }

  handleQuantityChange(e) {
    this.setState({quantity: e.target.value}, () => console.log(this.state));
  }

  getSkuId() {
    let skus = this.props.currStyle.skus;
    for (let key in skus) {
      // let currSku = skus[key]
      if (skus[key].size === this.state.size) {
        return key;
      }
    }
  }

  handleAddToCart() {
    // check that a valid size and quantity selected
    if (this.state.size && this.state.quantity) {

      // get sku for style/size
      let sku_id = this.getSkuId.call(this);

      // iterate and make async POST requests to server
      let fetchPromises = [];
      for (let i = 0; i < this.state.quantity; i++) {
        fetchPromises.push(
          fetch(`${BACKEND_URL}/cart?sku=${sku_id}`, { method: 'POST'})
        )
      }
      Promise.all(fetchPromises)
        .then(() => {
          console.log('success posting one or more items to server')
          this.setState({
            size: null,
            quantity: 1
          });
        })
        .catch(() => {
          console.log('error posting one item to server')
        });
    } else if (!this.state.size) {
      this.setState({ clickNoSize: true});
    }
  }

  checkFavorite() {
    // check user storage to see if product id exists there
    let currentFavorites = JSON.parse(window.localStorage.getItem('favorites'));

    // only check if local storage has any favorites
    if (currentFavorites) {
      if (currentFavorites.includes(this.props.product.id)) {
        // change favroite product state to true
        this.setState({
          favoriteProduct: true
        });
      } else {
        this.setState({
          favoriteProduct: false
        });
      }
    }

  }

  handleToggleFavorite() {
    // on click of star box

    // if currently NOT favorite product
    if (!this.state.favoriteProduct) {
      let currentFavorites = JSON.parse(window.localStorage.getItem('favorites'));
      if (!currentFavorites) {
        currentFavorites = [];
      }
      currentFavorites.push(this.props.product.id);
      // add to favroties in local storage array
      window.localStorage.setItem('favorites', JSON.stringify(currentFavorites));
      this.setState({
        favoriteProduct: true
      });

    // otherwise if product is already in favorites, remove it and change state
    } else {
      let currentFavorites = JSON.parse(window.localStorage.getItem('favorites'));
      console.log('currfavs', currentFavorites);
      let idx = currentFavorites.indexOf(this.props.product.id);
      currentFavorites.splice(idx, 1);
      window.localStorage.setItem('favorites', JSON.stringify(currentFavorites));
      this.setState({
        favoriteProduct: false
      });
    }

  }

  render() {
    let skus = this.props.currStyle.skus;
    let maxQty = 15; // default
    let availableSizes = [];
    let outOfStock = false;

    for (let key in skus) {
      let currSku = skus[key]
      if (currSku.size === this.state.size && currSku.quantity < 15) {
        maxQty = currSku.quantity;
      }
      if (currSku.quantity > 0) {
        availableSizes.push(currSku.size)
      }
    }

    // QTY SELECT set up for dynmically rendering quantity options
    let qtys = []
    for (let i = 1; i <= maxQty; i++) {
      qtys.push(i);
    }

    // SIZE SELECT predefine in case OUT OF STOCK needs to be rendered instead
    // console.log('nosize', this.state.clickNoSize);
    let cartSizeSelect =
      <span className='cart-size-select'>
        <select ref={input => this.selectBox = input} autoFocus={this.state.clickNoSize} id='size-select' value={this.state.size ? this.state.size : 'SELECT SIZE'} onChange={this.handleSizeChange}>
        <option disabled>SELECT SIZE</option>
        {availableSizes.map((size, idx) => <option value={size} key={idx}>{size}</option>)}
        </select>
      </span>

    if (!availableSizes.length) {
      outOfStock = true;
    }
    if (outOfStock) {
      cartSizeSelect = <span className='cart-size-select'>OUT OF STOCK</span>
    }


    // QUANTITY SELECTOR
    let qtySelector;
    // default qty before style is selected
    if (!this.state.size) {
      qtySelector =
      <select onChange={this.handleQuantityChange} value={this.state.size ? this.state.quantity : '-'}>
        <option disabled> - </option>
      </select>
    // after style is selected default to one
    } else {
      qtySelector =
      <select onChange={this.handleQuantityChange}>
        {qtys.map(num => <option value={num} key={num}>{num}</option>)}
      </select>
    }

    // ADD TO CART
    let addToCart;
    if (outOfStock) {
      // hide button if style is out of stock
      addToCart = <div className='add-to-cart'></div>
    } else {
      addToCart =
      <div className='add-to-cart'>
        <button onClick={this.handleAddToCart}>Add To Cart</button>
      </div>
    }

    let sizePrompt;
    if (this.state.clickNoSize) {

      sizePrompt = <span className='cart-text-prompt'>Please select a size!</span>
      // open dropdown menu?
    } else {
      sizePrompt = null;
    }

    // cart star, user favorite or not
    let cartStar;
    if (this.state.favoriteProduct) {
      cartStar = <CartStar fill={'#FFDF00'} handleToggleFavorite={this.handleToggleFavorite}/>
    } else {
      cartStar = <CartStar handleToggleFavorite={this.handleToggleFavorite}/>
    }

    return (
      <div className='cart'>
        <div className='size-qty-container'>
          {cartSizeSelect}
          <span className='cart-quantity-select'>
            {qtySelector}
          </span>
          {cartStar}
        </div>
        <div className='cart-button-container'>
          {addToCart}
          {sizePrompt}
        </div>
      </div>
    );
  }
}

export default Cart;