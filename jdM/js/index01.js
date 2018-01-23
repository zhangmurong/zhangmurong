/*1. 在移动端开发不建议使用jquery */
/*1.1 jquery 特点  提高开发效率 兼容性好 IE678 */
/*1.2 体积大 jquery 1.0 90+kb  加载慢 */
/*1.3 不用jquery  H5在移动端支持很好 或者 使用轻量的库 zeptoJS */
window.onload = function () {
    search();
    banner();
    downTime();
}
/*顶部搜索*/
var search = function () {
    var searchBox = document.querySelector('.jd_search_box');
    /*1. 默认透明*/
    searchBox.style.background = 'rgba(201, 21, 35, 0)';
    var opacity = 0;
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;

    window.onscroll = function () {
        /*实时获取当前页面卷曲的高度*/
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //console.log(scrollTop);
        /*2. 在轮播图内滑动的时候 透明度随滚动的距离增大而变大*/
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        }
        /*3. 在轮播图外滑动的时候 透明度保持最大的时候不变*/
        else {
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201, 21, 35, ' + opacity + ')';
    }
}
/*轮播图*/
var banner = function () {
    /*1. 自动轮播功能  无缝滚动 滑动无缝 */
    // 定时器  过渡+位移  监听过渡结束事件 判断索引 如果索引是9 瞬间定位到1 如果索引是0 瞬间定位到8
    /*2. 点指示器 对应图片进行更改 */
    /*3. 实现轮播图滑动效果 */
    /*4. 实现滑动距离不超过三分之一 吸附效果*/
    /*5. 实现滑动距离超过三分之一  切换当前图片 根据方向 右滑 上一张  左滑 下一张 */
    /*6. 实现速度比较快的时候也能趋切换当前图片 根据方向 右滑 上一张  左滑 下一张*/

    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    /*轮播图容器*/
    var imageBox = banner.querySelector('ul:first-child');

    var index = 1;
    var timer = setInterval(function () {
        index ++;
        /*实现动画*/
        /*加过渡*/
        imageBox.style.transition = 'all 0.3s';
        imageBox.style.webkitTransition = 'all 0.3s';
        /*加位移*/
        imageBox.style.transform = 'translateX('+(-index*width)+'px)';
        imageBox.style.webkitTransform = 'translateX('+(-index*width)+'px)';
    },1000);

    imageBox.addEventListener('transitionend',function () {
        console.log(index);
        if(index >= 9){
            index = 1;
            /*瞬间定位当第一张*/
            /*去除过渡*/
            imageBox.style.transition = 'none';
            imageBox.style.webkitTransition = 'none';
            /*做定位*/
            imageBox.style.transform = 'translateX('+(-index*width)+'px)';
            imageBox.style.webkitTransform = 'translateX('+(-index*width)+'px)';
        }else if(index <= 0){
            index = 8;
            /*瞬间定位当第八张*/
            /*去除过渡*/
            imageBox.style.transition = 'none';
            imageBox.style.webkitTransition = 'none';
            /*做定位*/
            imageBox.style.transform = 'translateX('+(-index*width)+'px)';
            imageBox.style.webkitTransform = 'translateX('+(-index*width)+'px)';
        }
    });

}
/*倒计时*/
var downTime = function () {

}