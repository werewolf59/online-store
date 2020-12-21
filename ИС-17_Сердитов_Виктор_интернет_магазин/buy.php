<?php

    // Подключаем конфиг

    require_once "config.php";



    $fio = trim($_POST['fio']);

    $number = trim($_POST['number']);

    $count = trim($_POST['count']);

    $date = date("y.m.d");



    // Записываем ордер

    $link = mysqli_connect($host, $dbuser, $pass, $dbname);

    $query = "INSERT INTO orders(fio, number, date) VALUES('$fio','$number','$date')";

    if (!mysqli_set_charset($link, "utf8")) {
        printf("Ошибка при загрузке набора символов utf8: %s\n", mysqli_error($link));
        exit();
    }

    mysqli_query($link, $query) or die(mysqli_error($link));

    $idorder = mysqli_insert_id($link);



    for($i = 0; $i < $count; $i++){

        $pname = trim($_POST["a".$i."_name"]);

        $pcount = trim($_POST["a".$i."_count"]);

        $link = mysqli_connect($host, $dbuser, $pass, $dbname);

        $query = "INSERT INTO order_product(name, count, order_id) VALUES('$pname','$pcount','$idorder')";

        if (!mysqli_set_charset($link, "utf8")) {
            printf("Ошибка при загрузке набора символов utf8: %s\n", mysqli_error($link));
            exit();
        }

        mysqli_query($link, $query) or die(mysqli_error($link));

    }

?>