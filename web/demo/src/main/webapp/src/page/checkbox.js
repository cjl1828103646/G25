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
  
  function createCheckboxesFromJSON(data,highlightword) {
    var container = document.getElementById('checkboxContainer');
  
    // 遍历 JSON 数组
    data.forEach(function(item,index){
      var checkboxGroup = document.createElement('div');
      checkboxGroup.className = 'checkbox-group'; // 添加一个自定义的 CSS 类名
     
      if(item.json.length != 0){
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
          // rowLabel.textContent = '行号' + jsonItem.row + '  ' + jsonItem.contain;
          
          
        // 将含有指定字母的部分标红
        var contain = jsonItem.contain.replace(new RegExp(highlightword, 'g'), '<span class="highlight">' + highlightword + '</span>');
          rowLabel.innerHTML = '行号' + jsonItem.row + '  ' + contain; // 使用 innerHTML 插入 HTML

          checkboxGroup.appendChild(rowLabel);
        });

      }
  
      // 添加复选框到容器
      container.appendChild(checkboxGroup);
    });
  }

  $("#searchbtn").on("click",onuserBtnClick);
function onuserBtnClick(){
    // var data="C:/Users/asus/Desktop/test/";
    var data=$("#search").val();
    console.log(data);
    var key=$("#inputkey").val();
    console.log(key);

    // var arr ={
    //   "path":data,
    //   "Keys":key
    //   };
    // var json =JSON.stringify(arr);//使用JSON将对象转换成JSON格式数据
    // var xhr = new XMLHttpRequest;
  
    // xhr.open('post', 'src/server/research.php');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send("data=" + json);//  Content-Type设置成application/x-www-form-urlencoded 的情况下，请求主体可以用key1=value1&key2=value2的形式发送数据
    // xhr.onreadystatechange = function() {
    //      if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status ==304)){  //响应完成并且响应码为200或304

    //     alert (xhr.responseText);
    //      }
    // };
    
    $.post("src/server/research.php",{
        "path":data,
        "Keys":key
    },function(data){
      console.log("sss");
      console.log(data);
      checkboxContainer.innerHTML="";
      createCheckboxesFromJSON(data,key);
    },"json");
  }

// 下载
var downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', handleDownload);

function handleDownload() {
  var checkboxGroups = document.getElementsByClassName('checkbox-group');
  var selectedItems = [];

  for (var i = 0; i < checkboxGroups.length; i++) {
    var checkbox = checkboxGroups[i].querySelector('input[type="checkbox"]');
    var pathLabel = checkboxGroups[i].querySelector('label');
    
    if (checkbox.checked) {
      var rows = checkboxGroups[i].querySelectorAll('p');
      var itemData = {
        path: pathLabel.textContent,
        data: []
      };

      for (var j = 0; j < rows.length; j++) {
        var rowLabel = rows[j].textContent;
        var rowElements = rowLabel.split(/\s+/);
        var rowNumber = rowElements[0].substring(2);
        var containText = rowElements.slice(1).join(' ').trim();
        
        itemData.data.push({
          row: rowNumber,
          contain: containText
        });
      }

      selectedItems.push(itemData);
    }
  }

  // 调用生成下载文件的函数，传入选中的数据数组
  generateDownloadFile(selectedItems);
}

function generateDownloadFile(selectedItems) {
  var content = '';

  selectedItems.forEach(function(item) {
    content += item.path + '\n';
    
    item.data.forEach(function(entry) {
      content += '行号'+entry.row + '\t' + entry.contain + '\n';
    });

    content += '\n';
  });

  // 创建 Blob 对象并下载
  var blob = new Blob([content], { type: 'text/plain' });
  var url = URL.createObjectURL(blob);

  var downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'selected_data.txt';

  document.body.appendChild(downloadLink);
  downloadLink.click();

  // 清理临时资源
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

// var downloadButton = document.getElementById('download');
// downloadButton.addEventListener('click', handleDownload);

// function handleDownload() {
//   var checkboxGroups = document.getElementsByClassName('checkbox-group');
//   var selectedItems = [];

//   for (var i = 0; i < checkboxGroups.length; i++) {
//     var checkbox = checkboxGroups[i].querySelector('input[type="checkbox"]');
//     var pathLabel = checkboxGroups[i].querySelector('label');
    
//     if (checkbox.checked) {
//       var rows = checkboxGroups[i].querySelectorAll('p');
//       var itemData = {
//         path: pathLabel.innerText,
//         data: []
//       };

//       for (var j = 0; j < rows.length; j++) {
//         var rowLabel = rows[j].innerText;
//         var rowElements = rowLabel.split(/\s+/);
//         var rowNumber = rowElements[0].substring(2);
//         var containText = rowElements.slice(1).join(' ').trim();
        
//         itemData.data.push({
//           row: rowNumber,
//           contain: containText
//         });
//       }

//       selectedItems.push(itemData);
//     }
//   }

//   // 调用生成下载文件的函数，传入选中的数据数组
//   generateDownloadFile(selectedItems);
// }

// function generateDownloadFile(selectedItems) {
//   var content = '';

//   selectedItems.forEach(function(item) {
//     content += item.path + '\r\n';
    
//     item.data.forEach(function(entry) {
//       content += '行号'+entry.row + '\t' + entry.contain + '\r\n';
//     });

//     content += '\r\n';
//   });

//   // 创建 Blob 对象并下载
//   if (window.navigator && window.navigator.msSaveBlob) {
//     var blob = new Blob([content], { type: 'text/plain' });
//     window.navigator.msSaveBlob(blob, 'selected_data.txt');
//   } else {
//     var downloadLink = document.createElement('a');
//     downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
//     downloadLink.download = 'selected_data.txt';

//     document.body.appendChild(downloadLink);
//     downloadLink.click();

//     // 清理临时资源
//     document.body.removeChild(downloadLink);
//   }
// }
