import React from 'react';
import {BACKEND_URL} from '../app/app.jsx';

const WithTracking = (WrappedComponent, widget) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    onWrappedComponentClick = (e) => {
      // console.log('wrapped component event', e);
      let interactionTime = new Date().toLocaleString('en-US', {hour12:false});

      let el = e.target.nodeName;
      let elClassname = e.target.className;
      let element = `${el} ${elClassname}`;

      let interactionObj = {
        element,
        widget,
        time: interactionTime
      }
      // console.log('interactionObj', interactionObj);

      fetch(`${BACKEND_URL}/interactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interactionObj)
      })
      .then((resp) => {
        console.log('SUCCESSFULLY POSTED INTERACTION', resp);
      })
      .catch((err) => {
        console.log('ERROR CREATING INTERACTION', err);
      })
    }

    render () {
      return (
        <WrappedComponent onWrappedComponentClick={this.onWrappedComponentClick} {...this.props} />
      );
    }
  };
};

export default WithTracking;