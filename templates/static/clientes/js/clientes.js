var salvar = 0;

csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
var num_cliente = ""
document.addEventListener("DOMContentLoaded", function(e) {
    let username = sessionStorage.getItem("username")
    let adm = sessionStorage.getItem("adm")
    if(username == null || adm == null){
        window.location.href = "../index/";
    }
    let fone = sessionStorage.getItem("num_cliente");
    console.log(fone)
    if (fone != null){
        document.getElementById('txt_fone').value = fone
        document.getElementById('txt_fone').focus()
        num_cliente = fone
        sessionStorage.removeItem("num_cliente");
    }
});

function clear_fields(){
    document.getElementById('txt_fone').value = ""
    document.getElementById('txt_nome').value = ""
    document.getElementById('txt_date').value = ""
    document.getElementById('txt_email').value = ""
    document.getElementById('txt_cep').value = ""
    document.getElementById('txt_rua').value = ""
    document.getElementById('txt_numero').value = ""
    document.getElementById('txt_bairro').value = ""
    document.getElementById('txt_cidade').value = ""
    document.getElementById('txt_comp').value = ""
    document.getElementById('txt_obs').value = ""
    document.getElementById('txt_entrega').value = ""
    
    document.getElementById('txt_entrega').disabled = false
    M.updateTextFields()
    salvar = 0
    
    document.getElementById('txt_fone').focus()
}

function check_fields(){
    if (document.getElementById('txt_fone').value.trim().length<8 || document.getElementById('txt_fone').value.trim().length>11){
        M.toast({html: 'Telefone inválido'})
        return false
    }
    if (document.getElementById('txt_nome').value.trim() == ""){
        M.toast({html: 'Nome inválido'})
        return false
    }
    if (document.getElementById('txt_cep').value.trim() == ""){
        M.toast({html: 'CEP inválido'})
        return false
    }
    if (document.getElementById('txt_rua').value.trim() == ""){
        M.toast({html: 'Rua inválido'})
        return false
    }
    if (document.getElementById('txt_numero').value.trim() == ""){
        M.toast({html: 'Numero inválido'})
        return false
    }
    if (document.getElementById('txt_bairro').value.trim() == ""){
        M.toast({html: 'Bairro inválido'})
        return false
    }
    if (document.getElementById('txt_cidade').value.trim() == ""){
        M.toast({html: 'Cidade inválido'})
        return false
    }
    if (document.getElementById('txt_entrega').value.trim() == ""){
        M.toast({html: 'Taxa de entrega inválido'})
        return false
    }
    return true
}


function busca_cep(){
    var cep = document.getElementById('txt_cep').value.replace(/\D/g, '')
        //Verifica se campo cep possui valor informado.
    if (cep.trim() != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            document.getElementById('txt_entrega').value = ""
            document.getElementById('txt_entrega').disabled = false
                    //Preenche os campos com "..." enquanto consulta webservice.

            document.getElementById('txt_rua').value = '...';
            document.getElementById('txt_bairro').value = '...';
            document.getElementById('txt_cidade').value = '...';
                    //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.

                    document.getElementById('txt_rua').value = dados.logradouro;
                    document.getElementById('txt_bairro').value = dados.bairro;
                    document.getElementById('txt_cidade').value = dados.localidade;
                    console.log(dados.bairro)
                    fetch('/clientes/buscar_bairro/',{
                        method: "POST",
                        headers:{
                            'X-CSRFToken': csrf_token,
                        },
                        body: JSON.stringify({
                            bairro: dados.bairro,
                        })
            
                    }).then(function(result){
                        return result.json()
                    }).then(function(data){
                        console.log(data)
                        if(data['novo']!=1){         
                            console.log("entrou") 
                            document.getElementById('txt_entrega').value = data.taxa
                            document.getElementById('txt_entrega').disabled = true
                            M.updateTextFields();
                        }
                    })
                    M.updateTextFields();
                } //end if.
                else {
                    swal({
                    text: "CEP incorreto",
                    icon: "error",
                    });
                }
            });
        } //end if.
        else {
            swal({
            text: "CEP incorreto",
            icon: "error",
            });
        }
    }
}

