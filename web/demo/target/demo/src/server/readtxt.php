<?php
$filename = 'path.txt';
if (file_exists($filename)) {
    $file = fopen($filename, 'r');
    $array = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    while (!feof($file)) {
        echo fgets($file);
    }
    foreach ($array as $key => $value) {

        echo "{$key}: {$value}";
    
    }
    fclose($file);
} else {
    echo '文件不存在';}
?>