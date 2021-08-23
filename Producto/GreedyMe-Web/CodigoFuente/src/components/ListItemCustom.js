import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

function ListItemCustom(props) {
  const [color, setColor] = React.useState(false);

  React.useEffect(() => {
    if (props.seleccionado === props.elementIndex) {
      setColor(true);
    } else {
      setColor(false);
    }
  }, [props.seleccionado]);

  const handleClick = (e) => {
    e.preventDefault();
    props.setSeleccionado(props.elementIndex);
  };

  const styles = {
    display: color ? 'block' : 'none',
    ':hover': { display: 'block' },
  };

  const styleso = {
    display: color ? 'none' : 'block',
  };

  const fontstyles = {
    color: color ? '#f7941e' : '#868686',
  };

  const borderstyle = {
    borderLeft: color ? '5px solid #f7941e' : '5px solid #ececec',
  };

  return (
    <div
      id={props.id}
      className={props.className}
      onClick={handleClick}
      style={borderstyle}
    >
      <Link
        to={'/main/' + props.auth.uid + '/' + props.id}
        className="link"
        style={fontstyles}
      >
        <ListItem button>
          <ListItemIcon>
            <img
              width="22px"
              height="22px"
              src={props.src1}
              className="image-o"
              style={styleso}
            />
            <img
              width="22px"
              height="22px"
              src={props.src2}
              className="image-t"
              style={styles}
            />
          </ListItemIcon>

          <ListItemText primary={props.text} />
        </ListItem>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(ListItemCustom);
