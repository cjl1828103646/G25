<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<body>
<h2>Hello World!啦啦啦111</h2>
<table>
    <tr>
      <td>选择导入数据源：</td>
      <td><input id="savePath" type="text" name="path" size="30"></td>
      <td><input type=button value="选择" onclick="browseFolder()"></td>
    </tr>
</table>

<input type=button value="转换" onclick="zhuanhuan()">
<div id="checkboxContainer"></div>
<button id="download">DownLoad</button>

<input type="file" id="file"/>
<button onclick="readText()">读取文本</button>
<div id="content"></div>

<script src="src/page/jquery.min.js"></script>
<script src="src/page/index.js"></script>
<script src="src/page/checkbox.js"></script>

</body>
</html>
