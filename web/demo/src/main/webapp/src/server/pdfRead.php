<?php
header("content-type:text/json;charset=utf-8");

$pdfPath;
//测试文件
$pdfPath="C:/Users/asus/Desktop/test.pdf ";
$filename=$pdfPath;

$content = shell_exec ( 'C:/zsy2020212205114/tool/xpdf/pdftotext '.$filename .'-');
echo $content;

// 执行xpdf的命令行工具并将输出存储到一个变量中
$output = [];
exec("pdftotext -layout {$pdfPath} -", $output);

// 以行为单位将输出内容存储在数组中
$lines = [];
foreach ($output as $line) {
    $line = trim($line);
    if (!empty($line)) {
        $lines[] = $line;
    }
}

// 打印数组中的每一行
foreach ($lines as $line) {
    echo $line . "\n";
}

?>