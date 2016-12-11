import React from 'react';
import {bindAll} from 'lodash';
import $ from 'jquery';

const UploadButton = React.createClass({
  // propTypes: {
  //   drawing: React.PropTypes.string
  // },
  getInitialState: function(){
    return {
      data_uri: null,
      processing: false
    };
    bindAll(this, 'handleFile', 'handleSubmit');
  },

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });

    const promise = $.ajax({
      url: 'public/upload',
      type: "POST",
      data: {
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
      },
      dataType: 'json'
    });

    promise.done(function(data){
      _this.setState({
        processing: false,
        uploaded_uri: data.uri
      });
    });
  },

  handleFile(e){
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
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
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" accept="image/*" onChange={this.handleFile} />
            <input className='Button-upload' type="submit" value="Upload Image" />
          </form>
    </div>;
  }
});
export default UploadButton;