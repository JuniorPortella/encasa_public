csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
document.addEventListener("DOMContentLoaded", function(e) {
    let username = sessionStorage.getItem("username")
    let adm = sessionStorage.getItem("adm")
    if(username == null || adm == null){
        window.location.href = "../index/";
    }
});

function alterar_bairro(codigo){
    swal("Digite um novo valor:", {
        content: "input",
    })
    .then((value) => {
        if (value!=null){
            console.log(codigo)
            console.log(value)
            fetch('/bairros/salvar_bairros/',{
                method: "POST",
                headers:{
                    'X-CSRFToken': csrf_token,
                },
                body: JSON.stringify({
                    id: codigo,
                    taxa: value, 
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
        
    });
}

function ordenar(ordenar){
    //ordenar = 1 - Bairro
    //ordenar = 2 - Preco
    fetch('/bairros/procurar_bairros/',{
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
        console.log(typeof(data['bairros'][0]['fields']['taxa']))
        for(i=0; i< data['bairros'].length; i++){
            tbody.innerHTML += "\
            <tr>\
                <td>"+ data['bairros'][i]['fields']['bairro']+ "</td>\
                <td>"+ parseFloat(data['bairros'][i]['fields']['taxa']).toFixed(2)+ "</td>\
                <td><button onclick='alterar_bairro("+ data['bairros'][i]['id'] +")' value='"+ data['bairros'][i]['id'] +"' id='alterar_bairro' class='btn blue'><i class='bx bx-edit'></i></button></td>\
            </tr>"
        }
        
        
    })  
}