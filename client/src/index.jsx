import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
      // repos store 
    }

  }

 
  search (term) {
    // console.log('repose', this.state.repos)
    console.log(`${term} was searched`); 
    const self= this;
    $.ajax({
      url: "/repos/import",
      type: "POST", 
      data: term,
      contentType : "application/json",
      success: function (data) {
        console.log(data); 
        self.getData(); 
        console.log('success!'); 
      },
      error: function (error) {
        console.error('FAILED:', error );
      }
    })

  }

  getData() {
    var self = this;
    $.ajax({
      url: '/repos',
      type: "GET",
      success: function(data) {
        self.setState({
          repos: JSON.parse(data)
        })
        // console.log('::::', self.state.repos);
      },
      error: function (error) {
        console.error('FAILED:', error); 
      }
    }) 
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <button onClick={this.getData.bind(this)}>click me!</button>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));