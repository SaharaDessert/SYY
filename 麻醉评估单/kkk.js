var a={
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
var c={
    "patient_number_lv1": "201721010715",
    "name": "张大为",
    "department": "心血管科",
    "bed_number": "05",
    "age": 21,
    "gender": "男",
    "height": 175,
    "weight": 65.6,
    "sbp": 120,
    "dbp": 70,
    "r": 30,
    "p": 60,
    "t": 37,
    "na": 140,
    "k": 4,
    "cl": 100,
    "wbc": 6,
    "hb": 135,
    "plts": 220,
    "pt": 11.2,
    "aptt": 22.1,
    "bun": 5.2,
    "creat": 47,
    "tbil": 21,
    "ast": 30,
    "alt": 25,
    "glu": 5,
    "result_binary": "000000000000000000",
    "lv1_binary": "10",
    "lv2_binary": "110000000000000",
    "firstAssessDoc": null,
    "firstAssessDate": null,
    "secondAssessDoc": null,
    "secondAssessDate": null,
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
var b;


function load(){
    var fst=$("input[name='讨论1']:checked").val();
    var scd=$("input[name='麻醉准备']:checked").val();
    var thd=$("input[name='风险']:checked").val();
    if(fst==undefined){
        fst="000";};
    if(scd==undefined){
        scd="00";};
    if(thd==undefined){
        thd="0000";};
    var choosen=fst+scd+thd;
    console.log(choosen);
}
function ajaxtest() {  
    var that=this;  
    $.ajax({    
        url:'http://192.168.2.100:8080/patient/findByPatientNumber?patient_number_lv1=333333333',   
        async:true,
        type:"get", 
        dataType:"jsonp",    
        jsonp:"jsoncallback",    
        jsonpCallback:"test",    
        timeout:3000,   
        success:function(res){ 
       
        console.log("数据接收成功");   
        console.log(res); 
        console.log(window.a);  
        window.a=res;
        console.log(window.a); 
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
     },    
     error:function(){    
         console.log("数据接收失败");    
     }    
  })    }    
let ajaxtestt=function ajaxtestt() {
    $.ajax({
        url:'http://192.168.2.100:8080/patient/findByPatientNumber?patient_number_lv1=201721010715',
        type: "GET",
        data: {
            patient_number_lv2: this.patient_num,
            represent: addnewrepresent,
            checkbox_binary: addnewlv3_binary,
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        success(data) {
            console.log("向上传输诊断表成功"+addnewrepresent);
        }
    });
}

$(function() {
console.log("页面数据：" );console.log(a);




});