//按钮状态位
clickBtn1 = 'true';
clickBtn2 = 'true';
clickBtn3 = 'true';
clickBtn4 = 'true';
//本地预存变量
a={
    "patient_number_lv1":null,
    "name": null,
    "department": null,
    "bed_number": null,
    "age": null,
    "gender": null,
    "height": null,
    "weight": null,
    "sbp": null,
    "dbp": null,
    "r": null,
    "p": null,
    "t": null,
    "na": null,
    "k": null,
    "cl": null,
    "wbc": null,
    "hb": null,
    "plts": null,
    "pt": null,
    "aptt": null,
    "bun": null,
    "creat": null,
    "tbil": null,
    "ast": null,
    "alt": null,
    "glu": null,
    "result_binary": null,
    "lv1_binary": null,
    "lv2_binary": null,
    "firstAssessDoc": null,
    "firstAssessDate": null,
    "secondAssessDoc": null,
    "secondAssessDate": null,
    "pre_diagnose": null,
    "assume": null,
    "chief_complaint": null,
    "patientLv2List": [
        {
            "patient_number_lv2": "201721010715",
            "checkbox_binary": "10100100",
            "remark": null,
            "represent": "阻塞性呼吸睡眠暂停低通气综合征"
        },
        {
            "patient_number_lv2": "201721010715",
            "checkbox_binary": "10001000",
            "remark": null,
            "represent": "心肌病"
        },
        {
            "patient_number_lv2": "201721010715",
            "checkbox_binary": "0000000000",
            "remark": null,
            "represent": "吸烟，戒烟"
        },
        {
            "patient_number_lv2": "201721010715",
            "checkbox_binary": "00000000000000010000000000000",
            "remark": null,
            "represent": "胸痛，胸闷"
        },
        {
            "patient_number_lv2": "201721010715",
            "checkbox_binary": "000000010000000",
            "remark": null,
            "represent": "心悸"
        }
    ]
};
function Initresult(result_binary){
    var result_binary1=result_binary.substring(0,6);
    $(":radio[name='ASA'][value="+result_binary1+"]").prop("checked", "checked");
    console.log(result_binary1);
    var result_binary2=result_binary.substring(6,8);
    $(":radio[name='饱胃'][value="+result_binary2+"]").prop("checked", "checked");
    console.log(result_binary2);
    var result_binary3=result_binary.substring(8,11);
    $(":radio[name='讨论1'][value="+result_binary3+"]").prop("checked", "checked");
    console.log(result_binary3);
    var result_binary4=result_binary.substring(11,13);
    $(":radio[name='麻醉准备'][value="+result_binary4+"]").prop("checked", "checked");
    console.log(result_binary4);
    var result_binary5=result_binary.substring(13,17);
    $(":radio[name='风险'][value="+result_binary5+"]").prop("checked", "checked");
    console.log(result_binary5);
    var result_binary6=result_binary.substring(17,20);
    $(":radio[name='麻醉'][value="+result_binary6+"]").prop("checked", "checked");
    console.log(result_binary6);
    var result_binary7=result_binary.substring(20,22);
    $(":radio[name='变更麻醉方法'][value="+result_binary7+"]").prop("checked", "checked");
    console.log(result_binary7);
}
var secondclick= function load(){
    var AA=$("input[name='ASA']:checked").val();
    var BB=$("input[name='饱胃']:checked").val();
    var CC=$("input[name='讨论1']:checked").val();
    var DD=$("input[name='麻醉准备']:checked").val();
    var EE=$("input[name='风险']:checked").val();
    var FF=$("input[name='麻醉']:checked").val();
    var GG=$("input[name='变更麻醉方法']:checked").val();

    if(AA==undefined){
        AA="000000";};
    if(BB==undefined){
        BB="00";};
    if(CC==undefined){
        CC="000";};
    if(DD==undefined){
        DD="00";};
    if(EE==undefined){
        EE="0000";};
    if(FF==undefined){
        FF="000";};
    if(GG==undefined){
        GG="00";};
    choosen=AA+BB+CC+DD+EE+FF+GG;
 
    return choosen;
}
let submit2=function submit2() {
    this.secondclick();
    C=$(".patient_num").val().toString()
    console.log(C);
    console.log(choosen);
    $('#button').startLoading({
        loadingIcon: false
    });
    $.ajax({
        url:'http://syyaoao.ngrok.ibanzhuan.cn/patient/updatePatientLv1',
        type:"GET", 
        data: {
            patient_number_lv1: C,
           result_binary:choosen,
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        jsonpCallback:"subtest",   
        success() {
            console.log("传输成功");
            $('#button').resultLoading({
                status: 'success'
            });
            clickBtn1 = 'true';
        },
        error(){
            console.log("传输失败");
            $('#button').resultLoading({
                status: 'error'
            });clickBtn1 = 'true';
        }
    });
    
}
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
//不使用这个函数
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

let initadvancepage2 = function(multichoose,name,obj) {
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
    //如果该二级选项包含多选三级选项则需进一步判断，如果不包括，则可全部渲染单选框
    if(multichoose.hasOwnProperty(name)) {
        for(let key in obj) {
            index++;
            let title = "<span>"+key+"：</span><span>";
            //如果包含在
            if(multichoose[name].indexOf(key) > -1) {
                for(let value of obj[key]) {
                    let option = "<span><input type=\"checkbox\" name=\""+name+"child"+index+"\" id=\""+name+id+"\"><label for=\""+name+(id++)+"\">"+value+"</label></span>";
                    title += option;
                }
            } else {
                for(let value of obj[key]) {
                    let option = "<span><input type=\"radio\" name=\""+name+"child"+index+"\" id=\""+name+id+"\"><label for=\""+name+(id++)+"\">"+value+"</label></span>";
                    title += option;
                }
            }
            content += ("</span><div>"+title+"</div>");
        }

    } else {
        for(let key in obj) {
            index++;
            let title = "<span>"+key+"：</span><span>";
            for(let value of obj[key]) {
                let option = "<span><input type=\"radio\" name=\""+name+"child"+index+"\" id=\""+name+id+"\"><label for=\""+name+(id++)+"\">"+value+"</label></span>";
                title += option;
            }
            content += ("</span><div>"+title+"</div>");
        }
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

//一行系统 类
class TableItems {
    constructor(firstclass,secondclass,thirdclass,multichoose) {
        //一级字段名，如：'心血管'
        this.firstclass = firstclass;
        //二级字段列表，如：['胸痛','心悸']
        this.secondclass = secondclass;
        //三级字段对象列表
        //[{'是否确诊冠心病':['否','二级医院','三级医院'],'病史':['&lt;1','1-5','5-10','&gt;10']},{'':['','',''],'':['','','']}]
        this.thirdclass = thirdclass;
        //需多选的三级字段对象
        //{'心悸':['生理性','病理性'],'高血压':['靶器官受损'],}
        this.multichoose = multichoose;
    }
    //初始化一行视图
    initclassview() {
        inittableview(this.firstclass,this.secondclass);
        //为一行按钮元素添加事件
        let that = this;
        let first = this.firstclass;
        let index = firstclasslist.indexOf(this.firstclass);
        $("."+first+" .firstlevel input").click(function(){
            firstclassid.updateidcfg();
            if($("."+first+" .firstlevel input:last").prop("checked") == true) {
                //一级字段选项为否，失能其全部二级字段
                $("."+first+" .secondlevel input").prop("checked",false);
                $("."+first+" .secondlevel input").attr("disabled","true");
                $("."+first+" .secondlevel label").removeClass("able");
                $("."+first+" .secondlevel label").removeClass("advanced");
                $("."+first+" .secondlevel .advance").remove(); 
                //一级字段选项为否，清空二级字段id,三级字段id列表
                handlelist[index].clearidcfg();
                for(let item of thirdclassmatrix[index]) {
                    item.clearidcfg();
                }
            } else {
                //一级字段选项为是，使能其全部二级字段
                $("."+first+" .secondlevel input").removeAttr("disabled");
                $("."+first+" .secondlevel label").addClass("able");
            }
        });
        //二级字段多选事件
        $("."+first+" .secondlevel > div").click(function(){
            $(this).find("input").trigger("click");
        });
        $("."+first+" .secondlevel input").click(function(){
            //取消了二级字段input的true/false不同的点击事件
            $(this).prop("checked",true);
            check(that,$(this).next());
            // if($(this).prop("checked") == true) {
            //     //选中
            //     check(that,$(this).next());
            // } else {
            //     //取消
            //     empty(that,$(this).next());
            // }
            // handlelist[index].updateidcfg();
        });
        //点击二级字段弹框三级事件
        $("."+first+" .secondlevel label").click(function(){
            $(this).prev().trigger("click");
        });
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

    //改之后
    initadvancecontent2(secondname) {
        let that = this;
        let firstindex = firstclasslist.indexOf(this.firstclass);
        let secondindex = this.secondclass.indexOf(secondname);
        //根据二级字段和其对应的三级字段对象，动态渲染弹框页面
        initadvancepage2(this.multichoose,secondname,this.thirdclass[secondindex]);
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
    //与保存事件相同
    btngoback(firstindex,secondindex) {
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
    //清除
    //清除对应的三级字段id，对应二级字段选项checked false，更新二级字段id
    btnclear(firstindex,secondindex) {
        //hideadvance();
        thirdclassmatrix[firstindex][secondindex].clearidcfg();
        $("#"+this.secondclass[secondindex]).prop("checked",false);
        handlelist[firstindex].updateidcfg();
        //clearadvancedcontent();
        //$("button").unbind("click");
        // $("."+this.secondclass[secondindex]+".advance").remove();
        // $("."+this.secondclass[secondindex]).removeClass("advanced");
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
//一，二级字段：每一项 由一位0或1决定。

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
    constructor() {
        //发送请求的病人住院号，字符串
        this.patient_num = '';
        //接受请求全部数据
        this.data = {};
        //接受到的初始化的各个字段字符串
        this.initid_lv1 = '';
        this.initidlist_lv2 = new Array();
        this.initidobj_lv3 = new Object();
        this.urlheader = 'http://syyaoao.ngrok.ibanzhuan.cn';
    }
    setpatientnum(patient_num) {
        this.patient_num = patient_num;
        console.log(patient_num,typeof(patient_num));
    }
    queryrequest() {
        let that = this;
        let queryurl = this.urlheader + '/patient/findByPatientNumber';
        let httprequest = $.ajax({
            url: queryurl,
            async:false,
            data: {
                patient_number_lv1: this.patient_num,
            },
            dataType:"jsonp",
            jsonp: "jsoncallback",
            jsonpCallback:"test",
            timeout:3000, 
            success: function(data) {
                //打印信息，可省略
                console.log("获取初始信息成功");
                //第一部分操作
                window.a=data;
                $("#test").show();
                $("#test2").show();
                $("#test3").show();
                $("#query").hide();
                console.log("本地信息暂存为"+a); 
                $("#name").append(a.name)
                $("p").css("align","right");
                $("#name").css("white-space","nowrap");
                $("#height").append(a.height);
                $("#patient_number_lv1").append(a.patient_number_lv1);
                $("#department").append(a.department);
                $("#bed_number").append(a.bed_number);
                $("#age").append(a.age);
                $("#gender").append(a.gender);
                $("#weight").append(a.weight);
                $("#bp").append(a.sbp).append("/").append(a.dbp);
                $("#r").append(a.r);
                $("#p").append(a.p);
                $("#t").append(a.t);
                $("#na").append(a.na);
                $("#k").append(a.k);
                $("#cl").append(a.cl);
                $("#wbc").append(a.wbc);
                $("#hb").append(a.hb);
                $("#plts").append(a.plts);
                $("#pt").append(a.pt);
                $("#aptt").append(a.aptt);
                $("#bun").append(a.bun);
                $("#creat").append(a.creat);
                $("#tbil").append(a.tbil);
                $("#ast").append(a.ast);
                $("#alt").append(a.alt);
                $("#glu").append(a.glu);
                $("#pre_diagnose").append(a.pre_diagnose);
                $("#assume").append(a.assume);
                $("#chief_complaint").append(a.chief_complaint);
                $("#others").append(a.others);
                var b = data.result_binary;
                if(a.result_binary==null){ 
                    b='00000000000000000000000'
                };
                console.log(b);
                var c = b.toString();
                console.log(typeof (c));
                window.Initresult(c);
                $("#button").show();
                let result = JSON.stringify(data);
                console.log(result);
                that.data = data;
                //请求到的字段初始化 lv1
                that.initid_lv1 = data.lv1_binary;
                //lv2_list
                let initid_lv2 = data.lv2_binary;
                //第一次问诊前为null，需初始化二级字段的id列表
                if(initid_lv2 == null) {
                    for(let index in handlelist) {
                        let length = handlelist[index].queue.length;
                        that.initidlist_lv2[index] = queue0(length);
                    }
                } else {
                    let start = 0;
                    for(let index in handlelist) {
                        let length = handlelist[index].queue.length;
                        that.initidlist_lv2[index] = initid_lv2.substr(start,length);
                        start += length;
                    }
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
        //根据二三级字段变化判断三级字段需要：1.添加 2.更新 3.删除
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
            async: false,
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
                $('#button2').resultLoading({
                    status: 'success'
                });
                clickBtn3 = 'true';
            },
            error(){
                console.log("传输失败");
                $('#button2').resultLoading({
                    status: 'error'
                });clickBtn3 = 'true';
            }
        })
    }
    updatelv3(index1,index2) {
        let that = this;
        let updatelv3url = this.urlheader + '/patient/updatePatientLv2';
        let updatelv3_binary = thirdclassmatrix[index1][index2].queue;
        let updaterepresent = thirdclassmatrix[index1][index2].name;
        let httprequest = $.ajax({
            url: updatelv3url,
            type: "GET",
            async: false,
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
                that.queryrequest();
            }
        });
    }
    addnewlv3(index1,index2) {
        let that = this;
        let addnewlv3url = this.urlheader + '/patient/insertPatientLv2';
        let addnewlv3_binary = thirdclassmatrix[index1][index2].queue;
        let addnewrepresent = thirdclassmatrix[index1][index2].name;
        let httprequest = $.ajax({
            url: addnewlv3url,
            type: "GET",
            async: false,
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
                that.queryrequest();
            }
        });
    }
    deletelv3(index1,index2) {
        let that = this;
        let deletelv3url = this.urlheader + '/patient/deletePatientLv2';
        let deleterepresent = thirdclassmatrix[index1][index2].name;
        let httprequest = $.ajax({
            url: deletelv3url,
            type: "GET",
            async: false,
            data: {
                patient_number_lv2: this.patient_num,
                represent: deleterepresent,
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success(data) {
                //打印信息，可省略
                console.log("删除病人三级级表成功"+deleterepresent);
                that.queryrequest();
            }
        });
    }
}

