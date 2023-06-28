<?php
header("content-type:text/json;charset=utf-8");

$pdfPath;
//测试文件
$pdfPath="C:/Users/asus/Desktop/xcxc.pdf ";
$filename=$pdfPath;

$content = shell_exec('C:/zsy2020212205114/tool/xpdf/bin64/pdftotext -layout "'.$filename.'" -');
//echo $content;

// 将 $content 按行拆分为数组
$lines = explode("\r\n", $content);
echo count($lines);
$lines = array_filter($lines, 'trim'); // 去除空行

// 打印数组中的每一行
foreach ($lines as $line) {
    echo $line ;}

//echo count($lines);

?>