<?php
require 'pdfRead.php';
require 'wordRead.php';

header("content-type:text/json;charset=utf-8");

$filename = 'path.txt';//测试
//$filename = $_POST["fileName"];
if (file_exists($filename)) {
    $file = fopen($filename, 'r');
    $pathArray = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    fclose($file);
    //输出路径
    // foreach ($pathArray as $key => $value) {
    //     echo "{$key}: {$value}\n";
    // }   
} else {echo '文件不存在';}

//检索
function search($a,$b){
    $line=$a;
    $keys=$b;
    $contain=implode('', $line);
    $con = explode($keys,$contain);
    $keylineArrray=[];
    $c=0;
    //echo count($con);
    if(count($con)>1){
        $i1=0;
        for($j=0;$j<count($line);$j++){
            //echo $pathArray[$i];
            $c=count(explode($keys,$line[$j]));
            if($c>1){  
                $keylineArrray[$i1]["row"]=$j;
                $keylineArrray[$i1]["contain"]=$line[$j];
                $i1++;
                }
            }        
        }
        return $keylineArrray;
}


    $i=0;
    for($i=0;$i<count($pathArray);$i++){
        //$contain='';

        $keys='a';//测试
        //从前端获取关键字
        //$keys=$_POST["Keys"];
        $keyArrray=[];

        //判断是word还是pdf
        $path=$pathArray[$i];
        if(count(explode('pdf',$path))>1){
            $pdfline=pdfread($path);
            $keylineArrray=search($pdfline,$keys);
            $keyArrray[$i]["path"]=$pathArray[$i];
            $keyArrray[$i]["json"]=$keylineArrray;}
        // else if(count(explode('doc',$path))>1 or count(explode('docx',$path))>1){
        //     $wordline=wordread($path);
        //     $keylineArrray=search($wordline,$keys);
        //     $keyArrray[$i]["path"]=$pathArray[$i];
        //     $keyArrray[$i]["json"]=$keylineArrray; 
        // }
          
        

    //利用json_encode()方法将数组转换为json，并利用echo方法输出json
    echo json_encode($keyArrray,JSON_UNESCAPED_UNICODE);
    }
    

?>