function buscar_cliente(){
    fone = document.getElementById('txt_fone')
    if (fone.value.trim().length>=8 && fone.value.trim().length<=11){

        

        data = new FormData()
        data.append('fone', fone.value)
        fetch('/clientes/buscar_cliente/',{
            method: "POST",
            headers:{
                'X-CSRFToken': csrf_token,
            },
            body: data

        }).then(function(result){
            return result.json()
        }).then(function(data){
            if(data['novo']==1){
                salvar = 1
            }else{
                document.getElementById('txt_nome').value = data.nome
                date = data.aniver.split("-");
                document.getElementById('txt_date').value = date[2]+ "/" +date[1]+ "/" +date[0];
                document.getElementById('txt_email').value = data.email
                document.getElementById('txt_cep').value = data.cep
                document.getElementById('txt_rua').value = data.rua
                document.getElementById('txt_numero').value = data.numero
                document.getElementById('txt_bairro').value = data.bairro
                document.getElementById('txt_cidade').value = data.cidade
                document.getElementById('txt_comp').value = data.comp
                document.getElementById('txt_obs').value = data.obs
                document.getElementById('txt_entrega').value = data.entrega
                
                document.getElementById('txt_entrega').disabled = true
                M.updateTextFields()
                salvar = 2
            }
            
        })
    }else if (fone.value.trim()!=""){
        M.toast({html: 'Telefone inválido'})
    }
}

function Salvar(){
    if(check_fields()){
        fone = document.getElementById('txt_fone').value
        nome = document.getElementById('txt_nome').value
        aniver = document.getElementById('txt_date').value
        email = document.getElementById('txt_email').value
        cep = document.getElementById('txt_cep').value
        rua = document.getElementById('txt_rua').value
        numero = document.getElementById('txt_numero').value
        bairro = document.getElementById('txt_bairro').value
        cidade = document.getElementById('txt_cidade').value
        comp = document.getElementById('txt_comp').value
        obs = document.getElementById('txt_obs').value
        entrega = document.getElementById('txt_entrega').value
        csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

        if (salvar == 1){//Salvar

            fetch('/clientes/salvar_cliente/',{
                method: "POST",
                headers:{
                    'X-CSRFToken': csrf_token,
                },
                body: JSON.stringify({
                    fone: fone, 
                    nome: nome, 
                    aniver: aniver, 
                    email: email, 
                    cep: cep, 
                    rua: rua, 
                    numero: numero, 
                    bairro: bairro, 
                    cidade: cidade,
                    comp: comp,
                    obs: obs,
                    entrega: entrega,
                })
    
            }).then(function(result){
                return result.json()
            }).then(function(data){
                if(data['status']==200){
                    swal({
                        text: "Cadastrado com sucesso!",
                        icon: "success",
                      });
                      clear_fields()
                      if(num_cliente!=null){
                        sessionStorage.setItem("num_cliente", num_cliente)
                        window.location.href = "../home/";
                      }
                }else{
                    swal({
                        text: "Ocorreu algum erro!",
                        icon: "error",
                    });
                }
                
            })
        }else if(salvar == 2){//Atualizar
            console.log('ta aqui')
            fetch('/clientes/atualizar_cliente/',{
                method: "POST",
                headers:{
                    'X-CSRFToken': csrf_token,
                },
                body: JSON.stringify({
                    fone: fone, 
                    nome: nome, 
                    aniver: aniver, 
                    email: email, 
                    cep: cep, 
                    rua: rua, 
                    numero: numero, 
                    bairro: bairro, 
                    cidade: cidade,
                    comp: comp,
                    obs: obs,
                    entrega: entrega,
                })
    
            }).then(function(result){
                return result.json()
            }).then(function(data){
                if(data['status']==200){
                    swal({
                        text: "Atualizado com sucesso!",
                        icon: "success",
                      });
                      clear_fields()
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
