import _ from "lodash";
export const formatoRubros = (usuarios) => {
    const grupos = _.groupBy(usuarios, n => n.rubro)
   
    return grupos
}

export const formatoSuscripciones = (usuarios) => {
    const grupos = _.groupBy(usuarios, n => n.tipoSuscripcion)
    return grupos
}