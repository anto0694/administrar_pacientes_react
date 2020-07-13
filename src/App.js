import React , {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {
//Citas en Local Storage
let citasIniciales = JSON.parse(localStorage.getItem('citas')); // localstoge almacena strings, JSON.parse convierte el arreglo en strings
if(!citasIniciales){ // sino hay citas iniciales
  citasIniciales=[]
}
//Arreglo de citas
const [citas, guardarCitas]= useState(citasIniciales);


// Use Efect para realizar ciertas operaciones cuando el state cambia
// Se ejecuta cuando el componente esta listo o cuando ocurre una actualizacion en un state
useEffect(()=>{
if (citasIniciales){
 localStorage.setItem('citas',JSON.stringify(citas));
} else{
localStorage.setItem('citas',JSON.stringify([]));
}
},[citas,citasIniciales]);
  

  // Funcion que toma las citas actuales y las guarda

  const crearCita = (cita)=>{
    guardarCitas ([...citas, cita])
  }

  //Eliminar una cita del arreglo de citas por su id/ o hacemos aca ya que en el app tenemos el state de citas
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita=> cita.id !== id);
    guardarCitas(nuevasCitas);
  }
  //Mensaje condicional
const titulo = citas.length ===0 ?'No hay citas': 'Administrar tus citas'


  return (
    <Fragment>
   <h1>Administrador de pacientes</h1>
   <div className="container">
    <div className = "row">
     <div className = "one-half column">
        <Formulario
          crearCita = {crearCita}/>
     </div>
     <div className= "one-half column">  
     <h2>{titulo}</h2>
        {citas.map(cita=>(
          <Cita
          key= {cita.id}
          cita= {cita}
          eliminarCita={eliminarCita}
          />
        ))}
 
     </div>
   </div>
   </div>
   </Fragment>
  );
}

export default App;

//Linea 27, hacemos un map para pasar una cita en particular al compoente