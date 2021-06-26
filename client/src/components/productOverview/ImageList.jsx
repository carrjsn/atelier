import React from 'react';
import ImageThumbnail from './ImageThumbnail.jsx';
import Circle from './icons/Circle.jsx';
import ArrowDown from './icons/ArrowDown.jsx';
import ArrowUp from './icons/ArrowUp.jsx';

class ImageList extends React.Component {
  constructor(props) {
    super(props);

    // this.props.photos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    // keep track of current selected index for image thumbnail - ALREADY TRACKING in parent component, just use as props
    // this.props.currentIndex

    // keep track of of the current 7 thumbnails displayed?

    // also need to use updateMainImage when arrow is clicked

    // if right arrow is clicked on main image and currently selected is last thumbnail moveDown() must be called
    // if left arrow is clicked on main image and currently selected is first thumbnail moveUp() must be called


    this.state = {
      // will have to adjust something here for 'start' when current index is out of 0-7 range on rendering
      start: 0,
      end: 7
      // end: this.props.photos.length > 7 ? 6 : this.props.photos.length,
    }

    // this.props.photos.length > 7 ? 6 : this.props.photots.length,

  }

  // methods
  componentDidUpdate() {
    if (this.props.currentIndex > this.state.end - 1) {
      this.moveDown();
    }
    if (this.props.currentIndex < this.state.start) {
      this.moveUp();
    }
  }

  moveDown() {
    // on click down arrow
    // no need to worry about the edge cases, will handle that in the render function

    // if currently selected index is the top most image thumbnail
    // scrolling down should update the main image to be the next index over
    // set this as the callback in setState to activate

    if (this.props.currentIndex === this.state.start) {
      this.props.next()
    }
    // bug: this is using an update start when calling next()

    // always change the range in state
    this.setState((prevState) => {
      console.log('something', this.state);
      return {
        start: prevState.start + 1,
        end: prevState.end + 1
      }
    }, () => console.log(this.state));
  }

  moveUp() {
    // on click up arrow
    // no need to worry about the edge cases, will handle that in the render function

    // if currently selected index is the bottom most image thumbnail
    // scrolling up should update the main image to be the prev index in the array
    // set this as the callback in setState to activate
    if (this.props.currentIndex === this.state.end - 1) {
      this.props.prev();
    }

    // always change the range in state
    this.setState((prevState) => {
      return {
        start: prevState.start - 1,
        end: prevState.end - 1
      }
    });

  }


  render() {

    // add down button here on condition that there are more thumbanils below to be displayed
    let downStatus = this.state.end < this.props.photos.length ? 'visible' : 'hidden';
    // add up button on condition that there are more thumbnails above to show
    let upStatus = this.state.start > 0 ? 'visible' : 'hidden';

    // only map and render the photos in the current range mangaged in state, groups of 7
    let thumbnailList = this.props.photos.slice(this.state.start, this.state.end);

    if (this.props.view === 'default') {
      return (
        <div className='image-list-default'>
          <ArrowUp showHide={upStatus} moveUp={this.moveUp.bind(this)} />
          {thumbnailList.map((photo, idx) => <ImageThumbnail currentImage={this.props.currentImage} updateMainImage={this.props.updateMainImage} thumbnail={photo.thumbnail_url} photoNumber={idx} url={photo.url} key={idx}/>)}
          <ArrowDown showHide={downStatus} moveDown={this.moveDown.bind(this)} />
        </div>
      )
    } else {
      // need to address how to handle scrolling in expanded view
      return (
        <div className='image-list-expanded'>
          {this.props.photos.map((photo, idx) => <Circle currentImage={this.props.currentImage} updateMainImage={this.props.updateMainImage} thumbnail={photo.thumbnail_url} key={idx} />)}
        </div>
      )
    }

  }
}







export default ImageList;