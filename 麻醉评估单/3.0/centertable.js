//一行总输入模板
let initfirstmode = function(){
    let trmode = "\
    <tr>\
                <td class=\"firstlevel\">\
                <div>\
                    <div>\
                        <input type=\"radio\" checked=false>\
                        <label>是</label>\
                        <input type=\"radio\" checked=true>\
                        <label>否</label>\
                    </div>\
                </div>\
                </td>\
                <td class=\"secondlevel\"></td>\
                <td class=\"summurylevel\"></td>\
            </tr>\
    ";
    $(".center tr:last-child").after(trmode);
}
//每个二级选项输入模板
let initsecondmode = function(first,secondoption){
    let trmode = "<div><input type=\"checkbox\" name=\""+first+"\" id=\""+secondoption+"\" value=\""+secondoption+"\"><label class=\""+secondoption+" able\">"+secondoption+ "</label></div>"
    $("."+first+" .secondlevel").append(trmode);
}
//初始化系统视图
let inittableview = function(first,second) {
    let firsttd = "<div>"+first+"</div>";
    initfirstmode();
    $(".center tr:last-child").addClass(first);
    $("."+first+" .firstlevel > div").prepend(firsttd);
    $("."+first+" .firstlevel input").attr("name",first);
    $("."+first+" .firstlevel input:first").attr("id",first+"Y");  
    $("."+first+" .firstlevel input:last").attr("id",first+"N");
    $("."+first+" .firstlevel label:first").attr("for",first+"Y");
    $("."+first+" .firstlevel label:last").attr("for",first+"N");
    for(let secondoption of second) {
        initsecondmode(first,secondoption);
    }
}

//name=二级字段名 obj={'是否确诊冠心病':['否','二级医院','三级医院'],'病史':['&lt;1','1-5','5-10','&gt;10']}
//弃用
let initadvancepage = function(name,obj) {
    let header = "<h3>"+name+"问诊</h3><hr><div class=\"midcontent\"></div>";
    let content = "";
    $(".advancedcontent").prepend(header);
    let index = 0;
    let id = 0;
    for(let key in obj) {
        index++;
        let title = "<span>"+key+"：</span>";
        for(let value of obj[key]) {
            let option = "<input type=\"radio\" name=\""+name+"child"+index+"\" id=\""+name+id+"\"><label for=\""+name+(id++)+"\">"+value+"</label>";
            title += option;
        }
        content += ("<div>"+title+"</div>");
    }
    $(".midcontent").prepend(content);
}

let initadvancepage2 = function(name,obj) {
    // let header = "<h3>"+name+"问诊</h3><hr><div class=\"midcontent\"></div>";
    let content = "";
    // $(".advancedcontent").prepend(header);
    let buttons = "<div class=\"update\">\
                    <button class=\"goback\">返回</button>\
                    <button class=\"clear\">清空</button>\
                    <button class=\"save\">保存</button>\
                    </div>";
    let index = 0;
    let id = 0;
    for(let key in obj) {
        index++;
        let title = "<span>"+key+"：</span><span>";
        for(let value of obj[key]) {
            let option = "<span><input type=\"radio\" name=\""+name+"child"+index+"\" id=\""+name+id+"\"><label for=\""+name+(id++)+"\">"+value+"</label></span>";
            title += option;
        }
        content += ("</span><div>"+title+"</div>");
    }
    content += buttons;
    let contents = ("<div class=\""+name+" advance able\">"+content+"</div>");
    $("#"+name).parent().after(contents);
}

//使能弹框蒙版和弹框窗口
let showadvance = function() {
    $(".overlay").addClass("showadvance");
    $(".advancedcontent").addClass("showadvance");
}
//失能弹框蒙版和弹框窗口
let hideadvance = function(){
    $(".overlay").removeClass("showadvance");
    $(".advancedcontent").removeClass("showadvance");
}
//在每次关闭弹窗时，清除动态渲染的选项内容
let clearadvancedcontent = function() {
    $(".advancedcontent").children().not(".update").remove();
}
//选中二级字段后，开始渲染对应的三级弹框
let check = function(classobj,jqobj) {
    //classobj.initadvancecontent(jqobj.text());

    if(jqobj.hasClass("able") && !jqobj.hasClass("advanced")) {
        classobj.initadvancecontent2(jqobj.text());
    }
}
//取消二级字段后，清除对应三级字段的id
let empty = function(classobj,jqobj) {
    classobj.emptyidcfg(jqobj.text());
}

