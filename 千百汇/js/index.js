$(function() {
    // 初始化fullpage插件
    // 如果需求有更多功能 传参
    $('.container').fullpage({
        // 配置参数
        // 设纵向切换的每一屏颜色
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        // 插件中默认是顶部对其的
        verticalCentered:false,
        // 实现指示器 就是右侧的导航
        navigation:true,
        // 点击更多more 切换到下一屏，切换过程中隐藏 切换完淡入显示
        // 切换到下一屏 用插件实现
        // 绑定点击事件  必须等插件初始化成功后操作 
        afterRender:function(){
            var $this=this;
            $('.more').on('click',function(){
                // 需要找到当前操作的jQuery对象检查是否可以调用moveSectionDown();这个函数
                // $.fn 扩展有个jquery没有的方法  称为插件方法$.fn.fullpage
                // 发现moveSectionDown是在$.fn.fullpage下的方法
                $.fn.fullpage.moveSectionDown();
            });  
            $('.section:eq(3) .cart').on('animationend', function () {
                /*显示另一个文字*/
                $('.section:eq(3) .text img').eq(0).hide().next('img').fadeIn();
                /*显示输入地址的区域*/
                /*fadeIn() slow 200 normal 400  fast 600  默认normal  */
                $('.section:eq(3) .address').fadeIn(1000, function () {
                    /*显示地址*/
                    $('.section:eq(3) .address img:eq(1)').fadeIn();
                });
            });
            $('.section:eq(7)').on('mousemove',function (e) {
                $('.section:eq(7) .hand').css({
                    left:e.clientX,
                    top:e.clientY+20
                });
            })
            // 点击返回按钮的时候 重置全部动画
            $('.section:eq(7) .again').on('click',function () {
                $.fn.fullpage.moveTo(1);
                // 删除之前加的now 和fadeIn
                $('.section.now').removeClass('now');
                $('.section .animated').removeClass('animated');
                $('.section [style]').removeAttr('style');
            })
           },
        //  离开当前屏幕的时间点 隐藏“更多”的按钮  插件文档中有这个方法
        onLeave: function (index,nextIndex,direction) {
            $('.more').hide();
            if(index==2 && nextIndex==3){
                $('.section:eq(1)').find('.sofa').addClass('animated');
            }
            // 第三屏沙发掉下来
            else if(index==3 && nextIndex==4){
                $('.section:eq(2)').find('.sofa').addClass('animated');
            }
            // 第五屏的沙发调到第六屏上
            else if(index==5 && nextIndex==6){
                $('.section:eq(4)').find('.sofa').addClass('animated');
                $('.section:eq(5)').find('.box').addClass('animated');
            }
                
       },
       afterLoad:function(link,i){
           if(i!=8){
                $('.more').fadeIn();
           }
         
          this.addClass('now');
        //   第七屏 星星动画
        if(i==7){
            $('.star img').each(function (i,item) {
                $(item).delay(i*500).fadeIn();
            });
        }
      },
    //   更改插件中的每屏的切换时间
      scrollingSpeed:1000
    });

});