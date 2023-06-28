// 创建复选框
function createCheckbox(id, label) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;

  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', id);
  checkboxLabel.textContent = label;

  const container = document.createElement('div');
  container.appendChild(checkbox);
  container.appendChild(checkboxLabel);

  return container;
}

function createCheckboxesFromJSON(data) {
  const container = document.getElementById('checkboxContainer');

  // 遍历 JSON 数组
  data.forEach((item,index) => {
    const checkboxGroup = document.createElement('div');
    checkboxGroup.classList.add('checkbox-group'); // 添加一个自定义的 CSS 类名

    // 创建路径标签
    const pathPart = item.path;
    const id = `checkbox${index+1}`;
    const pathcheckbox = createCheckbox(id,pathPart);
    checkboxGroup.appendChild(pathcheckbox);

    // 添加分隔线
    const divider = document.createElement('hr');
    checkboxGroup.appendChild(divider);

    // 遍历每个 JSON 项
    item.json.forEach((jsonItem) => {
      const rowLabel = document.createElement('p');
      rowLabel.textContent = `\n行号${jsonItem.row}  ${jsonItem.contain}`;
      checkboxGroup.appendChild(rowLabel);
    });

    // 添加复选框到容器
    container.appendChild(checkboxGroup);
  });
}

// 读取 JSON 数据并生成复选框
const jsonData = [
  { "path": "C:\\test\\test1.txt", "json": [{ "row": 1, "contain": "a111" }] },
  { "path": "C:\\test\\test2.txt", "json": [{ "row": 3, "contain": "a333" }] },
  { "path": "C:\\test\\test3.txt", "json": [{ "row": 1, "contain": "abc111" }, { "row": 2, "contain": "abc222" }, { "row": 3, "contain": "abc333" }] }
];

createCheckboxesFromJSON(jsonData);

// 假设你有一个下载按钮元素
const downloadButton = document.getElementById('download');

// 添加点击事件监听器
downloadButton.addEventListener('click', () => {
  const checkboxGroups = document.getElementsByClassName('checkbox-group');
  let content = '';

  // 遍历每个 checkbox-group
  for (let i = 0; i < checkboxGroups.length; i++) {
    const checkboxGroup = checkboxGroups[i];
    const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
    
    // 检查 checkbox-group 内的复选框是否被选中
    let isChecked = false;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        isChecked = true;
        return;
      }
    });
    
    // 如果至少有一个复选框被选中，则将 checkbox-group 内容添加到下载内容中
    if (isChecked) {
      content += checkboxGroup.textContent + '\n';
    }
  }
  
  // 调用下载函数，将内容作为文件下载
  download(content, 'checkbox_group_content.txt');
});

// 下载函数
function download(content, filename) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}