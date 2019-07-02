/*修改只需在这一部分中添加 
1.包含一行所有数据的对象
2.一级字段id对象（唯一）
3.二级字段id对象
4.三级字段id对象 
*/
//一行系统的对象
var tr1 = new TableItems('心血管系统',
['胸痛，胸闷','心悸','瓣膜病变','杂音','高血压','心梗','易疲劳，气紧','心肌病'],
[
    {
        //胸痛，胸闷
        '是否确诊冠心病':['否','二级医院','三级医院'],
        '病史（年）':['&lt;1','1-5','5-10','&gt;10'],
        '冠造或冠脉CT':['未做','未见狭窄','左主干','右主干','单支','多支','其他'],
        '冠脉狭窄程度':['&lt;30%','30%-50%','50%-75%','&gt;75%','完全闭塞','其他'],
        '治疗情况':['未正规治疗','药物治疗','置入冠脉支架','开胸搭桥手术'],
        '心绞痛分级':['Ⅰ','Ⅱ','Ⅲ','Ⅳ','不清楚'],
    },
    {
        //心悸
        '生理性':['剧烈运动','精神紧张','食物相关','药物相关','妊娠','其他'],
        '病理性':['心室肥大','心律失常','心衰','甲亢','贫血','发热','嗜铬细胞瘤','心脏神经官能症','其他']
    },
    {
        //瓣膜病变
        '病史（年）':['&lt;5','5-10','&gt;10'],
        '瓣膜病变1':['MS','MI','轻度','中度','重度'],
        '瓣膜病变2':['AS','AI','轻度','中度','重度'],
        '治疗情况':['未正规治疗','药物治疗','手术治疗'],
        '心功能':['Ⅰ','Ⅱ','Ⅲ','Ⅳ'],
    },
    {
        //杂音
        '病史（年）':['&lt;5','5-10','&gt;10'],
        '类型':['房缺','室缺','动脉导管未闭ASD','法洛四联症','主动脉缩窄','肺动脉狭窄'],
        '肺动脉高压':['无','轻度','中度','重度'],
        '分流':['右向左','左向右','双向'],
        '治疗情况':['未正规治疗','药物治疗','手术治疗'],
        '心功能':['Ⅰ','Ⅱ','Ⅲ','Ⅳ'],
    },
    {
        //高血压
        '病史（年）':['&lt;5','5-10','&gt;10'],
        '控制情况':['未正规治疗','良好','一般','差'],
        '靶器官受损':['心肌肥厚或扩张','脑血管病变','肾功能受损','视网膜受损','冠脉病变'],
        '是否服用利血平类药物':['是','否'],
        '是否服用可乐定类药物':['是','否'],
    },
    {
        //心梗
        '病史（月）':['&lt;3月','3-6月','6-12月','&gt;12月'],
        '治疗情况':['PCI','溶栓','CABG','其他'],
        '目前心功能':['Ⅰ','Ⅱ','Ⅲ','Ⅳ'],
    },
    {
        //易疲劳，气紧
        '病史（年）':['&lt;1','1-5','5-10','&gt;10'],
        '目前心功能':['Ⅰ','Ⅱ','Ⅲ','Ⅳ'],
    },
    {
        //心肌病
        '分类':['扩心病','梗阻性肥厚型心肌病','非梗阻性肥厚型心肌病','限制性心肌病'],
        '目前心功能':['Ⅰ','Ⅱ','Ⅲ','Ⅳ'],
    },
],
{
    //多选三级字段
    '心悸':['生理性','病理性'],
    '高血压':['靶器官受损'],

}
);

