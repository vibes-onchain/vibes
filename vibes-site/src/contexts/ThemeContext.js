import React from "react";

const ThemeContext = React.createContext();

const COLOR_SCHEMES = ["dark", "light"];

function getSystemColorScheme() {
  const QUERIES = {};
  for (let scheme of COLOR_SCHEMES) {
    const query = QUERIES.hasOwnProperty(scheme)
      ? QUERIES[scheme]
      : (QUERIES[scheme] = matchMedia(`(prefers-color-scheme: ${scheme})`));
    if (query.matches) return scheme;
  }
}

export class ThemeContextExtendedProvider extends React.Component {
  state = {
    theme: getSystemColorScheme() || "light",
  };

  setTheme = (theme) => {
    const removeThemes = COLOR_SCHEMES.filter((i) => i !== theme);
    for (const removeTheme of removeThemes) {
      document.body.classList.remove(`${removeTheme}-theme`);
    }
    document.body.classList.add(`${theme}-theme`);
    this.setState({ theme });
  };

  componentDidMount() {
    if (this.state.theme) {
      const theme = this.state.theme;
      document.body.classList.add(`${theme}-theme`);
    }
  }

  render() {
    return (
      <ThemeContext.Provider
        value={{
          ...this.state,
          setTheme: this.setTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContext;
