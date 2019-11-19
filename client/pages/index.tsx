import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../src/components/Home/Home';

class Index extends Component {
  static getInitialProps({ store, isServer, pathname, query }) {
    // component will be able to read from store's state when rendered
    store.dispatch({ type: 'FOO', payload: 'foo' });
  }
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default connect(state => state)(Index);