var tr2 = new TableItems('肺和呼吸',['吸烟，戒烟','慢支炎，肺气肿，COPD','肺炎','气管炎，急性上呼吸道感染，急性气管-支气管炎','哮喘','TB','阻塞性呼吸睡眠暂停低通气综合征'],
[
    {
        //吸烟，戒烟
        '时间（年）':['1-5','5-10','&gt;10'],
        '平均吸烟量（支/天）':['&lt;5','5-10','10-20','&gt;20'],
        '戒烟（周）':['&lt;2','2-8','&gt;8'],
    },
    {
        //慢支炎，肺气肿，COPD
        '病史（年）':['&lt;5','5-10','&gt;10'],
        '气流受限程度（FEV1占预测值百分比）':['≥80','50-79','30-49','&lt;30'],
        '呼吸困难分级':['无呼吸困难','平地快走或爬缓坡时出现呼吸困难','平地行走时比同龄人慢或需要停下来休息','平地行走100米左右或数分钟后即需要停下来喘气','穿衣脱衣、静息时即出现呼吸困难'],
        '肺部听诊':['无干湿啰音','少量干、湿啰音','中量干、湿啰音','大量干、湿啰音','呼吸音低'],
        '稳定期OR急性期':['稳定期','咳嗽咳痰增多','呼吸困难加重','喘息加重'],
        '并发症':['无','呼吸衰竭','肺大泡或气胸','肺源性心脏病'],
        '治疗情况':['未治疗','治疗，但未长期规范化治疗','长期规范化治疗','家庭氧疗'],
    },
    {
        //肺炎
        '是否痊愈':['是','否'],
    },
    {
        //气管炎，急性上呼吸道感染，急性气管-支气管炎
        '病史（天）':['&lt;1','1-7','7-14','&gt;14',],
        '症状':['鼻咽部症状','咳嗽、咳痰','全身中毒症状'],
        '体征':['无','发热','肺部干、湿啰音','呼吸音低'],
        '治疗':['未治疗','抗菌素治疗','对症治疗'],
    },
    {
        //哮喘
        '病史（年）':['&lt;5','5-10','&gt;10'],
        '哮喘症状控制水平':['哮喘少有发作','哮喘有时发作','哮喘有时发作','哮喘每天发作','哮喘每天发作，近6个月有加重'],
        '肺部听诊':['无干湿啰音','少量干、湿啰音','中量干、湿啰音','大量干、湿啰音','呼吸音低'],
        '治疗情况':['未治疗','治疗，但未长期规范化治疗','长期规范化治疗'],
    },
    {
        //TB
        '是否痊愈':['是','否'],
        '痰涂片':['单次阴性','多次阴性','阳性'],
        '抗结核治疗':['未治疗','进行中','抗结核治疗结束&lt;6个月','抗结核治疗结束&gt;6个月'],
    },
    {
        //阻塞性呼吸睡眠暂停低通气综合征
        '是否确诊':['临床症状和体征提示OSAS可能','多导睡眠图确诊的OSAS'],
        '病情程度':['轻度','中度','重度'],
        '治疗情况':['未治疗','无创通气治疗','手术治疗'],
    },
],
{
    //多选三级字段
    

}
);
var tr3 = new TableItems('泌尿生殖',['尿毒症','血尿','肾功能不全','月经'],
[
    {
        //尿毒症
        '替代治疗':['未透析','血透','腹透','肾移植'],
        '透析频次（次/周）':['1','2','3','4'],
        '每日尿量（ml）':['&lt;100','100-400','400-1500','&gt;1500'],
        '并发症':['高血压','心衰','贫血','钙磷异常','凝血异常','心律失常'],
    },
    {
        //血尿
        '是否痊愈':['是','否'],
    },
    {
        //肾功能不全
        '肌酐水平':['&lt;177','177-444','445-707','&gt;707'],
        '每日尿量（ml）':['&lt;100','100-400','400-1500','&gt;1500'],
        '并发症':['高血压','心衰','贫血','钙磷异常','高钾','凝血异常','心律失常'],
        '治疗情况':['未正规治疗','药物治疗','血透','腹透','肾移植'],
    },
    {
        //月经
        '月经量':['正常','偏多'],
        '是否妊娠':['是','否'],
    },
],
{
    //多选三级字段
    '尿毒症':['并发症',],
    '肾功能不全':['并发症',],

}
);
var tr4 = new TableItems('肝胆胃肠',['肝病','反流','胃潴留','溃疡'],
[
    {
        //肝病
        '是否痊愈':['是','否'],
        '并发症':['肝硬化','食管胃底静脉曲张出血','门脉高压','脾大','腹水','肝性脑病','凝血异常','低蛋白血症'],
        'Clild分级':['A','B','C'],
    },
    {
        //反流
        '治疗情况':['未治疗','正规治疗'],
        '是否痊愈':['是','否'],
    },
    {
        //胃潴留
        '病因':['幽门梗阻','手术相关胃动力障碍','糖尿病相关胃瘫'],
        '治疗情况':['未治疗','正规治疗'],
        '是否痊愈':['是','否'],
    },
    {
        //溃疡
        '是否痊愈':['是','否'],
    },
],
{
    //多选三级字段
    '肝病':['并发症',],

}
);
//每一行对象的列表
let itemsclasslist = [tr1,tr2,tr3,tr4];

