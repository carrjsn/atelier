import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import Cart from './Cart.jsx';
import StyleSelector from './StyleSelector.jsx';
import ImageGallery from './ImageGallery.jsx';
import WithTracking from '../hoc/withTracking.jsx';

export class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      styles: [],
      currentStyle: {},
      expandedView: false
    }

  }

  componentDidMount() {
    this.fetchProductInfo()
      .then(this.fetchStyles.bind(this))
      .then(this.setDefaultStyle.bind(this));
  }

  fetchProductInfo() {
    return fetch(`http://18.218.194.166/productInfo?productId=${this.props.productId}`)
      .then((results) => {
        return results.json();
      })
      .then((productInfo) => {
        this.setState({product: productInfo});
      })
      .catch(() => {
        console.log('error fetching product info from server');
      });
  }

  fetchStyles() {
    return fetch(`http://18.218.194.166/styles?productId=${this.props.productId}`)
      .then((results) => {
        return results.json();
      })
      .then((styles) => {
        this.setState({styles: styles.results});
      })
      .catch(() => {
        console.log('error fetching styles from server')
      });
  }

  setDefaultStyle() {

    let firstStyle = this.state.styles[0];

    // for using default style prop, not always first style though..
    // this.state.styles.forEach(style => {
    //   if (style['default?']) {
    //     firstStyle = style;
    //   }
    // });

    return this.setState({currentStyle: firstStyle});
  }

  updateStyle(e) {
    // console.log('click', e);
    e.preventDefault();
    this.state.styles.forEach(style => {
      if (style.style_id === Number(e.target.id)) {
        this.setState({
          currentStyle: style
        }, () => console.log('update style state', this.state))
      }
    })
  }

  toggleExpandedView() {
    this.setState((prevState) => {
      return {
        expandedView: !prevState.expandedView
      }
    });
  }

  render() {
    // if expanded view is set to true only render the ImageGalleryExpanded comp and nothing else
    // OR if expanded view is set to true only render the ImageGallery comp with updated classnames and nothing else
    console.log('state', this.state)

    if (this.state.expandedView) {
      // expanded view
      return (
        <div className='overview' onClick={(e) => this.props.onWrappedComponentClick(e)}>
          <ImageGallery currentStyle={this.state.currentStyle} expanded={this.state.expandedView} toggleExpandedView={this.toggleExpandedView.bind(this)}/>
        </div>
      );

    } else {
      // default view
      return (
        <div className='overview' onClick={(e) => this.props.onWrappedComponentClick(e)}>
          <ImageGallery currentStyle={this.state.currentStyle} expanded={this.state.expanded} toggleExpandedView={this.toggleExpandedView.bind(this)}/>
          <ProductInfo product={this.state.product} currentStyle={this.state.currentStyle} avgRating={this.props.avgRating} noOfReviews={this.props.noOfReviews}/>
          <StyleSelector updateStyle={this.updateStyle.bind(this)} styles={this.state.styles} currentStyle={this.state.currentStyle}/>
          <Cart currStyle={this.state.currentStyle}/>
        </div>
      );
    }

  }
}

const OverviewWithTracking = WithTracking(Overview, 'overview');
export default OverviewWithTracking;