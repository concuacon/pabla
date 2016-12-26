import React from 'react';
// import {bindAll} from 'lodash';
// import $ from 'jquery';
var request = require('superagent');
import _ from 'lodash';
import fetch from 'isomorphic-fetch';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
var jsonfile = require('jsonfile')
 
var file1 = '/tmp/data.json'
const UploadButton = React.createClass({
  // propTypes: {
  //   drawing: React.PropTypes.string
  // },
  getInitialState: function(){
    return {
      data_uri: null,
      processing: false
    };
    // bindAll(this, 'handleFile', 'handleSubmit');
  },

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });
    
    const promise = $.ajax({
      url: '/public/upload',
      type: "POST",
      data: {
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
      },
      dataType: 'json',
      success: function(data) {
        console.log(data);
      }.bind(this)
    });
    
    promise.done(function(data){
      console.log("done",data);
      _this.setState({
        processing: false,
        uploaded_uri: data.uri
      });
    });
  },
  
  handleFile(e, callback){
    
var obj = {name: 'JP'}
 
writeFileSync(file1, obj)
    const reader = new FileReader();
    const file = e.target.files[0];
    // console.log("upload");
    console.log(e.target.files[0]);
    reader.onload = (upload) => {
      // console.log(upload.target.result);
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type,
        file: file
      });
    };
    
    reader.readAsDataURL(file);
  },

  render() {
    let processing;
    let uploaded;

    if (this.state.processing) {
      processing = "Processing image, hang tight";
    }

    return <div>
      <form action="/public/upload" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" accept="image/*" onChange={this.handleFile} />
            <input className='Button-upload' type="submit" value="Upload Image" />
          </form>
    </div>;
  }
});

export default UploadButton;