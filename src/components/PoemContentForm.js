import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactbulma";

const contetLen = content => content.split(/\r\n|\r|\n/g).length;

class PoemContetForm extends Component {
  render() {
    const {
      title,
      content,
      handleTitleChange,
      handleContentChange,
      handleSubmit,
      onToggleEditable,
      hasPoem
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <input
          className="poem-title-input"
          type="text"
          placeholder="Type your poem title here"
          value={title}
          onChange={handleTitleChange}
          maxLength={50}
          required={true}
        />
        <textarea
          className="poem-content-input"
          value={content}
          placeholder="Type your poem"
          onChange={handleContentChange}
          required={true}
          rows={
            content && contetLen(content) > 15 ? contetLen(content) + 2 : 15
          }
        />
        <br />
        <Button className="is-primary" type="submit" value="Submit">
          Done!
        </Button>
        {hasPoem ? <Button onClick={onToggleEditable}>Cancel</Button> : ""}
      </form>
    );
  }
}

PoemContetForm.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  handleTitleChange: PropTypes.func,
  handleContentChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  onToggleEditable: PropTypes.func,
  hasPoem: PropTypes.bool
};

export default PoemContetForm;