/** 需修改部分到此截止 **/

let queue0 = function(num){
    let result = '';
    for(i=0;i<num;i++){
        result+='0';
    }
    return result;
}

//一级字段id对象 在整个页面中唯一
var firstclassid = new ID1st2nd('一级菜单',queue0(itemsclasslist.length),1);
//一级字段名称列表
let firstclasslist = new Array();
//二级字段id对象列表
let handlelist = new Array();
//三级字段id对象矩阵
let thirdclassmatrix = new Array();

for(let index in itemsclasslist) {
    //一级字段名称列表赋值
    firstclasslist[index] = itemsclasslist[index].firstclass;
    //二级字段id对象列表赋值
    handlelist[index] = new ID1st2nd(itemsclasslist[index].firstclass,queue0(itemsclasslist[index].secondclass.length),2);
    //二维数组定义
    thirdclassmatrix[index] = new Array();
    for(let key in itemsclasslist[index].secondclass){
        let len = 0;
        for(let i in itemsclasslist[index].thirdclass[key]){
            len += itemsclasslist[index].thirdclass[key][i].length;
        }
        //三级字段id对象矩阵赋值
        thirdclassmatrix[index][key] = new ID3rd(itemsclasslist[index].secondclass[key],queue0(len));
    }
}

$(function() {
    // $("#test").hide();
    // $("#test3").hide();
    // $("#test2").hide();
    console.log("页面数据：" );console.log(a);
        $.magicBtn('#btnSection1',{
            buttonType: 'material',
        });
        $.magicBtn('#btnSection2',{
            buttonType: 'material',
        });
        $("#button").hide();
        $('#button').click(function(){
            if(clickBtn1 == 'true') {
                submit2();
                clickBtn1 = 'false';
            };
    
            if(clickBtn2 == 'true') {
                clickBtn2 = 'false';
            } else {
                clickBtn2 = 'true';
            }
        });
        $('#button2').click(function(){
            if(clickBtn3 == 'true') {
                 myhttp.updaterequest();
                clickBtn3 = 'false';
            };
    
            if(clickBtn4 == 'true') {
                clickBtn4 = 'false';
            } else {
                clickBtn4 = 'true';
            }
        });
    // let inputbox = "<input type='text' name='patient_num' class='patient_num' placeholder='测试框：输入病床号'/>";
    // let httpbutton1 = "<button class=\"query\">测试按键：获取</button>";
    // let httpbutton2 = "<button class=\"update\">测试按键：提交</button>";
    // $(".secondcontent").before(inputbox,httpbutton1);
    // $(".secondcontent").after(httpbutton2);

    let myhttp = new HttpRequest();
    $(".query").click(function(){
        myhttp.setpatientnum($(".patient_num").val().toString());
        myhttp.queryrequest();
    });
    // $(".update").click(function(){
    //     myhttp.updaterequest();
    // });

    //渲染输入的多个整行对象
    for(tr of itemsclasslist) {
        tr.initclassview();
    }
    
    //初始化配置各选项
    firstclassid.loadidcfg();
    for(let index in itemsclasslist) {
        itemsclasslist[index].initidcfg(handlelist[index],handlelist[index].queue);
    }
});
var debug = false;

