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

    // 创建路径标签
    const pathPart = item.path;
    const id = `checkbox${index+1}`;
    const pathcheckbox = createCheckbox(pathPart,id);
    checkboxGroup.appendChild(pathcheckbox);

    // 添加分隔线
    const divider = document.createElement('hr');
    checkboxGroup.appendChild(divider);

    // 遍历每个 JSON 项
    item.json.forEach((jsonItem) => {
      const rowLabel = document.createElement('p');
      rowLabel.textContent = `行号${jsonItem.row} 包括关键字的内容行`;
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