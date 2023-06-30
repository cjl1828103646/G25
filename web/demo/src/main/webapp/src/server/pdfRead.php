<?php
header("content-type:text/json;charset=utf-8");

//测试文件
$pdfPath="C:/Users/asus/Desktop/test/xcxc.pdf ";

function pdfread($pdfPath){
  $filename=$pdfPath;
  $content = shell_exec('C:/zsy2020212205114/tool/xpdf/bin64/pdftotext -layout "'.$filename.'" -');

  //echo $content;

  // 将 $content 按行拆分为数组
  $lines = explode("\n", $content);
  //echo count($lines);
  $lines = array_filter($lines, 'trim'); // 去除空行
  return  $lines;
}
  
// $lines= pdfread($pdfPath);
// echo json_encode($lines,JSON_UNESCAPED_UNICODE);

?>