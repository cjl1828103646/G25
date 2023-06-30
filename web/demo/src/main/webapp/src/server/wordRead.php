<?php

require_once 'vendor/autoload.php';

use PhpOffice\PhpWord\IOFactory;

// 要读取的Word文档路径
$filePath = "C:\\Users\\asus\\Desktop\\test\\asas .docx";


function wordread($path){
// 加载Word文档
$phpWord = IOFactory::load($path);

// 存储文档内容的数组
$lines = array();

$currentLine = ''; // 当前行的内容

foreach ($phpWord->getSections() as $section) {
    foreach ($section->getElements() as $element) {
        if ($element instanceof \PhpOffice\PhpWord\Element\TextRun) {
            foreach ($element->getElements() as $textElement) {
                if ($textElement instanceof \PhpOffice\PhpWord\Element\Text) {
                    $text = trim($textElement->getText()); // 去除空格
                    if (!empty($text)) {
                        $currentLine .= $text; // 向当前行添加单词
                    }
                }
            }
        } elseif ($element instanceof \PhpOffice\PhpWord\Element\Text) {
            $text = trim($element->getText()); // 去除空格
            if (!empty($text)) {
                $currentLine .= $text; // 向当前行添加单词
            }
        } elseif ($element instanceof \PhpOffice\PhpWord\Element\Table) {
            foreach ($element->getRows() as $row) {
                foreach ($row->getCells() as $cell) {
                    foreach ($cell->getElements() as $cellElement) {
                        if ($cellElement instanceof \PhpOffice\PhpWord\Element\Text) {
                            $text = trim($cellElement->getText()); // 去除空格
                            if (!empty($text)) {
                                $currentLine .= $text; // 向当前行添加单词
                            }
                        }
                    }
                }
            }
        }

        if ($currentLine !== '') {
            $lines[] = $currentLine; // 将当前行添加到存储文档内容的数组中
            $currentLine = ''; // 重置当前行
        }
    }
}
return $lines;
}

// $wordArray=wordread($filePath);
// echo json_encode($wordArray,JSON_UNESCAPED_UNICODE);

?>