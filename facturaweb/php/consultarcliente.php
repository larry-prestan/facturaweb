<?php

    include './conexiondb.php';
    $cedula = $_POST['cedula'];
    if(!empty($cedula)){
        $sql="SELECT * FROM clientes WHERE cedula='$cedula'";
        $res=mysqli_query($conn,$sql);
        $datos = json_encode(mysqli_fetch_all($res));
        echo ($datos);
    }else{
        echo ("1");
    }
    
?>