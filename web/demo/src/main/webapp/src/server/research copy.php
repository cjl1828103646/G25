<?php
header("content-type:text/json;charset=utf-8");

// $filename = 'C:\wamp64\www\web\demo\path1.txt';
// if (file_exists($filename)) {
//     $file = fopen($filename, 'r');
//     $pathArray = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
//     foreach ($pathArray as $key => $value) {
//         echo "{$key}: {$value}\n";
//     }
//     fclose($file);
// } else {
//     echo '文件不存在';}

$pathArray=["C:\\test\\test1.txt","C:\\test\\test2.txt","C:\\test\\test2.txt"];

    for($i=0;$i<count($pathArray);$i++){
        $contain='';
        $path=$pathArray[$i];
        
        //读取内容
        $contain = file_get_contents($path);
      

        //检索
        $keys='a';
        $keyArrray;//目录所有文件含有key的句子

        $con = explode($keys,$contain);//判断内容是否含有key
        $c=0;

        if(count($con)>1){
            $line = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);//获取line

            $i1=0;
            $keylineArrray=[];//当个文件中含有key的句子

            for($j=0;$j<count($line);$j++){
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