//一行总体系统类
class TableItems {
    constructor(firstclass,secondclass,thirdclass) {
        //一级字段名，如：'心血管'
        this.firstclass = firstclass;
        //二级字段列表，如：['胸痛','心悸']
        this.secondclass = secondclass;
        //三级字段对象列表
        //[{'是否确诊冠心病':['否','二级医院','三级医院'],'病史':['&lt;1','1-5','5-10','&gt;10']},{'':['','',''],'':['','','']}]
        this.thirdclass = thirdclass;
    }
    //初始化一行视图
    initclassview() {
        inittableview(this.firstclass,this.secondclass);
    }
    //初始化配置该行对应的二级字段id，以及其页面的样式
    initidcfg(classname,binary) {
        classname.getid(binary);
        classname.loadidcfg();
        if($("."+this.firstclass+" .firstlevel input:last").prop("checked") == true) {
            //初始化时，一级字段为否，失能二级字段选项
            $("."+this.firstclass+" .secondlevel input").prop("checked",false);
            $("."+this.firstclass+" .secondlevel input").attr("disabled","true");
            $("."+this.firstclass+" .secondlevel label").removeClass("able");
            //初始化时，一级字段为否，则对应二级字段id清空，三级字段id列表清空
            classname.clearidcfg();
            // for(let item of thirdclassmatrix[firstclasslist.indexOf(this.firstclass)]) {
            //     item.clearidcfg();
            // }
        } else {
            //初始化时，一级字段为是，使能二级字段选项
            $("."+this.firstclass+" .secondlevel input").removeAttr("disabled");
            $("."+this.firstclass+" .secondlevel label").addClass("able");
        }
    }
    //初始化弹框页 弃用
    initadvancecontent(secondname) {
        let that = this;
        let firstindex = firstclasslist.indexOf(this.firstclass);
        let secondindex = this.secondclass.indexOf(secondname);
        //根据二级字段和其对应的三级字段对象，动态渲染弹框页面
        initadvancepage(secondname,this.thirdclass[secondindex]);
        //配置弹框中三级字段单选
        thirdclassmatrix[firstindex][secondindex].loadidcfg();
        //为弹框中的三个按钮添加事件
        $("button").click(function(){
            that.btnClick($(this),firstindex,secondindex);
        });
        //使能弹框蒙版和页面
        showadvance();
    }

