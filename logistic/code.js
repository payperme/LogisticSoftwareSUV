const url = 'http://localhost:3000/api/cliente'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalCliente = new bootstrap.Modal(document.getElementById('modalCliente'))
const formCliente = document.querySelector('form')
const userName = document.getElementById('userName')
const streetNum = document.getElementById('streetNum')
const col = document.getElementById('col')
const city = document.getElementById('city')
const state = document.getElementById('state')
const telNum = document.getElementById('telNum')
const cp = document.getElementById('cp')
let opcion = ''

btnCreate.addEventListener('click', ()=>{
  userName.value = ''
  streetNum.value = ''
  col.value = ''
  city.value = ''
  state.value = ''
  telNum.value = ''
  cp.value = ''
  opcion = 'crear'
  modalCliente.show()
})
//funcion para mostrar clientes

const mostrar = (clientes) => {
  clientes.forEach(cliente =>{

    resultados += `<tr>
                         <td>${cliente.id_user}</td>
                         <td>${cliente.userName}</td>
                         <td>${cliente.streetNum}</td>
                         <td>${cliente.col}</td>
                         <td>${cliente.city}</td>
                         <td>${cliente.state}</td>
                         <td>${cliente.telNum}</td>
                         <td>${cliente.cp}</td>
                         <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>
                `
  })
  contenedor.innerHTML = resultados
}
//Procedicimiento clientes
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data))
    .catch( error => console.log(error))