(function ( $ ) {

    $.magicBtn = function(selector, options) {

        var settings = $.extend({
            buttonType: '',
            rounded: false,
            fill: false
        }, options);

        if(settings.buttonType != '' && settings.buttonType != 'material' && settings.buttonType != 'outline') {
            settings.buttonType = 'material';
        }

        if(settings.buttonType != '') {
            var selector = selector + ' button';
            jQuery(selector).each(function () {
                jQuery(this).addClass('magicBtn');
                jQuery(this).addClass(settings.buttonType);
            });
        }

        if(settings.buttonType == 'outline' && settings.fill){
            //Add hover property
            jQuery(selector).each(function () {
                jQuery(this).addClass('fill');
            });
        }

        if(settings.rounded) {
            jQuery(selector).each(function () {
                jQuery(this).addClass('round');
            });
        }

        // 第一次点击-文字变为提交中，loadingIcon变为true,并添加icon: '<i class="fas fa-spinner fa-spin fa-1x fa-fw"></i>',
        $.fn.startLoading = function (options) {
           
            $(this).attr('data-initial-text', $(this).text());
            var settings = $.extend({
                loadingText: '提交中...',
                //Icon options
                loadingIcon: true,
                icon: '<i class="fas fa-spinner fa-spin fa-1x fa-fw"></i>',
            }, options );
            $(this).text(settings.loadingText);
            if(settings.loadingIcon) {
                $(this).append(settings.icon);
            }
         
            return this;

        }

        // 第二次点击，输入option={status:'XXX'}，可为success / warning / error
        $.fn.resultLoading = function (options) {
            //防止startLoading没有启用，如果没启用就添加data-initial-text属性，内容为空
            if($(this).attr('data-initial-text') === undefined) {
                var initialText = $(this).text();
                $(this).attr('data-initial-text',initialText);
            }
            // 初始化button属性：initialText，status，statusText，statusIcon，disabled，并把输入的option代入status
            var settings = $.extend({
                initialText: $(this).attr('data-initial-text'),
                status: 'success',
                statusText: '',
                statusIcon: '',
                disabled: false,
            }, options);

            // 根据settings.status抛出异常状况
            if( settings.status != 'success' &&
                settings.status != 'warning' &&
                settings.status != 'error'
            ) {
                throw new Error('resutLoading must be one of: success,warning,error');
            }

            var disabledFunction = function (element) {
                element.attr('disabled',true);
                element.addClass('disabled');
            }

            //status=success时
            if(settings.status == 'success') {

                if(settings.statusText == '') { settings.statusText = '已成功上传，点击再次上传';}
                if(settings.statusIcon == '') { settings.statusIcon = '';}

                $(this).text(settings.statusText).append(settings.statusIcon);
                $(this).addClass('success');

                if(settings.disabled) {
                    disabledFunction($(this));
                }

                return this;
            }
            // status=warning时
            if(settings.status == 'warning') {

                if(settings.statusText == '') { settings.statusText = '检测到使用者为坤坤，禁止访问';}
                if(settings.statusIcon == '') { settings.statusIcon = '';}

                $(this).text(settings.statusText).append(settings.statusIcon);
                $(this).addClass('warning');

                if(settings.disabled) {
                    disabledFunction($(this));
                }

                return this;
            }
            // status=error时
            if(settings.status == 'error') {

                if(settings.statusText == '') { settings.statusText = '上传失败,点击再次上传';}
                if(settings.statusIcon == '') { settings.statusIcon = '';}

                $(this).text(settings.statusText).append(settings.statusIcon);
                $(this).addClass('error');

                if(settings.disabled) {
                    disabledFunction($(this));
                }

                return this;
            }

            //Default action
            $(this).text(settings.initialText);

            if(settings.disabled) {
                disabledFunction($(this));
            }

            return this;
        }

        $.fn.removeLoading = function (options) {

            var settings = $.extend({
                //Initial text
                text: $(this).attr('data-initial-text'),

            }, options);

            //Default action
            $(this).text(settings.text);
            $(this).removeClass('success warning error');
            return this;

        }

        $.fn.disabled = function() {
            $(this).addClass('disabled');
            $(this).attr('disabled',true);
            return this;
        }

        $.fn.fillUpButton = function(e) {

            var target = e.target;
            var rect = target.getBoundingClientRect();
            var ripple = target.querySelector('.ripple');

            $(ripple).remove();
            ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.height = ripple.style.width = Math.max(rect.height, rect.width) + 'px';
            target.appendChild(ripple);
            var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
            var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
            ripple.style.top = top + 'px';
            ripple.style.left = left + 'px';
            return false;

        }

      
        $(document).on('click','button.magicBtn.material',function(e) {
            $(this).fillUpButton(e);
        });

    } 

}(jQuery)); 
function cl(element) {
    if(debug) console.log('CL FUNCTION',element);
};