    //改
    initadvancecontent2(secondname) {
        let that = this;
        let firstindex = firstclasslist.indexOf(this.firstclass);
        let secondindex = this.secondclass.indexOf(secondname);
        //根据二级字段和其对应的三级字段对象，动态渲染弹框页面
        initadvancepage2(secondname,this.thirdclass[secondindex]);

        $("label."+secondname).addClass("advanced");
        //配置弹框中三级字段单选
        thirdclassmatrix[firstindex][secondindex].loadidcfg();
        //为弹框中的三个按钮添加事件
        $("."+secondname+" button").click(function(){
            that.btnClick($(this),firstindex,secondindex);
        });
        //使能弹框蒙版和页面
        //showadvance();
    }
    emptyidcfg(secondname) {
        let firstindex = firstclasslist.indexOf(this.firstclass);
        let secondindex = this.secondclass.indexOf(secondname);
        thirdclassmatrix[firstindex][secondindex].clearidcfg();
        $("."+this.secondclass[secondindex]+".advance").remove();
        $("."+this.secondclass[secondindex]).removeClass("advanced");
        console.log(thirdclassmatrix[firstindex][secondindex].queue);
    }
    btnClick(jqobj,firstindex,secondindex) {
        switch(jqobj.attr("class")) {
            case 'goback':
                this.btngoback(firstindex,secondindex);
                break;
            case 'clear':
                this.btnclear(firstindex,secondindex);
                break;
            case 'save':
                this.btnsave(firstindex,secondindex);
                break;
        }
    }
    //返回
    //隐藏弹框，清除弹框中动态渲染的内容，取消按钮事件
    btngoback(firstindex,secondindex) {
        // hideadvance();
        // clearadvancedcontent();
        $("."+this.secondclass[secondindex]+".advance").remove();
        $("."+this.secondclass[secondindex]).removeClass("advanced");
        //$("button").unbind("click");
        console.log(thirdclassmatrix[firstindex][secondindex].queue);
    }
    //清除
    //隐藏弹框，清除对应的三级字段id，对应二级字段选项checked false，更新二级字段id,清除弹框中动态渲染的内容，取消按钮事件
    btnclear(firstindex,secondindex) {
        //hideadvance();
        thirdclassmatrix[firstindex][secondindex].clearidcfg();
        $("#"+this.secondclass[secondindex]).prop("checked",false);
        handlelist[firstindex].updateidcfg();
        //clearadvancedcontent();
        //$("button").unbind("click");
        $("."+this.secondclass[secondindex]+".advance").remove();
        $("."+this.secondclass[secondindex]).removeClass("advanced");
        console.log(thirdclassmatrix[firstindex][secondindex].queue);
    }
    //保存
    //隐藏弹框，更新对应的三级字段id，如果三级字段id全0，则其二级字段选项false，否则为true，更新二级字段id,清除弹框中动态渲染的内容，取消按钮事件
    btnsave(firstindex,secondindex) {
        //hideadvance();
        thirdclassmatrix[firstindex][secondindex].updateidcfg();
        if(Number(thirdclassmatrix[firstindex][secondindex].queue) == 0) {
            $("#"+this.secondclass[secondindex]).prop("checked",false);
        } else {
            $("#"+this.secondclass[secondindex]).prop("checked",true);
        }
        handlelist[firstindex].updateidcfg();
        //clearadvancedcontent();
        //$("button").unbind("click");
        $("."+this.secondclass[secondindex]+".advance").remove();
        $("."+this.secondclass[secondindex]).removeClass("advanced");
        console.log(thirdclassmatrix[firstindex][secondindex].queue);
    }
}

//三级字段的id类
class ID3rd {
    constructor(name,queue) {
        //三级字段id所属的二级字段名
        this.name = name;
        this.queue = queue;
        this.list = queue.split("");
    }
    getid(binary) {
        if(binary) {
            this.queue = binary;
            this.list = binary.split("");
        } else {
            this.clearidcfg();
        }
    }
    loadidcfg() {
        for(let index in this.list) {
            if(this.list[index] == '1') {
                $("#"+this.name+index+"").prop("checked",true);
            } else {
                $("#"+this.name+index+"").prop("checked",false);
            }
        }
    }
    updateidcfg() {
        for(let index in this.list) {
            if($("#"+this.name+index+"").prop("checked") == !Number(this.list[index])) {
                if(this.list[index] == '1') {
                    this.list[index] = '0';
                }else {
                    this.list[index] = '1';
                }
            }
        }
        this.queue = this.list.join("");
    }
    clearidcfg() {
        for(let index in this.list) {
            this.list[index] = '0';
        }
        $("."+this.name+" input").prop("checked",false);
        this.queue = this.list.join("");
    }
}

//由于三级字段和一、二级字段的定义方式不同，需两个不同类
//三级字段：每一项由 与选项个数相等 的位数组成。例：病史：小于1/1-5/5-10/大于10 ，选择（1-5），则该项的id段为0100。多项的id段顺序拼接
//一，二级字段：每一个选项由一位0或1决定。

