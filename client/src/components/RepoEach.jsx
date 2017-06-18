import React from 'react';

const RepoEach = (props) => (
  <div>
    {console.log('props.repo',props.repo)}
    {props.repo.full_name}
  </div>
)

export default RepoEach;