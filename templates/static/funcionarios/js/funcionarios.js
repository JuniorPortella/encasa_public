salt = 1
adm = 0
geral=0
csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
var user = ""
document.addEventListener("DOMContentLoaded", function(e) {
    
    const username = sessionStorage.getItem("username")
    
    console.log(username)
    let adm = sessionStorage.getItem("adm")
    console.log(adm)
    if(username == null || adm == null){
        window.location.href = "../index/";
    }
    user = username
    if(adm == 0){
        swal({
            text: "Você não possui acesso a essas informações!",
            icon: "error",
        })
        .then((value) => {
            window.location.href = "../home/";
        });
    }
});

function clear_fields(){
    document.getElementById('txt_nome').value = ""
    document.getElementById('txt_login').value = ""
    document.getElementById('txt_senha').value = ""
    mySwitch.checked = false
    adm = 0
    salt = 1
    geral = 0
}

function check_fields(){
    nome = document.getElementById('txt_nome').value
    login = document.getElementById('txt_login').value
    senha = document.getElementById('txt_senha').value
    if(nome.trim() == "")
        return false
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

const mySwitch = document.getElementById('mySwitch');

// Add an event listener to the switch element
mySwitch.addEventListener('change', function() {
    // Get the current value of the switch element
    const switchValue = mySwitch.checked;
    
    // Use the switch value as needed
    if (switchValue) {
        adm = 1
    } else {
        adm = 0
    }
});

function salvar(){
    
    if(check_fields()){
        nome = document.getElementById('txt_nome').value
        login = document.getElementById('txt_login').value
        senha = document.getElementById('txt_senha').value
        if(nome == user){
            swal({
                text: "Você não tem permissão para alterar suas própias informações",
                icon: "warning",
            });
        }else{
            if (salt == 1){//cadastrar
                fetch('/funcionarios/salvar/',{
                    method: "POST",
                    headers:{
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify({
                        nome: nome, 
                        login: login, 
                        senha: senha, 
                        adm: adm, 
                    })
        
                }).then(function(result){
                    return result.json()
                }).then(function(data){
                    if(data['status']==200){
                        swal({
                            text: "Cadastrado com sucesso!",
                            icon: "success",
                        })
                        .then((value) => {
                            location.reload()
                        });
                    }else{
                        swal({
                            text: "Ocorreu algum erro!",
                            icon: "error",
                        });
                    }
                    
                })
            }else{//alterar
                fetch('/funcionarios/alterar/',{
                    method: "POST",
                    headers:{
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify({
                        id: geral,
                        nome: nome, 
                        login: login, 
                        senha: senha, 
                        adm: adm, 
                    })
        
                }).then(function(result){
                    return result.json()
                }).then(function(data){
                    if(data['status']==200){
                        swal({
                            text: "Alterado com sucesso!",
                            icon: "success",
                        })
                        .then((value) => {
                            location.reload()
                        });
                    }else{
                        swal({
                            text: "Ocorreu algum erro!",
                            icon: "error",
                        });
                    }
                    
                })
            }
        }
        
    }
}
function alterar(id){
    geral = id
    id = document.getElementById(id)
    
    document.getElementById('txt_nome').value = id.getElementsByTagName("td")[0].innerText
    document.getElementById('txt_login').value = id.getElementsByTagName("td")[1].innerText
    document.getElementById('txt_senha').value = id.getElementsByTagName("td")[2].innerText

    console.log(id.getElementsByTagName("td")[3].innerText)
    if(id.getElementsByTagName("td")[3].innerText =="True"){
        console.log("aqui")
        mySwitch.checked = true
        adm = 1
    }else if(!id.getElementsByTagName("td")[3].innerText){
        
        mySwitch.checked = false
        adm = 0 
    }
    salt = 2
    
    M.updateTextFields()
}


function deletar(id, nome){
    if(nome == user){
        swal({
            text: "Você não tem permissão para alterar suas própias informações",
            icon: "warning",
        });
    }else{
        swal({
            text: "Deletar funcionário?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch('/funcionarios/deletar/',{
                    method: "POST",
                    headers:{
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify({
                        id: id, 
                    })
        
                }).then(function(result){
                    return result.json()
                }).then(function(data){
                    if(data['status']==200){
                        swal({
                            text: "Funcionário deletado!",
                            icon: "success",
                        })
                        .then((value) => {
                            location.reload()
                        });
                    }else{
                        swal({
                            text: "Ocorreu algum erro!",
                            icon: "error",
                        });
                    }
                    
                })
    
            }
          });
    }
    
}