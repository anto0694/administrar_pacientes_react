import React, {Fragment , useState}from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de citas

const [cita, actualizarCita] = useState ({ // inicializa con un objeto vacio
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:''
})

//Creamos un nuevo State para la validacion de los campos

const [error, actualizarError] = useState(false)

//Funcion que se ejecuta cada vez que el usuario escribe/modifica en un input
const actualizarState = e=>{
actualizarCita({
    ...cita,  // hacer copia del state anterior y sobreescribirle lo nuevo
    [e.target.name]: e.target.value
})
}    
// extraer los valores del objeto

const {mascota, propietario,fecha,hora,sintomas} = cita;

// funcion que se ejecuta cuando el usario envia formulario (onSubmit)

const submitCita = e =>{
    e.preventDefault(); // Para prevenir la accion que hace por defecto, GET


// Validar campos
if (mascota.trim() === ''|| propietario.trim() === ''|| fecha.trim() === ''|| hora.trim() === ''|| sintomas.trim() === '' ){
    actualizarError(true);
    return;
}
//Eliminar mensaje previo
actualizarError(false);

// Asignar ID
cita.id= uuid(); // generamos un id aleatorio

// Crear cita (colocarla en el state ) 
crearCita(cita);

// Reiniciar Form
actualizarCita({
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:''
})
}

    return (  
        <Fragment>
            <h2>Crear Cita</h2>
            {error 
            ?<p className="alerta-error">Todos los campos son obligatorios</p>
            :null}

            <form
            onSubmit={submitCita}>
                <label>Nombre Mascota</label>
              <input
              type = "text"
              name = "mascota"
              className= "u-full-width"
              placeholder="Nombre Mascota"
              onChange={actualizarState} // cuando haya un cambio en el input se llama a la funcion actulizarState eso hace onChange, se jeccuta un evento "e"
              value={mascota} // para reiniciar el formulario
              >
              </input>
              <label>Nombre dueño</label>
              <input
              type = "text"
              name = "propietario"
              className= "u-full-width"
              placeholder="Nombre dueño de Mascota"
              onChange={actualizarState}
              value={propietario}
              >
              </input>
              <label>Fecha</label>
              <input
              type = "date"
              name = "fecha"
              className= "u-full-width"
              onChange={actualizarState}
              value={fecha}
              >
              </input>
              <label>Hora</label>
              <input
              type = "time"
              name = "hora"
              className= "u-full-width"
              onChange={actualizarState}
              value={hora}
              >
              </input>
              <label>Sintomas</label>
              <textarea
                  className= "u-full-width"
                  name= "sintomas"
                  onChange={actualizarState}
                  value={sintomas}
            ></textarea>

            <button
            type= "submit"
            className= "u-full-widht button-primary"
           >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes={
    crearCita: PropTypes.func.isRequired    
}
 
export default Formulario;