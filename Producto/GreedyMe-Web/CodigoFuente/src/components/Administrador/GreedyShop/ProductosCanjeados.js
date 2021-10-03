import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../firebase/config';
//esta es la funcion que trae los datos, tipo crea un array trae todos las promociones
//y la va acumulando en el array
import _ from 'lodash';
import { format } from 'date-fns';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { esES } from '@material-ui/core/locale';

function ProductosCanjeados(props) {
  const theme = createMuiTheme(
    {
      palette: {
        primary: {
          main: '#4caf50',
        },
        secondary: {
          main: '#ff9100',
        },
      },
    },
    esES,
  );

  //Esta variable tiene una referencia a cada uno de los iconos usados en la tabla,
  //porque sino no los toma.
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => (
      <DeleteOutline {...props} ref={ref} />
    )),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => (
      <SaveAlt {...props} ref={ref} />
    )),
    Filter: forwardRef((props, ref) => (
      <FilterList {...props} ref={ref} />
    )),
    FirstPage: forwardRef((props, ref) => (
      <FirstPage {...props} ref={ref} />
    )),
    LastPage: forwardRef((props, ref) => (
      <LastPage {...props} ref={ref} />
    )),
    NextPage: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => (
      <Clear {...props} ref={ref} />
    )),
    Search: forwardRef((props, ref) => (
      <Search {...props} ref={ref} />
    )),
    SortArrow: forwardRef((props, ref) => (
      <ArrowUpward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => (
      <ViewColumn {...props} ref={ref} />
    )),
  };

  const [productosCanjeados, setProductosCanjeados] = React.useState(
    [],
  );

  React.useEffect(() => {
    const obtenerProductos = async () => {
      const firestore = firebase.firestore();
      try {
        const productos = await firestore
          .collection('productosCanjeadosGeneral')
          .orderBy('fecha')
          .get();
        const arrayProductos = productos.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const rows = [];
        arrayProductos.forEach((element) => {
          const formatoFecha = format(
            element.fecha.toDate(),
            'dd/MM/yyyy',
          );
          rows.push({
            apellido: element.apellidoUsuario,
            nombre: element.nombreUsuario,
            producto: element.nombreProducto,
            estado: element.estado,
            fecha: formatoFecha,
          });
        });
        setProductosCanjeados(rows);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductos();
  }, []);

  return (
    <div>
      <div className="prom-title-container">
        <h1>GreedyCanjes</h1>
      </div>
      <div className="contenedorTodo">
        <div className="cardPromo">
          <div className="cardContentePromo">
            <MuiThemeProvider theme={theme}>
              <MaterialTable
                title="Listado de productos canjeados"
                columns={[
                  {
                    title: 'Apellido',
                    field: 'apellido',
                  },
                  { title: 'Nombre', field: 'nombre' },
                  { title: 'Producto', field: 'producto' },
                  { title: 'Estado', field: 'estado' },
                  { title: 'Fecha', field: 'fecha', type: 'date' },
                ]}
                data={productosCanjeados}
                actions={[
                  {
                    tooltip: 'Eliminar filas seleccionadas',
                    icon: tableIcons.Delete,
                    onClick: (evt, data) =>
                      alert(
                        '¿Vas a eliminar estas ' +
                          data.length +
                          ' filas?',
                      ),
                  },
                ]}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setData([...dataUpdate]);

                        resolve();
                      }, 1000);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataDelete = [...data];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        setData([...dataDelete]);

                        resolve();
                      }, 1000);
                    }),
                }}
                icons={tableIcons}
                options={{
                  actionsColumnIndex: -1,
                  selection: true,
                  headerStyle: {
                    backgroundColor: '#fcd09f',
                  },
                  rowStyle: {
                    '&:nth-of-type(odd)': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  },
                }}
              />
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(ProductosCanjeados);
