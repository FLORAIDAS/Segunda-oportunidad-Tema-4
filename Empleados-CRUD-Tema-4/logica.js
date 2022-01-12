document.getElementById("formulario").addEventListener("submit",crear);

function crear(e){
numero = document.getElementById("Numero").value;
nombre = document.getElementById("Nombre").value;
oficina = document.getElementById("Oficina").value;
sueldo = document.getElementById("Sueldo").value;

let empleado = {
numero,
nombre,
oficina,
sueldo
}

if(localStorage.getItem("Datos") === null){
  let empleados = [];
  empleados.push(empleado);
  localStorage.setItem("Datos", JSON.stringify(empleados));
}else{
   let empleados = JSON.parse(localStorage.getItem("Datos"));
   empleados.push(empleado);
   localStorage.setItem("Datos",JSON.stringify(empleados));
}
leer();
document.getElementById("formulario").reset();
alert("Ingresado correctamente");
e.preventDefault();
}

function leer(){
    let empleados = JSON.parse(localStorage.getItem("Datos"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i < empleados.length; i++){
       let numero = empleados[i].numero
       let nombre = empleados[i].nombre
       let oficina = empleados[i].oficina
       let sueldo = empleados[i].sueldo

       document.getElementById("tbody").innerHTML +=
      `<tr>
            <td>${numero}</td>
            <td>${nombre}</td>
            <td>${oficina}</td>
            <td>${sueldo}</td>
            <td> <button class="eliminar" onClick ="eliminar('${numero}')"> Eliminar </button> </td>
            <td> <button class="editar" onClick ="editar('${numero}')"> Editar </button> </td>
       </tr>`
    }
}

function editar(numero){
let empleados =JSON.parse(localStorage.getItem("Datos"));
for (let i=0; i < empleados.length; i++){
    if(empleados[i].numero === numero){
        document.getElementById("contenedor").innerHTML =
        `<tr>
        <td>
            <div>
                <h2> Editar empleado </h2>
              </div>
            <form id="formulario" autocomplete="off">
                <div>
                    <label for="Numero"> Numero </label>
                    <input type="text" name="NumeroAl" required="" pattern="[0-9]+" id="newNumero" placeholder="${empleados[i].numero}">
                </div>
                <div>
                    <label for="Nombre"> Nombre  </label>
                    <input type="text" name="Nombre" required="" pattern="[a-z A-Z]+"  id="newNombre" placeholder="${empleados[i].nombre}">
                </div>
                <div>
                    <label for="Oficina"> Oficina </label>
                    <input minlength="3" maxlength="3" type="text" name="Oficina" required="" id="newOficina" placeholder="${empleados[i].oficina}">
                </div>
                <div>
                    <label for="Sueldo"> Grupo </label>
                    <input minlength="3" maxlength="3" type="text" name="Sueldo" required="" id="newSueldo" placeholder="${empleados[i].sueldo}">
                </div>
                
            </form>
            <button class="actualizar" type="submit" onClick ="actualizar('${i}')"> Actualizar </button>
            <button class="cancelar" type="submit" onClick ="Vista()"> Cancelar </button>


            <td>
                <table class="lista" id="Encabezados">
                    <thead>
                        <tr>
                            <th> Numero </th>
                            <th> Nombre </th>
                            <th> Oficina </th>
                            <th> Sueldo </th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        
                    </tbody>
                </table>
            </td>
    
        </td>
    </tr>`
    }
}
}

function actualizar(i){
  let empleados = JSON.parse(localStorage.getItem("Datos"));
  empleados[i].numero = document.getElementById("newNumero").value;
  empleados[i].nombre = document.getElementById("newNombre").value;
  empleados[i].oficina = document.getElementById("newOficina").value;
  empleados[i].sueldo = document.getElementById("newSueldo").value;
  if(empleados[i].numero ==""){
      alert("Escriba un numero para actualizarlo");
  }else{
    if(empleados[i].nombre ==""){
      alert("Escriba el nombre del estudiante para actualizarlo");
    }else{
        if(empleados[i].oficina ==""){
            alert("Escriba el semestre del alumno para actualizarlo");
        }else{
            if(empleados[i].sueldo ==""){
                alert("Escriba el grupo del alumno para actualizarlo");
            }else{
            localStorage.setItem("Datos",JSON.stringify(empleados));
            Vista();
            }
            
        }
        
    }

  }
  localStorage.setItem("Datos", JSON.stringify(empleados));
  Vista();

}

function eliminar(numero){
  let empleados = JSON.parse(localStorage.getItem("Datos"));
  for(let i=0; i<empleados.length; i++){
      if(empleados[i].numero === numero){
         empleados.splice(i,1);
      }
  }
  localStorage.setItem("Datos", JSON.stringify(empleados));
  leer();
}

function Vista(){
    document.getElementById("contenedor").innerHTML = 
    `<tr>
    <td>
        <div>
            <h2> Agregar empleado </h2>
          </div>
        <form id="formulario" autocomplete="off">
            <div>
                <label for="Numero"> Numero </label>
                <input type="text" name="NumeroAl" id="NumeroAl">
            </div>
            <div>
                <label for="Nombre"> Nombre del empleado </label>
                <input type="text" name="Alumno" id="Alumno">
            </div>
            <div>
                <label for="Oficina"> Oficina </label>
                <input minlength="5" maxlength="5" type="text" name="Oficina" id="Oficina">
            </div>
            <div>
                <label for="Sueldo"> Sueldo </label>
                <input minlength="5" maxlength="5" type="text" name="Grupo" id="Sueldo">
            </div>
            <div class="Botones">
                <input type="submit" value="Agregar" id="agregar">
                <input type="reset" value="Limpiar" id="limpiar">
            </div>
        </form>
        <td>
            <table class="lista" id="Encabezados">
                <thead>
                    <tr>
                        <th> Numero </th>
                        <th> Nombre del empleado </th>
                        <th> Oficina </th>
                        <th> Sueldo </th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    
                </tbody>
            </table>
        </td>

    </td>
</tr>`
leer();
}

leer();

function limpiar(){
    document.getElementById('Numero').value = '';
    document.getElementById('Nombre').value = '';
    document.getElementById('Oficina').value = '';
    document.getElementById('Sueldo').value = '';
}
