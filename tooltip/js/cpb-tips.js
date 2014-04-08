/*!
 * CPB Library
 * @Descript	: tips 网页提示框
 * @Author		:  zhoujie  1493820332@qq.com
 * @Depend		: jquery.js(1.7 or later)
 * $Id: cpb-dialog.js  2013-08-5 19:12:52 $:
 */
$.cpb_tips = {
    show: function (option) {
        var opt = {
            style: 'white',        // white(白色), lightYellow(浅黄) deepGreen (深绿) radius(圆角)
            direction: 'top',        //提示框位置：top、bottom、left、right
            arrows_place: '50%',      //箭头位置
            msg: '',
            tips_id: '',             //id为空时,页面公共维护使用一个提示框;不为空时,则单独使用 (暂未使用)
            obj: '',
            width:'auto',
            height:'auto'
        };
        $.extend(opt, option);
        if(opt.obj == ''){
             return;
        }
        var objH = opt.obj[0].offsetHeight;
        var objW = opt.obj[0].offsetWidth;
        var pos = this.getObjPos(opt.obj[0]);
        var x, y,arrow,style,arrows_place,radius_tpl = '';
        switch (opt.direction){
            case 'top':
                x = pos.x;
                y = pos.y - objH - 10;
                arrow = 'bottom';
                arrows_place = 'style="left:'+opt.arrows_place+'"';
                break;
            case 'bottom':
                x = pos.x;
                y = pos.y + objH + 10;
                arrow = 'top';
                arrows_place = 'style="left:'+opt.arrows_place+'"';
                if(opt.style == 'radius'){
                    y += 4;
                }
                break;
            case 'left':
                x = pos.x;
                y = pos.y;
                arrow = 'right';
                arrows_place = 'style="top:'+opt.arrows_place+'"';
                break;
            case 'right':
                x = pos.x + objW + 10;
                y = pos.y;
                arrow = 'left';
                arrows_place = 'style="top:'+opt.arrows_place+'"';
                if(opt.style == 'radius'){
                    x += 4;
                }
                break;
        }
        switch (opt.style){
            case 'lightYellow':
                style = '';
                break;
            case 'white':
                style = 'x-tooltip-alt';
                break;
            case 'deepGreen':
                style = 'x-tooltip-highlight';
                break;
            case 'radius':
                style = 'x-tooltip-radius';
                radius_tpl =  '<span class="x-tooltip-top-radius"></span>'
                             +'<span class="x-tooltip-bottom-radius"></span>'
                             +'<span class="x-tooltip-left-radius"></span>'
                             +'<span class="x-tooltip-right-radius"></span>'
                             +'<span class="x-tooltip-left-top-radius"></span>'
                             +'<span class="x-tooltip-right-top-radius"></span>'
                             +'<span class="x-tooltip-left-bottom-radius"></span>'
                             +'<span class="x-tooltip-right-bottom-radius"></span>';
                break;
        }
        var $tpl = $('<div class="x-tooltip '+ style +'" style="position:absolute;z-index:9999;left:'+ x +'px;top:'+y+'px;width:'+opt.width+';height:'+opt.height+'">'
                        +'<span class="x-tooltip-container">'+opt.msg+'</span>'
                        +'<a class="x-tooltip-close" href="javascript:;" onclick="$(this).parent().remove();">×</a>'
                        +'<div class="x-tooltip-arrow x-tooltip-arrow-'+arrow+'"'+ arrows_place +'></div>'
                        +radius_tpl
                   +'</div>');
        $tpl.appendTo("body");
        //如果是左边 重新获取宽度
        if(opt.direction == "left"){
            $tpl.css('left',pos.x - $tpl.width() - 15);
        }
        //如果是圆角 设置提示框宽度，处理ie6下width=100%bug
        if(opt.style == 'radius' && $.browser.msie && $.browser.version == '6.0'){
            $tpl.css('width',$tpl.width()+5);
            $tpl.css('height',$tpl.height());
        }
    },
    //获取元素的位置
    getObjPos: function (aTarget) {
        var target = aTarget;
        var pos = {x: target.offsetLeft, y: target.offsetTop};
        target = target.offsetParent;
        while (target) {
            pos.x += target.offsetLeft;
            pos.y += target.offsetTop;
            target = target.offsetParent;
        }
        return pos;
    }
};
