$(function () {

    //agregar item//
    $('#btnadditem').click(function (e) { 
        let descripcion = $('#descripcion').val();
        let cantidad = $('#cantidad').val();
        let valor = $('#valor').val();
        let total = parseInt(cantidad)*parseInt(valor);
        if(descripcion==""||cantidad==""||valor==""){
            alert("DATOS DEL ITEM INCOMPLETOS, PORFAVOR VERIFICAR.");
        }else{

            let datositem = [{"descripcion":descripcion,"cantidad":cantidad,"valor":valor,"total":total}];
            let tabla =``;
            datositem.forEach(dato => {
                tabla+=`
                <tr>
                    <td>`+dato.descripcion+`</td>
                    <td>`+dato.cantidad+`</td>
                    <td>`+dato.valor+`</td> 
                    <td>`+dato.total+`</td>
                    <td id="botonborrar">
                       <a class="deleteitem" href="#">
                          <img src="images/iconos/removeitem.png" alt="removeitem" width="30px">
                       </a>
                    </td>               
                </tr>
                `;
            });
            $('#datostabla').append(tabla);
            limpiardatositem();
        }
        e.preventDefault();
    });

    //borrar item//
    $(document).on('click', '.deleteitem', function() {
        let element = $(this)[0].parentElement.parentElement;
        $(element).remove();
    });

    //limpiar el formulario despues de agregar un item//
    function limpiardatositem() {
        $('#descripcion').val("");
        $('#cantidad').val("");
        $('#valor').val("");
    }


    //convertir numero a letras//
    

});