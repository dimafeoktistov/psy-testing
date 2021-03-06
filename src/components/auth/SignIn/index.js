import React, { useState } from "react";
import { TextField, makeStyles, Button, Card, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import { signIn } from "../../../actions/authActions";

const useStyles = makeStyles(theme => ({
  container: {
    width: 600,
    padding: 15,
    margin: "300px auto",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  form: {
    flexDirection: "column",
    display: "flex"
  },
  formItem: {
    marginBottom: 15
  }
}));

const SignIn = (props) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.signIn(formValues);
  };
  const classes = useStyles();
  const { authError, auth } = props;
  if (auth.uid) {
    return <Redirect to="/" />;
  }
  return (
    <Card className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h5" className="grey-text text-darken-3">Войти</Typography>
        <TextField
          id="email"
          type="email"
          name="email"
          placeholder="Введите email"
          label="Email адрес"
          required
          onChange={handleChange}
          value={formValues.email}
          className={classes.formItem}
        />
        <TextField
          id="password"
          type="password"
          name="password"
          placeholder="Введите пароль"
          label="Пароль"
          required
          onChange={handleChange}
          value={formValues.password}
          className={classes.formItem}
        />
        <Grid>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginRight: 20,  backgroundColor: '#d8f0de', color: 'black' }}
          >
            Войти
          </Button>
          {authError && <p>{authError}</p>}
        </Grid>
      </form>
      <br/>
      <p>Нет аккаунта? <NavLink to='/signup' className={props.className}>Зарегистрируйся</NavLink></p>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
