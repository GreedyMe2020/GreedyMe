import _ from "lodash";
export const formatoRubros = (usuarios) => {
    const grupos = _.groupBy(usuarios, n => n.rubro)

    return grupos
}

export const formatoSuscripciones = (usuarios) => {
    const grupos = _.groupBy(usuarios, n => n.tipoSuscripcion)
    return grupos
}


export const formatoRubrosFiltro = (usuarios, fechaInicio, fechaFin) => {
    const usuariosFiltrados = [];
    usuarios.forEach(usuario => {
        if (usuario.fechaCreacion.toDate() <= fechaFin &&
            usuario.fechaCreacion.toDate() >= fechaInicio) {
            usuariosFiltrados.push(usuario)
        }
    });
    const grupos = _.groupBy(usuariosFiltrados, n => n.rubro)

    return grupos
}

export const formatoSuscripcionesFiltro = (usuarios, fechaInicio, fechaFin) => {
    const usuariosFiltrados2 = [];
    usuarios.forEach(usuario => {
        if (usuario.fechaCreacion.toDate() <= fechaFin &&
            usuario.fechaCreacion.toDate() >= fechaInicio) {
            usuariosFiltrados2.push(usuario);
        }
    });
    const grupos = _.groupBy(usuariosFiltrados2, n => n.tipoSuscripcion)

    return grupos
}

