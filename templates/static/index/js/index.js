csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value


document.addEventListener("DOMContentLoaded", function(event) {
    
    sessionStorage.clear();
    if(sessionStorage.getItem('username')!=null)
        location.reload()
});
function check_fields(){
    login = document.getElementById('txt_login').value
    senha = document.getElementById('txt_senha').value
    if(login.trim() == ""){
        M.toast({html: 'Login inválido'})
        return false
    }
    if(senha.trim() == ""){
        M.toast({html: 'Senha inválida'})
        return false
    }
    return true
}


function entrar(){
    if(check_fields()){
        login = document.getElementById('txt_login').value
        senha = document.getElementById('txt_senha').value
        
        fetch('./entrar/',{
            method: "POST",
            headers:{
                'X-CSRFToken': csrf_token,
            },
            body: JSON.stringify({
                login: login, 
                senha: senha, 
            })

        }).then(function(result){
            return result.json()
        }).then(function(data){
            if(data['status']==200){
                console.log(data['funcionario']['adm'])
                sessionStorage.setItem("username", data['funcionario']['nome'])
                if (data['funcionario']['adm']){

                    sessionStorage.setItem("adm", "1")
                }
                else{
                    sessionStorage.setItem("adm", "0")
                }
                    
                window.location.href = "../home/";
            }else{
                swal({
                    text: "Usuário inválido",
                    icon: "error",
                });
            }
            
        })
    }
}