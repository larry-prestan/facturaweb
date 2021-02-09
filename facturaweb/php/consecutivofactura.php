<?php

    include './conexiondb.php';

    $sql = "SELECT * FROM consecutivofactura";
    $res = mysqli_query($conn,$sql);
    $consecutivo =json_encode( mysqli_fetch_all($res));
    echo ($consecutivo);
?>