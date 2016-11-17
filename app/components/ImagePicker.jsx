import React from 'react';
import Option from './Option';

import { FileUpload } from 'redux-file-upload';

// import {Uploader} from 'react-file-upload';
// import {DropUploader} from 'react-file-upload';
// import style from 'react-file-upload/css/upload.less'

export default React.createClass({
  propTypes: {
    images: React.PropTypes.arrayOf(React.PropTypes.shape({ url: React.PropTypes.string })).isRequired,
    selected: React.PropTypes.shape({ url: React.PropTypes.string }),
    onSelect: React.PropTypes.func
  },
 
  handleSelect(image) {
    this.props.onSelect && this.props.onSelect(image);
  },

  render() {
    const selected = this.props.selected || {};
    return <div>
      <div className="ImagePicker">
        {this.props.images.map(image => {
          const sel = image.url === selected.url;
          const className = 'ImagePicker-image' + (sel ? ' ImagePicker-image--selected' : '');
          const imageUrl = image.url + "&w=364";

          return <div className={className} onClick={this.handleSelect.bind(this, image)} key={image.url}>
            <Option selected={sel} borderStyle="thick-transparent">
                <img src={imageUrl}/ >
            </Option>
          </div>;
        })}
      </div>

      <div className="fileUpload Button-upload">
          <span>Upload Image</span>
          <input type="file" ref="file" className="upload" accept="image/*" onChange={this.handleFile} />
      </div>

      <FileUpload
        allowedFileTypes={['jpg', 'pdf']}
        data={{ type: 'picture' }}
        dropzoneId="fileUpload"
        url="https:/url.org/api/docs/upload"
      >
        <button>
          Click or drag here
        </button>
      </FileUpload>
    </div>;
  }
});
