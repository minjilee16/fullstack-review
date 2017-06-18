import React from 'react';
import RepoEach from './RepoEach.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    { props.repos.map( (repo) => {
     return <RepoEach repo={ repo } /> 
    })} 
    There are {props.repos.length} repos.
  </div>
)

// class RepoList extends React.Component {
//   constructor (props) {
//     super(props)
//   }
//   render() {
//     return(
//       <div>
//       <h4> Repo List Component </h4>
//       { this.props.repos.map( (repo) => {
//        return <RepoEach repo={ repo } /> 
//       }) } 
//       There are {this.props.repos.length} repos.
//     </div>
//     )
//   }
// }


export default RepoList;