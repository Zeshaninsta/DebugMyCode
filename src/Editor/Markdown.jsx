import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: "",
    };
    this.reactQuillRef = null;
  }

  handleChange = (html) => {
    this.setState({ editorHtml: html }, () => {
      this.props.onChange(this.state.editorHtml);
    });
  };

  modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video", "code-block"],
        ["clean"],
      ],
    },
  };

  render() {
    return (
      <div className="ql-editor w-[80%] outline-none">
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme={"snow"}
          onChange={this.handleChange}
          modules={this.modules}
          value={this.state.editorHtml}
          placeholder={this.props.placeholder}
          className=" outline-none border border-slate-700 text-white font-rubik focus:border-blue-500 resize-none w-full"
        />
      </div>
    );
  }
}

export default Editor;
