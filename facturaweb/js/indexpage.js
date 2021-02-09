$(function () {

    consecutivofactura();
    //consecutivo factura//
    function consecutivofactura() {
        $.ajax({
            type: "POST",
            url: "./php/consecutivofactura.php",
            success: function (res) {
                let consecutivos = JSON.parse(res);
                consecutivos.forEach(consecutivo => {
                    $('#nofactura').html(consecutivo[1]);
                });
            }
        });
    }

    //agregar item a factura//
    $('#btnadditem').click(function (e) {
        let descripcion = $('#descripcion').val();
        let cantidad = $('#cantidad').val();
        let valor = $('#valor').val();
        let total = parseInt(cantidad) * parseInt(valor);
        if (descripcion == "" || cantidad == "" || valor == "") {
            alert("DATOS DEL ITEM INCOMPLETOS, PORFAVOR VERIFICAR.");
        } else {

            let datositem = [{ "descripcion": descripcion, "cantidad": cantidad, "valor": valor, "total": total }];
            let tabla = ``;
            datositem.forEach(dato => {
                tabla += `
                <tr>
                    <td>`+ dato.descripcion + `</td>
                    <td>`+ dato.cantidad + `</td>
                    <td>`+ dato.valor + `</td> 
                    <td>`+ dato.total + `</td>
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
        $('#totalfactura').val(sumatoria());
    });

    //eliminar item de la factura//
    $(document).on('click', '.deleteitem', function () {
        let element = $(this)[0].parentElement.parentElement;
        $(element).remove();
        $('#totalfactura').val(sumatoria());
    });

    //limpiar el formulario despues de agregar un item//
    function limpiardatositem() {
        $('#descripcion').val("");
        $('#cantidad').val("");
        $('#valor').val("");
    };

    //limpiar datos de factura//
    function reseteardatosfactura() {
        $('#cedula').val("");
        $('#nombre').html("");
        $('#direccion').html("");
        $('#telefono').html("");
    };

    //obtener numero de filas de tabla//
    function filas() {
        var filas = $('#datostabla tr').length;
        return filas;
    }

    //obtener numero de columnas de la fila//
    function columnas() {
        var columnas = $('#datostabla tr:last td').length;
        return columnas;
    }

    //SUMATORIA//
    function sumatoria() {
        let nf = filas();
        let acum = 0;
        for (i = 0; i <= (nf - 1); i++) {
            for (j = 3; j <= 3; j++) {
                let td = document.getElementById('datostabla').rows[i].cells[j];
                $(td).attr("id", "f" + i);
                let sum = $(td).text();
                acum = (parseInt(acum) + parseInt(sum));
            }
        }
        return acum;
    }

    //consultar cliente factura//
    $('#cedula').keyup(function (e) {
        let cedula = $('#cedula').val();
        //enviamos el dato a consultar//
        $.ajax({
            type: "POST",
            url: "./php/consultarcliente.php",
            data: { cedula },
            success: function (res) {
                if (res == 1) {
                    reseteardatosfactura();
                } else {

                    let datos = JSON.parse(res);
                    datos.forEach(dato => {
                        $('#nombre').html(dato[2]);
                        $('#direccion').html(dato[3]);
                        $('#telefono').html(dato[4]);
                    });
                }
            }
        });
    });


});