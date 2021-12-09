import React from "react";

const Context = React.createContext();

export class BackendStore extends React.Component {
  state = {
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
