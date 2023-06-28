<?php
header("content-type:text/json;charset=utf-8");

$filename = 'path.txt';
if (file_exists($filename)) {
    $file = fopen($filename, 'r');
    $pathArray = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($pathArray as $key => $value) {
        echo "{$key}: {$value}\n";
    }
    fclose($file);
} else {
    echo '文件不存在';}

    $i=0;$j=0;$fileNum=0;$row=0;
    for($i=0;$i<count($pathArray);$i++){
        $contain='';
        //$path=$pathArray[$i];
        $path=$pathArray[$i];
        //读取内容
        $contain = file_get_contents($path);
        $line=[0];
        if (file_exists($path)) {
            $file = fopen($path, 'r');
            fclose($file);
        } else {
            echo '文件不存在';}

        //检索
        $keys='a';
        $keyArrray;
        $con = explode($keys,$contain);$c=0;
        //echo count($con);
        if(count($con)>1){
            $line = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $i1=0;
            $keylineArrray=[];
            for($j=0;$j<count($line);$j++){
                //echo $pathArray[$i];
                $c=count(explode($keys,$line[$j]));
                if($c>1){  
                    $keylineArrray[$i1]["row"]=$j;
                    $keylineArrray[$i1]["contain"]=$line[$j];
                    $i1++;
                }
            }
            $keyArrray[$i]["path"]=$pathArray[$i];
            $keyArrray[$i]["json"]=$keylineArrray;
            
            
        }
    
    }
    echo json_encode($keyArrray,JSON_UNESCAPED_UNICODE);

    

?>