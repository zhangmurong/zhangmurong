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
    // 在滚动动画结束的时候根据当前索引去找到对应的点 进行类的修改
    /*3. 实现轮播图滑动效果 */
    // 监听touch相关事件
    // 实时的获取计算 开始的位置  和滑动的位置 之间的改变
    // 然后把改变的位置设置给轮播图容器
    // 这样的就是滑动

    /*4. 实现滑动距离不超过三分之一 吸附效果*/
    /*5. 实现滑动距离超过三分之一  切换当前图片 根据方向 右滑 上一张  左滑 下一张 */
    /*6. 实现速度比较快的时候也能趋切换当前图片 根据方向 右滑 上一张  左滑 下一张*/

    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    /*轮播图容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');


    var addTransition = function () {
        /*加过渡*/
        imageBox.style.transition = 'all 0.3s';
        imageBox.style.webkitTransition = 'all 0.3s';
    }
    var removeTransition = function () {
        /*去除过渡*/
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        /*加位移*/
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }

    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*实现动画*/
        /*加过渡*/
        addTransition();
        /*加位移*/
        setTranslateX(-index * width);
    }, 4000);

    imageBox.addEventListener('transitionend', function () {
        //console.log(index);
        if (index >= 9) {
            index = 1;
            /*瞬间定位当第一张*/
            /*去除过渡*/
            removeTransition();
            /*做定位*/
            setTranslateX(-index * width);
        } else if (index <= 0) {
            index = 8;
            /*瞬间定位当第八张*/
            /*去除过渡*/
            removeTransition();
            /*做定位*/
            setTranslateX(-index * width);
        }
        /*实现点切换  index 的取值范围  1-8 */
        /*点的索引  0-7  索引的对应减一  如果是序号去寻找  1-8 */
        pointBox.querySelector('li.now').classList.remove('now');
        pointBox.querySelectorAll('li')[index - 1].classList.add('now');
        //pointBox.querySelector('li:nth-child('+index+')').classList.add('now');
    });

    /*滑动效果*/
    var startX = 0;
    var distanceX = 0;
    var startTime = 0;
    imageBox.addEventListener('touchstart', function (e) {
        /*清除定时器*/
        clearInterval(timer);
        startX = e.touches[0].clientX;
        startTime = Date.now(); // new Date().getTime(); 获取的是1970年到现在的毫秒数  时间戳
    });
    imageBox.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        /*计算将要给图片盒子的定位*/
        /*基于当前的定位去计算*/
        var translateX = -index * width + distanceX;
        /*去过渡*/
        removeTransition();
        /*定位*/
        setTranslateX(translateX);
    });
    imageBox.addEventListener('touchend', function (e) {
        if (Math.abs(distanceX) < width / 3) {
            /*根据速度切换  速度 = 滑动的距离 / 滑动的时间  v = d / t */
            var endTime = Date.now();
            var time = endTime - startTime;
            var v = Math.abs(distanceX) / time; // px/ms
            if (v >= 0.2) {
                /*很快*/
                /*切换当前图片 根据方向 右滑 上一张  左滑 下一张*/
                if (distanceX > 0) {
                    /*右滑*/
                    index--;
                } else {
                    /*左滑*/
                    index++;
                }
                /*根据当前索引去动画的定位*/
                addTransition();
                setTranslateX(-index * width);
            } else {
                /*吸附*/
                /*回到原来的位置 */
                addTransition();
                setTranslateX(-index * width);
            }
        } else {
            /*切换当前图片 根据方向 右滑 上一张  左滑 下一张*/
            if (distanceX > 0) {
                /*右滑*/
                index--;
            } else {
                /*左滑*/
                index++;
            }
            /*根据当前索引去动画的定位*/
            addTransition();
            setTranslateX(-index * width);
        }

        /*加上定时器*/
        clearInterval(timer);//严谨操作
        timer = setInterval(function () {
            index++;
            /*实现动画*/
            /*加过渡*/
            addTransition();
            /*加位移*/
            setTranslateX(-index * width);
        }, 4000);
    });

}
/*倒计时*/
var downTime = function () {
    /*1. 模拟倒计时的时间  6小时*/
    /*2. 每隔一秒把剩余的时间 转换一下  显示在容器内容*/
    var spans = document.querySelectorAll('.sk_time span');
    var time = 6 * 3600;
    var timer = setInterval(function () {
        time--;
        /*格式化*/
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);
        /*显示在容器内*/
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
        if(time <= 0){
            clearInterval(timer);
        }
    }, 1000);
}