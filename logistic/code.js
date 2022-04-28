//Definición de variables
const url = 'http://localhost:3000/api/cliente/'
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
var opcion = ''

btnCrear.addEventListener('click', ()=>{
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

//funcion para mostrar los resultados
const mostrar = (clientes) => {
    clientes.forEach(cliente => {
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

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))


const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id_users = fila.firstElementChild.innerHTML
    alertify.confirm(`¿Estás seguro de eliminar al cliente con ID:${id_users}?`,
    function(){
        fetch(url+id_users, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const userNameForm = fila.children[1].innerHTML
    const streetNumForm = fila.children[2].innerHTML
    const colForm = fila.children[3].innerHTML
    const cityForm = fila.children[4].innerHTML
    const stateForm = fila.children[5].innerHTML
    const telNumForm = fila.children[6].innerHTML
    const cpForm = fila.children[7].innerHTML
    userName.value = userNameForm
    streetNum.value = streetNumForm
    col.value = colForm
    city.value = cityForm
    state.value = stateForm
    telNum.value = telNumForm
    cp.value = cpForm
    opcion = 'editar'
    modalCliente.show()

})

//Procedimiento para Crear y Editar
formCliente.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
              userName:userName.value,
              streetNum:streetNum.value,
              col:col.value,
              city:city.value,
              state:state.value,
              telNum:telNum.value,
              cp:cp.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoCliente = []
            nuevoCliente.push(data)
            mostrar(nuevoCliente)
        })
    }
    if(opcion=='editar'){
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
              userName:userName.value,
              streetNum:streetNum.value,
              col:col.value,
              city:city.value,
              state:state.value,
              telNum:telNum.value,
              cp:cp.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalCliente.hide()
})
