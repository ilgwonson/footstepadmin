/**
 * Created by son on 2017-02-01.
 */
function validation_add_admin(data){

    var res = [];

    if(!data.email){
        res.push({target : "admin_email" , text : "이메일을 입력해주세요."})
    }
    if(!data.name){
        res.push({target : "admin_name" , text : "이름을 입력해주세요."})
    }
    if(!data.grade){
        res.push({target : "admin_grade" , text : "등급를 선택해주세요."})
    }
    if(!data.password){
        res.push({target : "admin_password" , text : "비밀번호를 입력해주세요."})
    }
    if(!data.repassword){
        res.push({target : "admin_repassword" , text : "비밀번호 확인를 입력해주세요."})
    }else if(data.password != data.repassword){
        res.push({target : "admin_repassword" , text : "입력하신 비밀번호가 다릅니다."})
    }
    console.log(res);
    return res;
}
var module;
if(module){
    module.exports.validation_add_admin = validation_add_admin;
}
