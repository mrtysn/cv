import React from "react";
import { Container, Message, Header } from "semantic-ui-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Hide loading indicator on error
    document.body.classList.add('app-loaded');
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container text style={{ marginTop: "2em" }}>
          <Message negative>
            {/*
              A literal character rather than <Icon>. Semantic UI's icon
              component is half the vendored stylesheet plus 240 KB of icon
              fonts, and this was the only icon on the site, on a screen that
              renders only when the app has already crashed.
            */}
            <Message.Header>
              <span aria-hidden="true" style={{ marginRight: "0.4em" }}>
                ⚠
              </span>
              Oops! Something went wrong
            </Message.Header>
            <p>
              There was an error loading the CV. Please try:
            </p>
            <ul>
              <li>Refreshing the page</li>
              <li>Opening this link in your default browser instead of the in-app browser</li>
              <li>Checking your internet connection</li>
            </ul>
            {this.state.error && (
              <details style={{ marginTop: "1em" }}>
                <summary>Technical details</summary>
                <pre style={{ fontSize: "0.9em", marginTop: "0.5em" }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </Message>
          <Header as="h3" style={{ marginTop: "2em" }}>
            About This CV
          </Header>
          <p>
            This is the CV/Resume of Mert Yaşin. If you're having trouble viewing it,
            please try opening the link in your device's default web browser (Safari, Chrome, etc.)
            instead of an in-app browser.
          </p>
          <p>
            <a href={window.location.href} target="_blank" rel="noopener noreferrer">
              Open in external browser
            </a>
          </p>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
