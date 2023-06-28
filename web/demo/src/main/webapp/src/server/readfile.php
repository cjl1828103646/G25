<?php
function searchFile($path, &$file_array, &$folder_array, &$all_array){
    if(is_dir($path)){  //检查文件目录是否存在
        $H = @ opendir($path);
        while(false !== ($_file=readdir($H))){
            //检索目录
            if(is_dir($path."/".$_file) && !in_array($_file, array(".", "..", "Thumbs.db")))
            {
                array_push($folder_array, $path."/".$_file);
                array_push($all_array, $path."/".$_file);
                searchFile($path."/".$_file, $file_array, $folder_array, $all_array);
            //检索文件
            }
            elseif(file_exists($path."/".$_file) && !in_array($_file, array(".", "..", "Thumbs.db")))
            {
                array_push($file_array,$path."/".$_file);
                array_push($all_array, $path."/".$_file);
            }
        }
        closedir($H);
    }elseif(file_exists($path)){
        array_push($file_array, $path);
        array_push($all_array, $path);
    }
}
 
$file_array=array(); //存放文件名数组  
$folder_array=array(); //存放目录名数组  
$all_array=array(); //存放全部路径的数组 

$wordsearch=array();
$pdfsearch=array();

$floderpath = "C:\\Users\\cjl\\Desktop\\2020212205134_陈佳璐";

searchFile($floderpath, $file_array, $folder_array, $all_array);
foreach ($all_array as $value) {
    //echo $value."\n";
    if(substr(strrchr($value,'.'),1)=="doc"||substr(strrchr($value,'.'),1)=="docx"){
        array_push($wordsearch,$value);
    }

    else if(substr(strrchr($value,'.'),1)=="pdf"){
        array_push($pdfsearch,$value);
    }
}
echo json_encode($wordsearch,JSON_UNESCAPED_UNICODE);
?>