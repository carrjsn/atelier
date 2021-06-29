import React from 'react';
import Spinner from './spinner.jsx';
import {BACKEND_URL} from '../app/app.jsx';

class UploadPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showImageModal: false,
      file: '',
      photoUrl: '',
      loading: false
    }
  }

  displayImageModal = () => {
    this.setState((prevState) => ({
      showImageModal: !prevState.showImageModal
    }))
  }

  handleFileChange = (e) => {
    this.setState({file: e.target.files[0]}, () => console.log('file', this.state))
  }

  sendFile = () => {
    let formData = new FormData();
    formData.append('imageFile', this.state.file);
    // console.log('formdata', formData.get('imageFile'));
    fetch(`${BACKEND_URL}/uploadImage`, {
      method: 'POST',
      body: formData
    })
    .then((resp) => resp.json())
    .then((url) => {
      // console.log('url in Upload Photot', url);
      this.props.uploadPhoto(url);
      this.setState({showImageModal:false, photoUrl: url, loading: false, file: ''}, () => console.log('loader state', this.state))
    })
    .catch((err) => {
      console.log('ERROR UPLOADING PHOTO', err)
    })
  }

  handleFileSubmission = (e) => {
    if (typeof this.state.file === 'string' || !this.state.file.type.includes('image')) {
      window.alert('Please choose an image file');
      return;
    }
    this.setState((prevState) => ({
      loading: true
    }), this.sendFile)
  }

  render () {
    return (
      <div>
        {
          this.props.photos.length >= 5 ? null : <button className='upload-photos-btn' type='button' onClick={this.displayImageModal}> Upload your photos </button>
        }

        {
          this.state.showImageModal ?
          <div className='upload-photos-modal'>
              <div className='upload-photos-modal-main'>
                <div className='heading'>
                  <h3> Upload A Photo</h3>
                  <button type='button' onClick={this.displayImageModal}>Close</button>
                </div>

                <div>
                  <label htmlFor='upload-photo'>Add Photo From Your Computer</label> <br />
                  <input type='file' name='upload-photo' id='upload-photo' onChange={this.handleFileChange} /> <br />
                </div>
                {
                  this.state.loading ? <Spinner /> :
                  <button className='upload-photo-submit' type='button' onClick={this.handleFileSubmission} style={{cursor: 'pointer'}}>  DONE </button>
                }
              </div>
          </div>
          : null
        }
      </div>
    );
  }
}

export default UploadPhotos;