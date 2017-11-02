//グループ作成画面の表示切り替え
function allDayTableOpen()
{
  document.getElementById("toDayTodo").style.display="none";
  document.getElementById("allDayTodo").style.display="block";

  return null;
}

function toDayTableOpen()
{
  document.getElementById("allDayTodo").style.display="none";
  document.getElementById("toDayTodo").style.display="block";
  
  return null;
}