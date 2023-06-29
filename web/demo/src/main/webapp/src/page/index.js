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
var fso=new ActiveXObject("Scripting.FileSystemObject");
var f=fso.CreateTextFile("C://zsy2020212205114//web//demo//path.txt",true);//可随意选择后缀名
f.write(s1);
f.Close();

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

function sendData(path,callback){
  var arr ={
    "path":path
    };
  var json =JSON.stringify(arr);//使用JSON将对象转换成JSON格式数据
  var xhr = new XMLHttpRequest;

  xhr.open('post', 'server/readfile1.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send("data=" + json);//  Content-Type设置成application/x-www-form-urlencoded 的情况下，请求主体可以用key1=value1&key2=value2的形式发送数据
  xhr.onreadystatechange = function() {
       if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status ==304)){  //响应完成并且响应码为200或304
       //console.log(xhr.responseText);
      //  data = xhr.responseText;
      //  json=JSON.parse(data);
      callback(JSON.parse(xhr.responseText));
       }
  };

}

function go(){
  let dx = document.getElementsByName("menu");
  var responseArray = [];
  //var path = [];
  for(var i=0;i<dx.length;i++){
    if(dx[i].checked){
      //alert(dx[i].value);
      var t = document.getElementById("search");
      t.value=dx[i].value;

      sendData(dx[i].value, function(response) {
        console.log(response);
        responseArray = responseArray.concat(response);
        var menuread = document.getElementById("menuread");
        menuread.innerHTML="";
        for(var i=0;i<responseArray.length;i++){
          //back();
          creakradiobox(responseArray[i]);
        }
        console.log(responseArray);
        if(responseArray==[]){
          alert("没有更多啦！");
        } 
        });
      break;
    }
  }

}

function creakradiobox(name1){
  // var container = document.getElementById("menuread");
  var checkbox = document.createElement('input');

    checkbox.type = 'radio';
    checkbox.value = name1;
  checkbox.name = "menu";
  
    var checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', name1);
    checkboxLabel.textContent = name1;
  
    //var container = document.createElement('div');
    menuread.appendChild(checkbox);
    menuread.appendChild(checkboxLabel);

  var lineBreak = document.createElement('br');
  menuread.appendChild(lineBreak);

    return menuread;
}

function back(){
  var t = document.getElementById("search");
  var tx = t.value;
  var responseArray = [];
  if(tx=="请选择目录"){
    alert("已经到头啦")
  }  
  else if(tx=="C:"){
    location.reload(); 
  }
  else{
    var tx1 = tx.split('\\');
    tx1.pop();
    tx = tx1.join("\\");
    t.value=tx;
  sendData(tx, function(response) {
    console.log(response);
    responseArray = responseArray.concat(response); 
    var menuread = document.getElementById("menuread");
    menuread.innerHTML="";
    for(var i=0;i<responseArray.length;i++){
          //back();

      creakradiobox(responseArray[i]);
    }
    console.log(responseArray);
    });
      
    }
}
