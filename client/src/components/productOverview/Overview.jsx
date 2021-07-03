import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import Cart from './Cart.jsx';
import StyleSelector from './StyleSelector.jsx';
import ImageGallery from './ImageGallery.jsx';
import WithTracking from '../hoc/withTracking.jsx';
import {BACKEND_URL} from '../app/app.jsx';
import SloganDescription from './SloganDescription.jsx';
import Features from './Features.jsx';

// const BACKEND_URL = process.env.NODE_ENV === 'development' ? `http://localhost:3000` : `http://54.86.190.136`;

export class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      styles: [],
      currentStyle: {},
      expandedView: false
    }

    this.updateStyle = this.updateStyle.bind(this);
    this.setDefaultStyle = this.setDefaultStyle.bind(this);
    this.toggleExpandedView = this.toggleExpandedView.bind(this);
    this.fetchStyles = this.fetchStyles.bind(this);
  }

  componentDidMount() {
    this.fetchProductInfo()
      .then(this.fetchStyles)
      .then(this.setDefaultStyle);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.fetchProductInfo()
        .then(this.fetchStyles)
        .then(this.setDefaultStyle);
    }
  }

  fetchProductInfo() {
    console.log('fetch overview state', this.state)
    return fetch(`${BACKEND_URL}/productInfo?productId=${this.props.productId}`)
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
    return fetch(`${BACKEND_URL}/styles?productId=${this.props.productId}`)
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
    return this.setState({currentStyle: firstStyle});
  }

  updateStyle(e) {
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
    if (!this.state.expandedView) {
      // make lower widgets change opacity while in expanded view
      document.getElementById('lower-widgets').style.opacity = 0.2;
      document.getElementById('navbar').style.opacity = 0.2;
    } else {
      document.getElementById('lower-widgets').style.opacity = 1;
      document.getElementById('navbar').style.opacity = 1;
    }
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
          <ImageGallery currentStyle={this.state.currentStyle} expanded={this.state.expandedView} toggleExpandedView={this.toggleExpandedView}/>
        </div>
      );

    } else {
      // default view
      return (
        <div className='overview' onClick={(e) => this.props.onWrappedComponentClick(e)}>
          <ImageGallery currentStyle={this.state.currentStyle} expanded={this.state.expanded} toggleExpandedView={this.toggleExpandedView}/>
          <ProductInfo product={this.state.product} currentStyle={this.state.currentStyle} avgRating={this.props.avgRating} noOfReviews={this.props.noOfReviews}/>
          <StyleSelector updateStyle={this.updateStyle} styles={this.state.styles} currentStyle={this.state.currentStyle}/>
          <Cart currStyle={this.state.currentStyle} product={this.state.product}/>
          <div className='slogan-feature-container'>
            <SloganDescription product={this.state.product}/>
            <Features product={this.state.product}/>
          </div>
        </div>
      );
    }

  }
}

const OverviewWithTracking = WithTracking(Overview, 'overview');
export default OverviewWithTracking;