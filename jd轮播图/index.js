/*
  第一步：获取所要操作的节点对象 左右两个按钮、一组li节点对象、一组内容项、代表整个轮播图的banner

  第二步：定义一个全局变量表示当前显示的是哪一个内容项。

  第三步：给右侧按钮绑定onclick事件，不断的更改代表当前内容项的那个全局变量 每次要+1 【要有限制】

  第四步：给左侧按钮绑定onclick事件，不断的更改代表当前内容项的那个全局变量 每次要-1  【要有限制】

  第五步：循环遍历给每一个代表小点按钮的li绑定onmouseenter事件，以及给每个li节点对象添加一个属性xiaBiao代表当前li在伪数组中位置【目的：和内容项产生关联】

  第六步：在onmouseenter事件中，先把所有的li和内容项恢复到原来的状态，然后再更改自身。

 第七步：用setInterval产生一个定时器，每间隔2000毫秒切换下一项

 第八步：给banner绑定onmouseenter事件，停止定时器
 第九步：给banner绑定onmouseleave事件，产生定时器
*/

//第一步：获取所要操作的节点对象 左右两个按钮、一组li节点对象、一组内容项、代表整个轮播图的banner
var leftBtnNode = document.querySelector('.leftBtn');
var rightBtnNode = document.querySelector('.rightBtn');
var itemsNode = document.querySelectorAll('.content .item');
var lisNode = document.querySelectorAll('.banner li');
var bannerNode = document.querySelector('.banner');

//第二步：定义一个全局变量表示当前显示的是哪一个内容项。
var index = 0;

//第三步：给右侧按钮绑定onclick事件，不断的更改代表当前内容项的那个全局变量 每次要+1 【要有限制】
rightBtnNode.onclick = function(){
  index++;
  //console.log(index)
  //限制
  if(index==lisNode.length){
    index = 0;
  }
  console.log(index)
  //切换轮播项
  for(var j = 0;j<lisNode.length;j++){
    lisNode[j].className = '';
    itemsNode[j].className = 'item';
  }
  lisNode[index].className = 'active';
  itemsNode[index].className = 'item active';

};

//第四步：给左侧按钮绑定onclick事件，不断的更改代表当前内容项的那个全局变量 每次要-1  【要有限制】
leftBtnNode.onclick = function(){
  index--;
  //console.log(index)
  //限制：
  if(index<0){
    index = lisNode.length-1;
  }
  //console.log(index)
  //切换轮播项
  for(var j = 0;j<lisNode.length;j++){
    lisNode[j].className = '';
    itemsNode[j].className = 'item';
  }
  lisNode[index].className = 'active';
  itemsNode[index].className = 'item active';
};


// 第五步：循环遍历给每一个代表小点按钮的li绑定onmouseenter事件，以及给每个li节点对象添加一个属性xiaBiao代表当前li在伪数组中位置【目的：和内容项产生关联】
for(var i = 0;i<lisNode.length;i++){
  lisNode[i].num = i;
  lisNode[i].onmouseenter = function(){
    //第六步：在onmouseenter事件中，先把所有的li和内容项恢复到原来的状态，然后再更改自身。
    for(var j = 0;j<lisNode.length;j++){
      lisNode[j].className = '';
      itemsNode[j].className = 'item';
    }
    index = this.num;
    lisNode[index].className = 'active';
    itemsNode[index].className = 'item active';
  }
}

//第七步：用setInterval产生一个定时器，每间隔2000毫秒切换下一项
var flag = setInterval(function(){
  rightBtnNode.onclick();
},2000);

//第八步：给banner绑定onmouseenter事件，停止定时器
bannerNode.onmouseenter = function(){
  clearInterval(flag);
};

// 第九步：给banner绑定onmouseleave事件，产生定时器
bannerNode.onmouseleave = function(){
  flag = setInterval(function(){
    rightBtnNode.onclick();
  },3000);

};
