import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Notificaciones } from '../Notificaciones';
import Perfil from '../Perfil';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

export function NavBarSup({ appBar, seleccionado, setSeleccionado }) {
  return (
    <AppBar position="fixed" className={appBar}>
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
        <Perfil
          seleccionado={seleccionado}
          setSeleccionado={setSeleccionado}
        />
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavBarSup);
