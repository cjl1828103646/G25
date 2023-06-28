// 创建复选框
function createCheckbox(id, label) {
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;

  var checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', id);
  checkboxLabel.textContent = label;

  var container = document.createElement('div');
  container.appendChild(checkbox);
  container.appendChild(checkboxLabel);

  return container;
}

function createCheckboxesFromJSON(data) {
  var container = document.getElementById('checkboxContainer');

  // 遍历 JSON 数组
  data.forEach(function(item,index){
    var checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'checkbox-group'; // 添加一个自定义的 CSS 类名

    // 创建路径标签
    var pathPart = item.path;
    var id = 'checkbox' + (index+1);
    var pathcheckbox = createCheckbox(id,pathPart);
    checkboxGroup.appendChild(pathcheckbox);

    // 添加分隔线
    var divider = document.createElement('hr');
    checkboxGroup.appendChild(divider);

    // 遍历每个 JSON 项
    item.json.forEach(function(jsonItem){
      var rowLabel = document.createElement('p');
      rowLabel.textContent = '行号' + jsonItem.row + '  ' + jsonItem.contain;
      checkboxGroup.appendChild(rowLabel);
    });

    // 添加复选框到容器
    container.appendChild(checkboxGroup);
  });
}


// 读取 JSON 数据并生成复选框
var jsonData = [
  { "path": "C:\\test\\test1.txt", "json": [{ "row": 1, "contain": "a111" }] },
  { "path": "C:\\test\\test2.txt", "json": [{ "row": 3, "contain": "a333" }] },
  { "path": "C:\\test\\test3.txt", "json": [{ "row": 1, "contain": "abc111" }, { "row": 2, "contain": "abc222" }, { "row": 3, "contain": "abc333" }] }
];

/*var jsonData = [];
$.post("src/sever/research.php",{},function(data){
	var obj=data[0];
	console.log(obj);
	$.each(data,function(i,val){
		jsonData.push(val);
	})
},"json");*/

var searchBtn = document.getElementById('searchbtn');
var keyword = document.getElementById('key').val;

searchBtn.addEventListener('click',function(){
	createCheckboxesFromJSON(jsonData);
});


// 假设你有一个下载按钮元素
var downloadButton = document.getElementById('download');

// 添加点击事件监听器
if (downloadButton.addEventListener) {
  downloadButton.addEventListener('click', handleClick);
} else if (downloadButton.attachEvent) {
  downloadButton.attachEvent('onclick', handleClick);
}

// 点击事件处理函数
function handleClick(event) {
  var checkboxGroups = document.getElementsByClassName('checkbox-group');
  var content = '';

  // 遍历每个 checkbox-group
  for (var i = 0; i < checkboxGroups.length; i++) {
    var checkboxGroup = checkboxGroups[i];
    var checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
    
    // 检查 checkbox-group 内的复选框是否被选中
    var isChecked = false;
    for (var j = 0; j < checkboxes.length; j++) {
      var checkbox = checkboxes[j];
  
      if (checkbox.checked) {
        isChecked = true;
        break; // 退出循环
      }
    }
    
    // 如果至少有一个复选框被选中，则将 checkbox-group 内容添加到下载内容中
    if (isChecked) {
      /*content += checkboxGroup.innerText + '\n';*/
      content += checkboxGroup.outerHTML + '\n';
    }
  }
  
  // 调用下载函数，将内容作为文件下载
  download(content, 'checkbox_group_content.txt');
}

// 下载函数
function download(content, filename) {
  var IEwindow = window.open();
  IEwindow.document.open('text/plain', 'replace');
  IEwindow.document.write(content);
  IEwindow.document.close();
  IEwindow.document.execCommand('SaveAs', true, filename);
  IEwindow.close();
}