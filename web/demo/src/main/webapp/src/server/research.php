<?php
header("content-type:text/json;charset=utf-8");
require 'pdfRead.php';
require 'readfile.php';
require 'wordRead.php';

// $floderpath = "C:\\Users\\asus\\Desktop\\test";//测试
// $pathArray=pathresult($floderpath);
// $keys='a';//测试
// print_r($pathArray);


//从前端获取关键字和路径
if (isset($_POST["path"])) {
    $floderpath = $_POST["path"];
    $pathArray=pathresult($floderpath);
}else{$pathArray=["失败啦！","hhh"];}

if (isset($_POST["Keys"])) {
    $keys=$_POST["Keys"];
}else{$keys="NO KEYS";}

// $data = null;
// $info = $_POST["data"];  // 这个时候的info是一个字符串
// $result = json_decode($info);   // 这个时候的result已经被还原成对象
// echo $result;

$keyArrray = array();

//检索
function searchKey($a,$b){
    $line=$a;
    $keys=$b;
    $contain=implode('', $line);
    $con = explode($keys,$contain);
    $keylineArrray=[];
    $c=0;
    if(count($con)>1){
        $i1=0;
        for($j=0;$j<count($line);$j++){
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


    $i=0;$j=0;
    if(!empty($pathArray)){
        $keyArrray=[];
    for($i=0;$i<count($pathArray);$i++){
        //判断是word还是pdf
        $path=$pathArray[$i];
        if(count(explode('pdf',$path))>1){
            $pdfline=pdfread($path);
            $keylineArrray=searchKey($pdfline,$keys);
            $keyArrray[$j]["path"]=$pathArray[$i];
            $keyArrray[$j]["json"]=$keylineArrray;
            $j++;}
        else 
        if(count(explode('docx',$path))>1){
            $wordline=wordread($path);
            //print_r($wordline);
            $keylineArrray=searchKey($wordline,$keys);
            //print_r($keylineArrray);
            $keyArrray[$j]["path"]=$pathArray[$i];
            $keyArrray[$j]["json"]=$keylineArrray;
            $j++;
        }
          
    
    }
}

       //利用json_encode()方法将数组转换为json，并利用echo方法输出json
       if(empty($keyArrray)){
        $keyArrray="NULL";
       }
       echo json_encode($keyArrray,JSON_UNESCAPED_UNICODE);
?>