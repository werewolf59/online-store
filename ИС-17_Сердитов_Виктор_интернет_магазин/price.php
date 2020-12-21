<?php

    require_once "config.php";

    $link = mysqli_connect($host, $dbuser, $pass, $dbname);

    $query = 'SELECT * FROM items';
    
    if (!mysqli_set_charset($link, "utf8")) {
        printf("Ошибка при загрузке набора символов utf8: %s\n", mysqli_error($link));
        exit();
    }

    $results = mysqli_query($link, $query);

    $res = array();

    $i = 0;

    while($row = mysqli_fetch_assoc($results)){

        $res += array($i => array('name' => $row['name'], 'cat' => $row['cat'], 'price' => $row['price']));

        $i++;

    }

    $count = array(

        "count" => $i

    );

    $out = $count + $res;

    $output = json_encode($out, JSON_UNESCAPED_UNICODE);

    echo $output;

?>