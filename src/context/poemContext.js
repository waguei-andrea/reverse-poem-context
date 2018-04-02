import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export const PoemContext = React.createContext(
  {} // default value
);

export class PoemProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      poems: props.poems || [],
      editid: props.editid || null,
      title: props.title || "",
      content: props.content || "",
      editable: false,
      hasPoem: false,
      listMode: true,
      handleContentChange: this.handleContentChange.bind(this),
      handleTitleChange: this.handleTitleChange.bind(this),
      toggleEditable: this.toggleEditable.bind(this),
      handleSubmit: this.handleSubmit.bind(this),
      goToList: this.goToList.bind(this),
      togglePreview: this.togglePreview.bind(this),
      createNewPoem: this.createNewPoem.bind(this),
      deletePoem: this.deletePoem.bind(this)
    };
  }

  static propTypes = {
    children: PropTypes.any
  };

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  toggleEditable(id) {
    const target = this.state.poems.find(poem => poem.id === id);
    this.setState({
      editid: id,
      title: target.title,
      content: target.content,
      listMode: false,
      editable: !this.state.editable,
      hasPoem: true
    });
    window.scrollTo(0, 0);
  }

  togglePreview(id) {
    const target = this.state.poems.find(poem => poem.id === id);
    if (target) {
      this.setState({
        editid: id,
        title: target.title,
        content: target.content,
        listMode: false,
        editable: false
      });
    }
  }

  createNewPoem() {
    this.setState({
      editid: null,
      title: "",
      content: "",
      listMode: false,
      editable: true,
      hasPoem: false
    });
  }

  deletePoem(id) {
    const idx = this.state.poems.findIndex(poem => poem.id === id);
    if (idx !== -1) this.state.poems.splice(idx, 1);
    this.setState({
      poems: this.state.poems
    });
  }

  goToList() {
    this.setState({
      listMode: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!_.isNull(this.state.editid)) {
      //edit
      const target = this.state.poems.find(
        poem => poem.id === this.state.editid
      );
      if (target) {
        target.title = this.state.title;
        target.content = this.state.content;
      }
      this.setState({
        poems: this.state.poems,
        editable: !this.state.editable
      });
    } else {
      //create new
      const id = this.state.poems.length
        ? this.state.poems[this.state.poems.length - 1].id + 1
        : 0;
      this.state.poems.push({
        id: id,
        title: this.state.title,
        content: this.state.content,
        hasPoem: true
      });
      this.setState({
        poems: this.state.poems,
        editable: !this.state.editable,
        editid: id
      });
    }
  }

  render() {
    return (
      <PoemContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </PoemContext.Provider>
    );
  }
}

export const PoemConsumer = PoemContext.Consumer;

export function withPoem(Component) {
  return function PoemedComponent(props) {
    return (
      <PoemContext.Consumer>
        {poemsProp => <Component {...props} poemsProp={poemsProp} />}
      </PoemContext.Consumer>
    );
  };
}
