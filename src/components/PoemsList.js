import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactbulma";

class PoemsList extends Component {
  render() {
    const { poems, togglePreview, deletePoem, createNewPoem } = this.props;
    const elements = poems.map(poem => (
      <li className="poem-item" key={poem.id}>
        <div
          className="poem-item-title"
          title={poem.title}
          onClick={() => togglePreview(poem.id)}
        >
          {poem.title}
        </div>
        <Button
          className="poem-delete-buttom"
          onClick={() => deletePoem(poem.id)}
        >
          Delete
        </Button>
      </li>
    ));
    return (
      <div>
        <div className="poem-list-container">
          {poems.length > 0 ? (
            <ul>{elements}</ul>
          ) : (
            <div className="poem-no-item">
              You don't have any poems<br />
              Let's create one :-)
            </div>
          )}
        </div>

        <Button className="is-danger" onClick={createNewPoem}>
          Create New
        </Button>
      </div>
    );
  }
}

PoemsList.propTypes = {
  poems: PropTypes.array,
  togglePreview: PropTypes.func,
  deletePoem: PropTypes.func,
  createNewPoem: PropTypes.func
};

export default PoemsList;
