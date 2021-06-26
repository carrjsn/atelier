import React from 'react';
import Stars from '../stars/stars.jsx';
import SelectCharacteristic from './selectCharacteristic.jsx';
import UploadPhotos from './uploadPhotos.jsx';
import {validateEmail} from '../../../../helper/reviewsHelper.js';
import {BACKEND_URL} from '../app/app.jsx';

class AddReview extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      showModal: false,
      rating: 0,
      recommend: '',
      summary: '',
      body: '',
      nickname: '',
      email: '',
      characteristics: {},
      photos: []
    };
  }

  displayModal = () => {
    this.setState((prevState) => {
      return {
        showModal: !prevState.showModal
      }
    })
  }

  starsClicked = (e) => {
    // console.log('starsclicked', e.target.dataset.starnumber)
    this.setState((prevState) => {
      let rating;
      let stars = e.target.dataset.starnumber
      console.log('stars', stars)
      if (stars === undefined) {
        rating = prevState.rating
      } else {
        rating = Number(stars)
      }

      return {
        ...prevState,
        rating
      }
    })
  }

  onInputChange = (e) => {
    console.log('e', e.target.name, e.target.value);
    if (e.target.name === undefined || e.target.value === undefined) {
      return
    }
    let value = e.target.value.trim();
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: value
    }), () => console.log(`state after updating ${e.target.name}`, this.state))
  }

  onCharacteristicChange = (e, id) => {
    // console.log('e', e.target.value);
    if (e.target.value === undefined) {
      return;
    }
    this.setState((prevState) => ({
      characteristics: {
        ...prevState.characteristics,
        [id]: Number(e.target.value)
      }
    }), () => console.log('state after chnging characteristic', this.state))
  }

  uploadPhoto = (url) => {
    console.log('url in Add review', url)
    this.setState((prevState) => {
      return {
        ...prevState,
        photos: [...prevState.photos, url]
      }
    }, () => console.log('state after uploading a photo', this.state))
  }

  removePhoto = (url) => {
    let filteredPhotos = this.state.photos.filter((photo) => url !== photo);
    this.setState((prevState) => ({
      photos: [...filteredPhotos]
    }), () => console.log('state after removing a photo', this.state))
  }

  resetState = () => {
    this.setState({
      showModal: false,
      rating: 0,
      recommend: '',
      summary: '',
      body: '',
      nickname: '',
      email: '',
      characteristics: {},
      photos: []
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //Any mandatory fields are not blank: Recommend, body, name and email are taken care of by input element validation.
    let { rating, recommend, summary, body, nickname, email, characteristics, photos } = this.state;

    //Body length validation
    if (body.length < 50 || body.length > 1000) {
      window.alert('Body must be between 50 - 1000 characters');
      return;
    }

    //Email validation
    if (!validateEmail(email)) {
      window.alert(`You must enter the following: \n Email in a correct format`)
      return;
    }

    //RATING validation
    if (rating === 0) {
      window.alert(`You must enter the following: \n Overall Rating`)
      return;
    }

    //Characteristics validation
    let userSelectedCharacteristicIds = Object.keys(characteristics);

    for (let i = 0; i < this.props.characteristics.length; i++) {
      if (userSelectedCharacteristicIds.indexOf(String(this.props.characteristics[i].id)) === -1) {
        window.alert(`You must enter the following: \n Characteristics`)
        return;
      }
    }

    //Photos validation: The images selected are invalid or unable to be uploaded.

    //Transform data according to required format
    let finalData = {};
    finalData.product_id = Number(this.props.productId);
    finalData.rating = rating;
    finalData.recommend = recommend === 'yes' ? true : false;
    finalData.summary = summary;
    finalData.body = body;
    finalData.name = nickname;
    finalData.email = email;
    finalData.characteristics = characteristics;
    finalData.photos = photos;

    fetch (`${BACKEND_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalData)
    })
    .then((resp) => {
      // console.log('resp', resp)
      if (resp.status === 201) {
        window.alert('SUCCESSFULLY CREATED A NEW REVIEW');
        // return this.displayModal()
      } else {
        window.alert('THERE WAS AN ERROR WHILE ADDING YOUR REVIEW. PLEASE TRY AGAIN LATER.')
      }
      this.resetState();
    })
    .catch((err) => {
      console.log('ERROR CREATING A NEW REVIEW', err);
    })
  }

  render () {
    return (
      <div>
        <button type='button' onClick={this.displayModal}> ADD A REVIEW </button>
        {
          this.state.showModal ?
            <form className='add-review-modal' onSubmit={this.handleSubmit}>
              <div className='add-review-modal-main'>
                <h3> Write Your Review </h3>
                <h4> About {this.props.productName} </h4>
                <div className='add-review-rating'>
                  Overall Rating *
                  <div className='description' >
                    <div className='stars' onClick={this.starsClicked}>
                      <Stars size={18} rating={this.state.rating} />
                    </div>
                    {
                      ['Poor', 'Fair', 'Average', 'Good', 'Great'][this.state.rating - 1]
                    }
                  </div>
                </div>

                <div className='add-review-recommend' onClick={this.onInputChange}>
                  Do you recommend this product? *
                  <input type='radio' name='recommend' id='yes' value='yes' required/>
                  <label htmlFor='yes'> YES </label>
                  <input type='radio' name='recommend' id='no' value='no' required/>
                  <label htmlFor='no'> NO </label>
                </div>

                <div className='add-review-characteristics'>
                  Characteristics *
                  {
                    this.props.characteristics.map((item, idx) => {
                      return <SelectCharacteristic key={idx} characteristics={this.state.characteristics} characteristicName={item.name} characteristicId={item.id} onCharacteristicChange={this.onCharacteristicChange}/>
                    })
                  }
                </div>

                <div className='add-review-summary'>
                  <label htmlFor='summary'> Review summary </label>
                  <input type='text' id='summary' name='summary' maxLength={60} placeholder='Example: Best purchase ever!' size={80} onChange={this.onInputChange}/>
                </div>

                <div className='add-review-body'>
                  <label htmlFor='body'> Review body * </label>
                  <textarea id='body' name='body' cols={80} minLength={50} maxLength={1000} placeholder='Why did you like the product or not?' onChange={this.onInputChange} required>
                  </textarea>
                  <p>Minimum required characters left: { this.state.body.length >= 50 ? 'Minimum reached' : (50 - this.state.body.length) } </p>
                </div>

                <div className='add-review-photos'>
                  <UploadPhotos photos={this.state.photos} uploadPhoto={this.uploadPhoto}/>
                  <div className='list'>
                    {
                      this.state.photos.map((photoUrl, idx) => <img key={idx} src={photoUrl} height='60px' width='60px' onClick={() => this.removePhoto(photoUrl)}/> )
                    }
                  </div>
                </div>

                <div className='add-review-nickname'>
                  <label htmlFor='nickname'> What is your nickname *</label>
                  <input type='text' id='nickname' name='nickname' maxLength={60} placeholder='Example: jackson11!' onChange={this.onInputChange} required />
                  <p style={{marginTop: '0'}}>For privacy reasons, do not use your full name or email address</p>
                </div>

                <div className='add-review-email'>
                  <label htmlFor='email'> Your email *</label>
                  <input type='email' id='email' name='email' maxLength={60} placeholder='Example: jackson11@email.com' onChange={this.onInputChange} required />
                  <p style={{marginTop: '0'}}>For authentication reasons, you will not be emailed</p>
                </div>

                <div className='add-review-submit'>
                  <button className='submit' type='submit' style={{cursor: 'pointer'}}>  SUBMIT REVIEW </button>
                  <button className='close' type='button' onClick={this.resetState} style={{cursor: 'pointer'}}>  CLOSE </button>
                </div>

              </div>
            </form> :
            null
        }
      </div>
    );
  }
};

export default AddReview;