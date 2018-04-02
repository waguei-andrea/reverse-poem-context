import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PoemContentForm from "./components/PoemContentForm.js";
import PoemContent from "./components/PoemContent.js";
import PoemsList from "./components/PoemsList";
import { PoemProvider, PoemConsumer } from "./context/poemContext";
import { CSSTransitionGroup } from "react-transition-group";

//import { Button } from "reactbulma";

class App extends Component {
  render() {
    return (
      <PoemProvider>
        <PoemConsumer>
          {poemsProp => (
            <div className="App">
              {/* <div className="App-warn">
                <div className="App-warn-container">
                  Are you sure to delete this poem?
                  <div>
                    <Button>Sure</Button>
                    <Button>Cancel</Button>
                  </div>
                </div>
              </div> */}

              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="App-title-container">
                  <h1 className="App-title">Reverse Poem</h1>
                  <h2 className="App-tagline">
                    Create your reverse poem and have fun!
                  </h2>
                </div>
              </header>
              <div className="App-bg" />

              <CSSTransitionGroup
                transitionName="poem"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
              >
                <div className="App-content">
                  {poemsProp.listMode ? (
                    ""
                  ) : (
                    <div className="back-button" onClick={poemsProp.goToList}>
                      ⬅Back to main
                    </div>
                  )}
                  <div className="App-content-container">
                    {poemsProp.listMode ? (
                      <PoemsList {...poemsProp} />
                    ) : poemsProp.editable ? (
                      <PoemContentForm {...poemsProp} />
                    ) : (
                      <PoemContent {...poemsProp} />
                    )}
                  </div>
                </div>
              </CSSTransitionGroup>
            </div>
          )}
        </PoemConsumer>
      </PoemProvider>
    );
  }
}

export default App;
