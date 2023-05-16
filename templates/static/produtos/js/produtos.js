var salvar = 0

csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

document.addEventListener("DOMContentLoaded", function(e) {
    let username = sessionStorage.getItem("username")
    let adm = sessionStorage.getItem("adm")
    if(username == null || adm == null){
        window.location.href = "../index/";
    }
});
function check_fields(){
    codigo = document.getElementById('txt_codigo').value
    descricao = document.getElementById('txt_descricao').value
    valor = document.getElementById('txt_valor').value
    valorprom = document.getElementById('txt_valorprom').value
    if(codigo.trim()==""){
        return false
    }
    if(descricao.trim()==""){
        M.toast({html: 'Descrição inválido'})
        return false
    }
    if(valor.trim()==""){
        M.toast({html: 'Valor inválido'})
        return false
    }

    return true

}

function clear_fields(){
    document.getElementById('txt_codigo').value = ""
    document.getElementById('txt_descricao').value = ""
    document.getElementById('txt_valor').value = ""
    document.getElementById('txt_valorprom').value = ""
    
    M.updateTextFields()        
}

function buscar_produto(){
    codigo = document.getElementById('txt_codigo')
    if (codigo.value.trim()!=""){
        csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
        data = new FormData()
        data.append('codigo', codigo.value)
        fetch('/produtos/buscar_produto/',{
            method: "POST",
            headers:{
                'X-CSRFToken': csrf_token,
            },
            body: data

        }).then(function(result){
            return result.json()
        }).then(function(data){
            console.log(data)
            if(data['novo']==1){
                salvar = 1
            }else{
                document.getElementById('txt_descricao').value = data.descricao
                document.getElementById('txt_valor').value = parseFloat(data.valor).toFixed(2)
                document.getElementById('txt_valorprom').value = parseFloat(data.valor_prom).toFixed(2)
                salvar = 2
                M.updateTextFields()
            }
            
        })
    }
}


function Salvar(){
    if(check_fields()){
        codigo = document.getElementById('txt_codigo').value
        descricao = document.getElementById('txt_descricao').value
        valor = document.getElementById('txt_valor').value
        valor_prom = document.getElementById('txt_valorprom').value
        if(valor_prom=="")
            valor_prom=0
        if (salvar == 1){//Salvar

            fetch('/produtos/salvar_produto/',{
                method: "POST",
                headers:{
                    'X-CSRFToken': csrf_token,
                },
                body: JSON.stringify({
                    codigo: codigo, 
                    descricao: descricao, 
                    valor: valor, 
                    valor_prom: valor_prom, 
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
        }else if(salvar == 2){//Atualizar
            console.log(codigo)
            fetch('/produtos/atualizar_produto/',{
                method: "POST",
                headers:{
                    'X-CSRFToken': csrf_token,
                },
                body: JSON.stringify({
                    codigo: codigo, 
                    descricao: descricao, 
                    valor: parseFloat(valor).toFixed(2), 
                    valor_prom: parseFloat(valor_prom).toFixed(2), 
                })
    
            }).then(function(result){
                return result.json()
            }).then(function(data){
                if(data['status']==200){
                    swal({
                        text: "Atualizado com sucesso!",
                        icon: "success",
                    })
                    .then((value) => {
                        location.reload()
                    });
                }else{
                    console.log(data)
                    swal({
                        text: "Ocorreu algum erro!",
                        icon: "error",
                    });
                }
                
            })
        }
    }
    
}

function ordenar(ordenar){
    //ordenar = 1 - codigo
    //ordenar = 2 - descricao
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    fetch('/produtos/procurar_produtos/',{
        method: "POST",
        headers:{
            'X-CSRFToken': csrf_token,
        },
        body: JSON.stringify({
            ordenar: ordenar,
        })

    }).then(function(result){
        return result.json()
    }).then(function(data){
        const tbody = document.getElementById('tbody')
        tbody.innerHTML = ""

        for(i=0; i< data['produtos'].length; i++){
            tbody.innerHTML += "\
            <tr id='"+ data['produtos'][i]['id'] +"'>\
                <td>"+ data['produtos'][i]['fields']['codigo']+ "</td>\
                <td>"+ data['produtos'][i]['fields']['descricao']+ "</td>\
                <td>"+ parseFloat(data['produtos'][i]['fields']['valor']).toFixed(2)+ "</td>\
                <td>"+ parseFloat(data['produtos'][i]['fields']['valor_prom']).toFixed(2)+ "</td>\
                <td><button onclick='alterar_produto("+ data['produtos'][i]['id'] +")' value='"+ data['produtos'][i]['id'] +"' id='alterar_produto' class='btn blue'><i class='bx bx-edit'></i></button></td>\
                <td><button onclick='deletar_produto("+ data['produtos'][i]['id'] +")' value='"+ data['produtos'][i]['id'] +"' id='deletar_produto' class='btn red'><i class='bx bx-trash'></i></button></td>\
            </tr>"
        }
        
        
    })  
}

function alterar_produto(id){
    
    id = document.getElementById(id)
    
    document.getElementById('txt_codigo').value = id.getElementsByTagName("td")[0].innerText
    document.getElementById('txt_descricao').value = id.getElementsByTagName("td")[1].innerText
    document.getElementById('txt_valor').value = id.getElementsByTagName("td")[2].innerText
    document.getElementById('txt_valorprom').value = id.getElementsByTagName("td")[3].innerText
    salvar = 2
    document.getElementById('txt_descricao').focus()
    
    M.updateTextFields()

}

function deletar_produto(id){
    swal({
        text: "Deletar produto?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            fetch('/produtos/deletar_produtos/',{
                method: "POST",
                headers:{
                    'X-CSRFToken': csrf_token,
                },
                body: JSON.stringify({
                    codigo: id, 
                })
    
            }).then(function(result){
                return result.json()
            }).then(function(data){
                if(data['status']==200){
                    swal({
                        text: "Produto deletado!",
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