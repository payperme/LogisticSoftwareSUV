//Definición de variables
const url = 'http://localhost:3000/api/paqueteria/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalPaqueteria = new bootstrap.Modal(document.getElementById('modalPaqueteria'))
const formPaqueteria = document.querySelector('form')
const nameParcel = document.getElementById('nameParcel')
const contact = document.getElementById('contact')
const telParser = document.getElementById('telParser')
var opcion = ''

btnCrear.addEventListener('click', ()=>{
  nameParcel.value = ''
  contact.value = ''
  telParser.value = ''
  opcion = 'crear'
  modalPaqueteria.show()
})

//funcion para mostrar los resultados
const mostrar = (paqueterias) => {
    paqueterias.forEach(paqueteria => {
        resultados += `<tr>
                            <td>${paqueteria.idParcel}</td>
                            <td>${paqueteria.nameParcel}</td>
                            <td>${paqueteria.contact}</td>
                            <td>${paqueteria.telParser}</td>
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
    const idParcels = fila.firstElementChild.innerHTML
    alertify.confirm(`¿Estás seguro de eliminar la paqueteria con ID:${idParcels}?`,
    function(){
        fetch(url+idParcels, {
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
    const nameParcelForm = fila.children[1].innerHTML
    const contactForm = fila.children[2].innerHTML
    const telParserForm = fila.children[3].innerHTML
    nameParcel.value = nameParcelForm
    contact.value = contactForm
    telParser.value = telParserForm
    opcion = 'editar'
    modalPaqueteria.show()

})

//Procedimiento para Crear y Editar
formPaqueteria.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
              nameParcel:nameParcel.value,
              contact:contact.value,
              telParser:telParser.value,
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoPaqueteria = []
            nuevoPaqueteria.push(data)
            mostrar(nuevoPaqueteria)
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
              nameParcel:nameParcel.value,
              contact:contact.value,
              telParser:telParser.value,
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalPaqueteria.hide()
})
