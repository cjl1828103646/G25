function browseFolder() {
		    try {
		        var Message = "\u8bf7\u9009\u62e9\u6587\u4ef6\u5939"; //选择框提示信息
		        var Shell = new ActiveXObject("Shell.Application");
		        var Folder = Shell.BrowseForFolder(0, Message, 64, 17); //起始目录为：我的电脑
		        //var Folder = Shell.BrowseForFolder(0, Message, 0); //起始目录为：桌面
		        if (Folder != null) {
		            Folder = Folder.items(); // 返回 FolderItems 对象
		            Folder = Folder.item(); // 返回 Folderitem 对象
		            Folder = Folder.Path; // 返回路径
		            if (Folder.charAt(Folder.length - 1) != "\\") {
		                Folder = Folder + "\\";
		            }
		            document.getElementById("savePath").value = Folder;
		            console.log("File path: " + Folder); 

		            		var s1="";
		            		s1=s1+getfiles(Folder);
		            		alert(s1);
		      
		            return Folder;
		        }
		    }
		    catch (e) {
		        alert(e.message);
		    }
		}
function getfiles(path){
    var fso=new ActiveXObject("Scripting.FileSystemObject");//创建文件系统对象
	var s=fso.GetFolder(path);//获取文件夹对象
	var fn=new Enumerator(s.files);
	var fn1=new Enumerator(s.SubFolders);
	
	var s1="";
	if (fn1!=null){s1=s1+getfolders(fn1);}
	
	
	for(;!fn.atEnd();fn.moveNext()){
		s1=s1+fn.item()+"\n";
	}
	return s1;
}

function getfolders(folder){
	var s1="";
	
	for(;!folder.atEnd();folder.moveNext()){
		fn1=folder.item();
		fn2=fn1.Path;
		s1=s1+getfiles(fn2);
	}		
	return s1;
}

//zsy
$("#button").on("click",onButtonClick);

function onButtonClick(){
	//$("#contain").show();
	
  const fileInput = document.getElementById("fileSelect");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (fileLoadedEvent) {
      const arrayBuffer = fileLoadedEvent.target.result;

      // 使用mammoth.js解析Word文档
      const options = { includeDefaultStyleMap: false };
      const result = mammoth.extractRawText({ arrayBuffer: arrayBuffer }, options);

      result.then(function (resultObject) {
        const fileContent = resultObject.value; // 提取到的纯文本内容
        const keyword = "成功"; // 要搜索的关键字

        const lines = fileContent.split("\n");
        const matches = [];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes(keyword)) {
            matches.push({
              lineNumber: i + 1,
              lineText: line.trim(),
            });
          }
        }

        displaySearchResults(matches);
      });
    };

    reader.readAsArrayBuffer(file);
  }
		
}

function displaySearchResults(matches) {
  const containDiv = $("#contain");
  containDiv.empty();

  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const messageDiv = $("<div>", { class: "message" });
      const filePathDiv = $("<div>", { class: "file_path", text: "文件路径" });
      const dividerDiv = $("<div>", { text: "-------------------------------" });
      const rowXDiv = $("<div>", { class: "row", text: "行号x" });
      const messageTextXDiv = $("<div>", { class: "message_text", text: match.lineText });
      const rowYDiv = $("<div>", { class: "row", text: "行号y" });
      const messageTextYDiv = $("<div>", { class: "message_text", text: match.lineText });

      messageDiv.append(filePathDiv, dividerDiv, rowXDiv, messageTextXDiv, rowYDiv, messageTextYDiv);
      containDiv.append(messageDiv);
    }
  } else {
    const messageDiv = $("<div>", { text: "没有找到匹配的结果" });
    containDiv.append(messageDiv);
  }

  containDiv.show();
}

