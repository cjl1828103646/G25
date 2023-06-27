<?php
$filename = 'path.txt';
if (file_exists($filename)) {
    $file = fopen($filename, 'r');
    $array = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    //输出文件内容
    // while (!feof($file)) {
    //     echo fgets($file);
    // }
    //输出数组内容
    foreach ($array as $key => $value) {
        echo "{$key}: {$value}";
    }
    fclose($file);
} else {
    echo '文件不存在';}
?>