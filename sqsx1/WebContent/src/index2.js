
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
		fn2=fn.item();
		if(boolfile(fn2.Path)!= false){
			s1=s1+fn.item()+"\n";
		}
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

function isAssetTypeAnImage(ext) {
	 return [
	 'doc', 'pdf','docx'].
	 indexOf(ext.toLowerCase()) !== -1;
	}
function boolfile(filePath){
	//获取最后一个.的位置
	var index= filePath.lastIndexOf(".");
	//获取后缀
	var ext = filePath.substr(index+1);
	//判断是否是图片
	return isAssetTypeAnImage(ext);
}

function tohtml(path){
	   var oWordApp=new ActiveXObject("Word.Application");      
	    var oDocument=oWordApp.Documents.Open(path);      
	    oDocument.SaveAs("C://Users//cjl//Desktop//test.html", 10)  
}

function converToPlain(html){
	//新创建一个div
	var tempDivElement = document.createElement("div");
	//设置HTML给它
	tempDivElement.innerHTML=html;
	//获取文本内容
	return tempDivElement.textContent || tempDivElement.innerText || "";
}

function zhuanhuan(){
	tohtml("C://Users//cjl//Desktop//hhh1.docx");
	console.log(converToPlain("C://Users//cjl//Desktop//test.html"));
}


function readText(){
   var file=document.getElementById("file").files[0];
    var reader=new FileReader();
    reader.readAsText(file,'gb2312');
    reader.onload=function(){
        document.getElementById("content").innerHTML=reader.result;
        var res=document.getElementById("content").innerText;
        res=res.replace(/<[^>]+>/g,"");
        res=res.replace(/\{.*?\}/g,"");
        
        console.log(res);
    }
}
