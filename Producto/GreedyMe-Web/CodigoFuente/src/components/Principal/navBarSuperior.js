import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Notificaciones } from '../Notificaciones';
import Perfil from '../Perfil';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

export function NavBarSup(props) {
  return (
    <AppBar position="fixed" className={props.appBar}>
      <Toolbar className="nav-container">
        <div id="titulo">
          <Link
            to={'/'}
            className="link subtitulo"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <h1 className="gre">gre</h1>
            <h1 className="edy">edy</h1>
            <h1 className="me">me</h1>
          </Link>
        </div>

        {/* <Notificaciones /> */}
        <p className="greetings">¡Hola, {props.profile.nombreComercio}!</p>
        <Perfil
          seleccionado={props.seleccionado}
          setSeleccionado={props.setSeleccionado}
        />
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavBarSup);
