import React from 'react';

export default React.createClass({
  // propTypes: {
  //   drawing: React.PropTypes.string
  // },

  handleUpload(e) {
    const uri = this.props.drawing;
    const link = e.target;
    link.href = uri;
    // link.click();
  },

  render() {
    return <div>
      <div className="fileUpload Button-upload">
          <span>Upload Image</span>
          <input type="file" ref="file" className="upload" accept="image/*" onChange={this.handleFile} />
      </div>
    </div>;
  }
});
