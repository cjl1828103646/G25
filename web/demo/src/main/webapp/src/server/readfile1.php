<?php
function searchFile($path, $folder_array ){
    if(is_dir($path)){  //检查文件目录是否存在
        $H = @ opendir($path);
        while(false !== ($_file=readdir($H))){
            //检索目录
            if(is_dir($path."\\".$_file) && !in_array($_file, array(".", "..", "Thumbs.db")))
            {
                array_push($folder_array, $path."\\".$_file);                
            //检索文件
            }
        }
        closedir($H);
    }else if(file_exists($path)){
        array_push($file_array, $path);
    }
    return $folder_array;
}
 
 
$folder_array=array(); //存放目录名数组  

    $info = $_POST["data"];  // 这个时候的info是一个字符串
    $result = json_decode($info);   // 这个时候的result已经被还原成对象
    
    $floderpath = $result -> path;

   echo json_encode(searchFile($floderpath, $folder_array),JSON_UNESCAPED_UNICODE);


?>