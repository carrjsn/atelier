import React from 'react';
import ImageList from './ImageList.jsx';
import ChevronLeft from './icons/ChevronLeft.jsx';
import ChevronRight from './icons/ChevronRight.jsx';
import Maximize from './icons/Maximize.jsx';
import Minimize from './icons/Minimize.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: {},
      photos: [],
      currentIndex: 0,
      zoomView: false
    }

    this.updateMainImage = this.updateMainImage.bind(this);
    this.toggleZoomView = this.toggleZoomView.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);

  }

  componentDidUpdate(prevProps) {
    // check to make sure valid props are being passed in - it takes a few renders before they do..
    if (!prevProps.currentStyle.photos && this.props.currentStyle.photos) {
      this.setState({
        // currentImage: this.props.currentStyle.photos[0],
        currentImage: this.props.currentStyle.photos[this.state.currentIndex],
        photos: this.props.currentStyle.photos
      });

      // for style selector onclick
    } else if (prevProps.currentStyle.style_id) {
      // if new style has been selected
      if (prevProps.currentStyle.style_id !== this.props.currentStyle.style_id) {
        // if new style has less photos than prev style set currentIndex to 0 -- avoid out of range issue
        let index = this.state.currentIndex;
        if (this.props.currentStyle.photos.length <= this.state.currentIndex) {
          index = 0;
        }
        console.log('image state', this.state)
        this.setState({
          // currentImage: this.props.currentStyle.photos[0],
          currentImage: this.props.currentStyle.photos[index],
          photos: this.props.currentStyle.photos,
          currentIndex: index
        });
      }
    }
  }

  updateMainImage(e) {
    e.preventDefault();
    this.state.photos.forEach((image, idx) => {
      if (image.thumbnail_url === e.target.src || image.thumbnail_url === e.target.id || image.url === e.target.src) {
        this.setState({
          currentImage: image,
          currentIndex: idx
        });
      }
    });
  }

  nextImage() {
    this.setState((prevState) => {
      return {
        currentImage: this.state.photos[prevState.currentIndex + 1],
        currentIndex: prevState.currentIndex + 1
      }
    });
  }

  prevImage() {
    this.setState((prevState) => {
      return {
        currentImage: this.state.photos[prevState.currentIndex - 1],
        currentIndex: prevState.currentIndex - 1
      }
    });
  }

  toggleZoomView() {
    this.setState((prevState) => {
      return {
        zoomView: !prevState.zoomView
      }
    });
  }

  zoomImage(e) {
    // refactor with refs?
    let zoomWrap = document.getElementById('image-zoom-wrap');
    let zoomImage = document.getElementById('image-main-zoom');
    let clientX = e.clientX - zoomWrap.offsetLeft;
    let clientY = e.clientY - zoomWrap.offsetTop;

    let minWidth = zoomWrap.offsetWidth;
    let minHeight = zoomWrap.offsetHeight;

    clientX = clientX / minWidth * 100;
    clientY = clientY / minHeight * 100;

    zoomImage.style.transform = `translate(-${clientX}%, -${clientY}%) scale(2)`;
  }


  render() {

    // vars for classnames depending on whether expanded or default gallery layout
    let view = this.props.expanded ? 'expanded' : 'default';
    let minMaxIcon = this.props.expanded ? <Minimize toggleExpandedView={this.props.toggleExpandedView}/> : <Maximize toggleExpandedView={this.props.toggleExpandedView}/>

    // left-right arrows
    let leftArrow =
      this.state.currentIndex !== 0 ? <ChevronLeft view={view} prevImage={this.prevImage} color='white'/> : null;
    let rightArrow =
      this.state.currentIndex !== this.state.photos.length - 1 ? <ChevronRight view={view} nextImage={this.nextImage} color='white'/> : null;

    // if in default mode onclick should go to to expanded view
    // if already in expanded mode, click handler should toggle the zoomed mode
    let imageClickHandler = view === 'default' ? this.props.toggleExpandedView : this.toggleZoomView;

    // main image and thumbnail list
    let mainImage;
    let imageList;
    if (this.props.currentStyle.photos) {
      imageList = <ImageList view={view} currentImage={this.state.currentImage} updateMainImage={this.updateMainImage} photos={this.state.photos} currentIndex={this.state.currentIndex} next={this.nextImage} prev={this.prevImage}/>
      mainImage = <div className={`image-sub-container-${view}`}>
        {leftArrow}
        <img className={`image-main-${view}`} alt={this.state.currentImage.url} src={this.state.currentImage.url} onClick={imageClickHandler}></img>
        {rightArrow}
        {minMaxIcon}
        {imageList}
        </div>
    } else {
      mainImage = <div></div>
      imageList = <div></div>
    }

    // zoom view
    if (this.state.zoomView) {
      return (
        <div className='image-gallery-expanded'>
            <div id={`image-zoom-wrap`} onMouseMove={this.zoomImage} onMouseOver={this.zoomImage} onClick={this.toggleZoomView}>
              <img id={`image-main-zoom`} src={this.state.currentImage.url} ></img>
            </div>
        </div>
      );
    }

    return (
      <div className={`image-gallery-${view}`}>
        {mainImage}
      </div>
    );
  }
}

export default ImageGallery;