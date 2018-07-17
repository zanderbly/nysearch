import React, { Component } from 'react';
import Banner from './components/banner';
import MainWrapper from './components/mainWrapper';
import SearchBox from './components/searchBox';
import Results from './components/results';
import Saved from './components/saved';
import Wrapper from './components/wrapper';
import './body.css';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Wrapper> */}
          <Banner/>
          <MainWrapper>
            <SearchBox/>
            <Results/>
            <Saved/>
          </MainWrapper>
        {/* </Wrapper> */}
      </div>
    );
  }
}

export default App;