//一，二级字段的id类
class ID1st2nd {
    constructor(name,queue,level) {
        //一级字段name为： 一级菜单
        this.name = name;
        this.queue = queue;
        //设置为一级或二级字段，1/2(int)
        this.level = level;
        this.list = queue.split("");
    }
    getid(binary) {
        if(binary) {
            this.queue = binary;
            this.list = binary.split("");
        } else {
            this.clearidcfg();
        }
    }
    loadidcfg() {
            let that = this;
            let inputs;
            if(this.level == 1) {
                inputs = $('.firstlevel input:first-child');
            } else if(this.level == 2) {
                inputs = $("."+this.name+" .secondlevel > div > input");
            }
            inputs.each(function(index){
                if($(this).prop("checked") == !Number(that.list[index])) {
                    $(this).prop("checked",!!Number(that.list[index]));
                }
            });
    }
    updateidcfg() {
        let that = this;
        let inputs;
        if(this.level == 1) {
            inputs = $('.firstlevel input:first-child');
        } else if(this.level == 2) {
            inputs = $("."+this.name+" .secondlevel > div > input");
        }
        inputs.each(function(index){
            if($(this).prop("checked") == !Number(that.list[index])) {
                if(that.list[index] == '1') {
                    that.list[index] = '0';
                } else {
                    that.list[index] = '1';
                }
            }
        });
        this.queue = this.list.join("");
        console.log(this.queue);
    }
    clearidcfg() {
        for(let index in this.list) {
            this.list[index] = '0';
        }
        this.queue = this.list.join("");
    }
}


