/*
  思路：
    第一步：获取要操作的节点对象 左侧的类名为leftBox的div节点对象、获取id为_tool的小黄盒子、右侧的id为_rightBox的div节点对象、大图片节点对象
    第二步：给leftBoxNode绑定onmouseenter 和 onmosueleave事件实现对小黄和右侧盒子的隐藏和显示
    第三步：给leftBoxNode绑定onmousemove，实现小黄盒子跟着移动
*/

//第一步：获取要操作的节点对象 左侧的类名为leftBox的div节点对象、获取id为_tool的小黄盒子、右侧的id为_rightBox的div节点对象、大图片节点对象
var leftBoxNode = document.querySelector('.leftBox'); //左侧区域的盒子节对象
var toolNode = document.querySelector('#_tool'); //小黄盒子节点对象
var rightBoxNode = document.querySelector('#_rightBox'); //左侧区域的盒子节对象
var bImgNode = document.querySelector('#_bImg'); //大图片

//第二步：给leftBoxNode绑定onmouseenter 和 onmosueleave事件实现对小黄和右侧盒子的隐藏和显示
leftBoxNode.onmouseenter = function(){
  //显示
  toolNode.className = 'tool active';
  rightBoxNode.className = 'rightBox active';
};

leftBoxNode.onmouseleave = function(){
  //隐藏
  toolNode.className = 'tool';
  rightBoxNode.className = 'rightBox';
};


//第三步：给leftBoxNode绑定onmousemove，实现小黄盒子跟着移动
leftBoxNode.onmousemove = function(e){
  //得到事件对象
  var _e = window.event||e;
  var x = _e.clientX - leftBoxNode.offsetLeft-toolNode.offsetWidth/2;
  if(x<0){
    x = 0;
  }
  if(x>leftBoxNode.offsetWidth-toolNode.offsetWidth){
    x = leftBoxNode.offsetWidth-toolNode.offsetWidth;
  }
  var y = _e.clientY - leftBoxNode.offsetTop-toolNode.offsetHeight/2;
  if(y<0){
    y = 0;
  }
  if(y>leftBoxNode.offsetHeight-toolNode.offsetHeight){
    y = leftBoxNode.offsetHeight-toolNode.offsetHeight;
  }
  //更改小黄的坐标
  toolNode.style.left = x + 'px';
  toolNode.style.top = y + 'px';

  bImgNode.style.left = -2*x + 'px';
  bImgNode.style.top = -2*y + 'px';


};



