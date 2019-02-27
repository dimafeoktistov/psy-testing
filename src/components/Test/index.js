import React from 'react'
import { connect } from 'react-redux'
//import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link, Route, Redirect, Switch } from 'react-router-dom';

const Test = (props) => {
  const { auth } = props;
  if (!auth.uid) return <Redirect to='/signin' />
  return (
    <div className="container">
      <Link to='/test/sample'>Sample</Link>
      <Link to='/test/shulte'>shulte Start</Link>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps)
)(Test)