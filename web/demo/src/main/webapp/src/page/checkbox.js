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
      rowLabel.textContent = '\n行号' + jsonItem.row + '  ' + jsonItem.contain;
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