<?php
header('Content-type:text/html;charset=utf-8');
$word = new COM("word.application") or die("Can't start Word!");
$word->Visible = 0;
$document = $word->Documents->open("C:\\Users\\cjl\\Desktop\\text1.doc");
$content = $document->Content->Text; 
$lines = explode("\r", $content);

//echo count($lines); 
$docArray=array();

foreach ($lines as $line) {
    //$line=iconv('GB2312','UTF-8',$line);
    $result=$line . PHP_EOL;
    $result=iconv('GB2312','UTF-8',$result);
    $result=trim($result);
    array_push($docArray,$result);
    //echo $result."\n";
}
array_pop($docArray);
echo json_encode($docArray,JSON_UNESCAPED_UNICODE);

//echo $content;
$document->Close(false);
$word->Quit();
$word=null;

?>