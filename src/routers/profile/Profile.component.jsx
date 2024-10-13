import React from 'react';
import Card from '../../components/card/Card.Component'
function Profiles(props) {
  const user = props.User
  return (
    <>
      <Card User={user}></Card>
    </>
  )
}

export default Profiles;