<?php
header("content-type:text/json;charset=utf-8");

$filename = 'path.txt';
if (file_exists($filename)) {
    $file = fopen($filename, 'r');
    $pathArray = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
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

    $x=0;$y=0;
    for($i=0;$i<count($pathArray);$i++){

        $path=$pathArray[$i];

        if(count(explode('doc',$path))>1){
            $wordPath[$x]=$path;
        }
        else if(count(explode('pdf',$path))>1){
            $pdfPath[$y]=$path; }
    }
        

    echo json_encode($keys,JSON_UNESCAPED_UNICODE);
?>