
csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

const tbody = ""

document.addEventListener("DOMContentLoaded", function(e) {
    let username = sessionStorage.getItem("username")
    let adm = sessionStorage.getItem("adm")
    if(username == null || adm == null){
        window.location.href = "../index/";
    }
});
function exibir_form(){
    add_motoqueiro = document.getElementById('cadastrar_motoqueiro')

    if (add_motoqueiro.style.display === "none" || add_motoqueiro.style.display === "")
        add_motoqueiro.style.display = "block"
    else
        add_motoqueiro.style.display = "none"
    
}   


function salvar_motoqueiro(){
    nome = document.getElementById('txt_nome').value

    if (nome.trim()!=""){
        fetch('/motoqueiro/salvar_motoqueiro/',{
            method: "POST",
            headers:{
                'X-CSRFToken': csrf_token,
            },
            body: JSON.stringify({
                nome: nome, 
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
                
            }else if (data['status'] == 300){
                swal({
                    text: "Motoqueiro já existente!",
                    icon: "warning",
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

function buscar_motoqueiro(){
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = ""
    motoqueiro = document.getElementById('motoqueiro_select').value
    fetch('/motoqueiro/buscar_motoqueiro/',{
        method: "POST",
        headers:{
            'X-CSRFToken': csrf_token,
        },
        body: JSON.stringify({
            id: motoqueiro, 
        })

    }).then(function(result){
        return result.json()
    }).then(function(data){
        if(data['status'] == 200){
            entregas = data['entregas']
            
            const tbody = document.getElementById('tbody')
            tbody.innerHTML = ""
            for(var i = 0; i< entregas.length; i++){
                tbody.innerHTML += "\
                                <tr>\
                                    <td> "+ entregas[i]['fields']['pedido'] +" </td>\
                                    <td> "+ parseFloat(entregas[i]['fields']['valor']).toFixed(2) +" </td>\
                                    <td>"+ entregas[i]['fields']['data'].toString().split("-").reverse().join("-") +" - "+ entregas[i]['fields']['hora'].slice(0, -4); +"</td>\
                                </tr>"
            }
        }else if(data['status'] == 300){
            M.toast({html: 'Nenhum pedido encontrado'})
        }
    })
}

function add_motoqueiro(){
    pedido = document.getElementById('txt_pedido').value
    valor = document.getElementById('txt_valor').value
    select = document.getElementById('motoqueiro_select')
    nome = select.options[select.selectedIndex].text;
    if(nome != "Selecione um motoqueiro"){
        if(pedido.trim() !="" && valor.trim() !=""){
            swal({
                text: "Adicionar o pedido numero: "+pedido+" ao motoqueiro "+ nome + "?",
                buttons: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    const tbody = document.getElementById('tbody')
                    const date = new Date();
                    var dia = date.getDate()
                    if(dia<10)
                        dia = "0" + dia

                    var mes = date.getMonth() + 1
                    if(mes<10)
                        mes = "0" + mes

                    var ano = date.getFullYear()
                    var dt =  dia +"-"+ mes +"-"+ ano
                    var hora = date.toLocaleTimeString('pt-PT', {hour12: false});
                    tbody.innerHTML += "\
                                <tr>\
                                    <td> "+ pedido +" </td>\
                                    <td> "+ parseFloat(valor).toFixed(2) +" </td>\
                                    <td>"+ dt +" - "+ hora +"</td>\
                                </tr>"
                                
                    motoqueiro = document.getElementById('motoqueiro_select').value
                    fetch('/motoqueiro/incluir_pedido/',{
                        method: "POST",
                        headers:{
                            'X-CSRFToken': csrf_token,
                        },
                        body: JSON.stringify({
                            motoqueiro: motoqueiro,
                            pedido: pedido, 
                            valor: valor,
                        })
                
                    }).then(function(result){
                        return result.json()
                    }).then(function(data){
                        console.log(data)
                        if(data['status'] == 200){
                            document.getElementById('txt_pedido').value = ""
                            document.getElementById('txt_valor').value = ""
                            M.updateTextFields()
                        }else{
                            swal({
                                text: "Ocorreu algum erro !",
                                icon: "error",
                            });
                        }
                    })
        
                }
              });
            
        }else{
            M.toast({html: 'Preencha os campos corretamente'})
        }
    }else{
        M.toast({html: 'Selecione um motoqueiro'})
    }
    
    
}

function buscar_pedido(){
    pedido = document.getElementById('txt_pedido').value
    document.getElementById('txt_valor').value = ""
    M.updateTextFields()
    if(pedido != "" && !isNaN(pedido)){
        fetch('/motoqueiro/buscar_pedido/',{
            method: "POST",
            headers:{
                'X-CSRFToken': csrf_token,
            },
            body: JSON.stringify({
                pedido: pedido, 
            })
    
        }).then(function(result){
            return result.json()
        }).then(function(data){
            console.log(data)
            if(data['status'] == 200){
                document.getElementById('txt_valor').value = parseFloat( data['pedido']['total']).toFixed(2)

                M.updateTextFields()
            }else if(data['status'] == 300){
                M.toast({html: 'Pedido não encontrado'})
            }
        })
    }else{
        M.toast({html: 'Preencha corretamente '})
    }
}