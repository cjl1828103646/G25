<?php

function searchFile($path, &$file_array, &$folder_array, &$all_array){
    if(is_dir($path)){  //检查文件目录是否存在
        $H = @ opendir($path);
        while(false !== ($_file=readdir($H))){
            //检索目录
            if(is_dir($path."\\".$_file) && !in_array($_file, array(".", "..", "Thumbs.db")))
            {
                array_push($folder_array, $path."\\".$_file);
                array_push($all_array, $path."\\".$_file);
                searchFile($path."\\".$_file, $file_array, $folder_array, $all_array);
            //检索文件
            }
            else if(file_exists($path."\\".$_file) && !in_array($_file, array(".", "..", "Thumbs.db")))
            {
                array_push($file_array,$path."\\".$_file);
                array_push($all_array, $path."\\".$_file);
            }
        }
        closedir($H);
    }else if(file_exists($path)){
        array_push($file_array, $path);
        array_push($all_array, $path);
    }
}
function pathresult($floderpath){


$file_array=array(); //存放文件名数组  
$folder_array=array(); //存放目录名数组  
$all_array=array(); //存放全部路径的数组 

$pathArray=array();


//$floderpath = $_POST['data'];

searchFile($floderpath, $file_array, $folder_array, $all_array);
foreach ($all_array as $value) {
    //echo $value."\n";
    if(substr(strrchr($value,'.'),1)=="doc"||substr(strrchr($value,'.'),1)=="docx"||substr(strrchr($value,'.'),1)=="pdf"){
        array_push($pathArray,$value);
    }

}

return $pathArray;
}
// $_SESSION["pathArray"]=$pathArray;

// $floderpath = "C:\\Users\\asus\\Desktop\\test";
// $pathArray=pathresult($floderpath);
// echo json_encode($pathArray,JSON_UNESCAPED_UNICODE);
// $info = $_POST["path"];  // 这个时候的info是一个字符串
// $result = json_decode($info);   // 这个时候的result已经被还原成对象
// echo $result -> floderpath;
?>