/*********************http请求各个接口的对象 ***********************/
class HttpRequest {
    constructor(patient_num) {
        //发送请求的病人住院号，字符串
        this.patient_num = patient_num;
        //接受请求全部数据
        this.data = {};
        //接受到的初始化的各个字段字符串
        this.initid_lv1 = '';
        this.initidlist_lv2 = new Array();
        this.initidobj_lv3 = new Object();
        this.urlheader = 'http://192.168.2.105:8080';
    }
    queryrequest() {
        let that = this;
        let queryurl = this.urlheader + '/patient/findByPatientNumber';
        let httprequest = $.ajax({
            url: queryurl,
            data: {
                patient_number_lv1: this.patient_num,
            },
            dataType:"jsonp",
            jsonp: "jsoncallback",
            success: function(data) {
                //打印信息，可省略
                console.log("查询病人一二级表成功");
                let result = JSON.stringify(data);
                console.log(result);
                that.data = data;
                //请求到的字段初始化 lv1
                that.initid_lv1 = data.lv1_binary;
                //lv2_list
                let initid_lv2 = data.lv2_binary;
                let start = 0;
                for(let index in handlelist) {
                    let length = handlelist[index].queue.length;
                    that.initidlist_lv2[index] = initid_lv2.substr(start,length);
                    start = length;
                }
                //lv3_list
                for(let index in data.patientLv2List) {
                    that.initidobj_lv3[data.patientLv2List[index].represent] = data.patientLv2List[index].checkbox_binary;
                }

                //配置一级字段的id选项
                firstclassid.getid(that.initid_lv1);
                firstclassid.loadidcfg();
                //配置页面二级字段列表id选项
                for(let index in itemsclasslist) {
                    itemsclasslist[index].initidcfg(handlelist[index],that.initidlist_lv2[index]);
                }
                //将请求下来的三级字段id存储在本地
                //thirdclassmatrix
                for(let index1 in thirdclassmatrix) {
                    for(let index2 in thirdclassmatrix[index1]) {
                        thirdclassmatrix[index1][index2].getid(that.initidobj_lv3[thirdclassmatrix[index1][index2].name]);
                        
                    }
                }
            },
            error:function(XMLHttpRequest,Status,errorThrown){  
                console.log("查询失败，错误信息："+Status);  
            }
        });
    }
    updaterequest() {
        //一二级字段更新请求
        this.updatelv1lv2();
        //根据二三级字段变化判断三级字段需要：1.添加 2.更新 3.保持不变
        for(let index1 in handlelist) {
            for(let index2 in handlelist[index1].list) {
                if(handlelist[index1].list[index2] == '1') {
                    if(thirdclassmatrix[index1][index2].name in this.initidobj_lv3) {
                        if(thirdclassmatrix[index1][index2].queue !== this.initidobj_lv3[thirdclassmatrix[index1][index2].name]) {
                            this.updatelv3(index1,index2);
                        }
                    }else {
                        this.addnewlv3(index1,index2);
                    }
                } else {
                    if(this.initidlist_lv2[index1][index2] == '1') {
                        this.deletelv3(index1,index2);
                    }
                }
            }
        }
    }
    updatelv1lv2() {
        let updatelv1lv2url = this.urlheader + '/patient/updatePatientLv1';
        let updatelv1_binary = firstclassid.queue;
        let updatelv2_binary = '';
        for(let index in handlelist) {
            updatelv2_binary += handlelist[index].queue;
        }
        let httprequest = $.ajax({
            url: updatelv1lv2url,
            type: "GET",
            data: {
                patient_number_lv1: this.patient_num,
                lv1_binary: updatelv1_binary,
                lv2_binary: updatelv2_binary,
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success(data) {
                //打印信息，可省略
                console.log("更新病人一二级表成功");
            }
        })
    }
    updatelv3(index1,index2) {
        let updatelv3url = this.urlheader + '/patient/updatePatientLv2';
        let updatelv3_binary = thirdclassmatrix[index1][index2].queue;
        let updaterepresent = thirdclassmatrix[index1][index2].name;
        let httprequest = $.ajax({
            url: updatelv3url,
            type: "GET",
            data: {
                patient_number_lv2: this.patient_num,
                represent: updaterepresent,
                checkbox_binary: updatelv3_binary,
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success(data) {
                //打印信息，可省略
                console.log("更新病人三级表成功"+updaterepresent);
            }

        });
    }
    addnewlv3(index1,index2) {
        let addnewlv3url = this.urlheader + '/patient/insertPatientLv2';
        let addnewlv3_binary = thirdclassmatrix[index1][index2].queue;
        let addnewrepresent = thirdclassmatrix[index1][index2].name;
        let httprequest = $.ajax({
            url: addnewlv3url,
            type: "GET",
            data: {
                patient_number_lv2: this.patient_num,
                represent: addnewrepresent,
                checkbox_binary: addnewlv3_binary,
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success(data) {
                //打印信息，可省略
                console.log("添加病人三级级表成功"+addnewrepresent);
            }

        });
    }
    deletelv3(index1,index2) {
        let deletelv3url = this.urlheader + '/patient/deletePatientLv2';
        let deleterepresent = thirdclassmatrix[index1][index2].name;
        let httprequest = $.ajax({
            url: deletelv3url,
            type: "GET",
            data: {
                patient_number_lv2: this.patient_num,
                represent: deleterepresent,
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success(data) {
                //打印信息，可省略
                console.log("删除病人三级级表成功"+deleterepresent);
            }

        });
    }
}

/*只需在这一部分中添加 
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
        '治疗情况':['未正规治疗','药物治疗','置入冠脉支架','开胸搭桥手术','两个手术需写手术时间'],
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
        '治疗情况':['未正规治疗','药物治疗','手术治疗','手术需写手术时间'],
        '心功能':['Ⅰ','Ⅱ','Ⅲ','Ⅳ'],
    },
    {
        //杂音
        '病史（年）':['&lt;5','5-10','&gt;10'],
        '类型':['房缺','室缺','动脉导管未闭ASD','法洛四联症','主动脉缩窄','肺动脉狭窄'],
        '肺动脉高压':['无','轻度','中度','重度'],
        '分流':['右向左','左向右','双向'],
        '治疗情况':['未正规治疗','药物治疗','手术治疗','手术需写手术时间'],
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
]);
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
]);

//一级字段id对象 在整个页面中唯一
var firstclassid = new ID1st2nd('一级菜单',"00",1);

//二级字段id对象 分别属于一个一级字段
var xxg2ndid = new ID1st2nd('心血管系统',"00000000",2);
var fhhx2ndid = new ID1st2nd('肺和呼吸',"0000000",2);
//三级字段id对象 分别属于一个二级字段
var xxg3ndid1 = new ID3rd('胸痛，胸闷','00000000000000000000000000000');//29
var xxg3ndid2 = new ID3rd('心悸','000000000000000');//15
var xxg3ndid3 = new ID3rd('瓣膜病变','00000000000000000000000000');//26
var xxg3ndid4 = new ID3rd('杂音','00000000000000');//14
var xxg3ndid5 = new ID3rd('高血压','000000000000000');//15
var xxg3ndid6 = new ID3rd('心梗','000000000000');//12
var xxg3ndid7 = new ID3rd('易疲劳，气紧','00000000');//8
var xxg3ndid8 = new ID3rd('心肌病','00000000');//8

// var fhhx2ndid;
var fhhx3ndid1 = new ID3rd('吸烟，戒烟','0000000000');//10
var fhhx3ndid2 = new ID3rd('慢支炎，肺气肿，COPD','00000000000000000000000000000');//29
var fhhx3ndid3 = new ID3rd('肺炎','00');//2
var fhhx3ndid4 = new ID3rd('气管炎，急性上呼吸道感染，急性气管-支气管炎','00000000000000');//16
var fhhx3ndid5 = new ID3rd('哮喘','0000000000000000');//16
var fhhx3ndid6 = new ID3rd('TB','000000000');//9
var fhhx3ndid7 = new ID3rd('阻塞性呼吸睡眠暂停低通气综合征','00000000');//8

//每一行对象的列表
let itemsclasslist = [tr1,tr2];
//每一行处理 二级字段id 对象的列表
let handlelist = [xxg2ndid,fhhx2ndid];
//一级字段名称列表
let firstclasslist = ['心血管系统','肺和呼吸'];
//处理三级字段id 对象的矩阵
let thirdclassmatrix = [
    [xxg3ndid1,xxg3ndid2,xxg3ndid3,xxg3ndid4,xxg3ndid5,xxg3ndid6,xxg3ndid7,xxg3ndid8],
    [fhhx3ndid1,fhhx3ndid2,fhhx3ndid3,fhhx3ndid4,fhhx3ndid5,fhhx3ndid6,fhhx3ndid7],
];

$(function() {
    let inputbox = "<input type='text' name='patient_num' class='patient_num' placeholder='测试：请输出病床号'/>";
    let httpbutton1 = "<button class=\"query\">测试：获取</button>";
    let httpbutton2 = "<button class=\"update\">测试：提交</button>";
    $("body").prepend(inputbox,httpbutton1);
    $("body").append(httpbutton2);
    $(".query").click(function(){
        myhttp = new HttpRequest($(".patient_num").val().toString());
        myhttp.queryrequest();
    });
    $(".update").click(function(){
        myhttp.updaterequest();
    });

   
    //渲染输入的多个整行对象
    tr1.initclassview();
    tr2.initclassview();
    //初始化配置各选项
    firstclassid.loadidcfg();
    for(let index in itemsclasslist) {
        itemsclasslist[index].initidcfg(handlelist[index],handlelist[index].queue);
    }
    
    //遍历，为每一行添加一级字段单选和二级字段多选事件
    for(let index in firstclasslist) {
        //一级字段单选事件
        $("."+firstclasslist[index]+" .firstlevel input").click(function(){
            firstclassid.updateidcfg();
            if($("."+firstclasslist[index]+" .firstlevel input:last").prop("checked") == true) {
                //一级字段选项为否，失能其全部二级字段
                $("."+firstclasslist[index]+" .secondlevel input").prop("checked",false);
                $("."+firstclasslist[index]+" .secondlevel input").attr("disabled","true");
                $("."+firstclasslist[index]+" .secondlevel label").removeClass("able");
                $("."+firstclasslist[index]+" .secondlevel label").removeClass("advanced");
                $("."+firstclasslist[index]+" .secondlevel .advance").remove();
                
                //一级字段选项为否，清空二级字段id,三级字段id列表
                handlelist[index].clearidcfg();
                for(let item of thirdclassmatrix[index]) {
                    item.clearidcfg();
                }

            } else {
                //一级字段选项为是，使能其全部二级字段
                $("."+firstclasslist[index]+" .secondlevel input").removeAttr("disabled");
                $("."+firstclasslist[index]+" .secondlevel label").addClass("able");
            }
        });
        //二级字段多选事件
        $("."+firstclasslist[index]+" .secondlevel input").click(function(){
            if($(this).prop("checked") == true) {
                //选中
                check(itemsclasslist[index],$(this).next());
            } else {
                //取消
                empty(itemsclasslist[index],$(this).next());
            }
            handlelist[index].updateidcfg();
        });
        //点击二级字段弹框三级事件
        $("."+firstclasslist[index]+" .secondlevel label").click(
            function(){
                //仅当二级字段使能时才触发
                //if($(this).hasClass("able") && !$(this).hasClass("advanced")) {
                    check(itemsclasslist[index],$(this));
                //}
            }
        );
    }
    
    
});