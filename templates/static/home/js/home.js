var id_cliente= 0, taxa_entrega=0;
var pizza2_valor= 0;
var pizza3_valor= 0; 
var pizza4_valor= 0;
var pizza2= 0; 
var pizza3= 0;
var pizza4 = 0;
var taxa = "";
var divi = 0;
csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value


document.addEventListener("DOMContentLoaded", function(e) {
    let username = sessionStorage.getItem("username")
    
    console.log(username)
    let adm = sessionStorage.getItem("adm")
    console.log(adm)
    if(username == null || adm == null){
        window.location.href = "../index/";
    }
    let num_cliente = sessionStorage.getItem("num_cliente")
    
    if(num_cliente != null){
        document.getElementById('txt_fone').value = num_cliente
        sessionStorage.removeItem("num_cliente");
        document.getElementById('txt_fone').focus()
    }
});


function esconder_forms(value){
    if (value=="listar")
        document.getElementById('recebimentos').style.display = "none"
    else
        document.getElementById('listar_pedidos').style.display = "none"
}

function lst_produto(){
    document.getElementById('tbl_produto').style.display = "block"
    document.getElementById('txt_cod').value = ""
    document.getElementById('txt_valor').value = ""
    document.getElementById("produtos").selectedIndex = 0

    M.updateTextFields();

}

function balcao(){
    form_entrega = document.getElementById('form_entrega')
    if(form_entrega.style.display === "block"){
        form_entrega.style.display = "none"
    }
    if(document.getElementById('txt_endentrega').value == "Balcao"){
        document.getElementById('txt_endentrega').value = ""
        M.updateTextFields()
    }else{
        document.getElementById('txt_endentrega').value = "Balcao"
        taxa=""
        M.updateTextFields()
    }
        
}

function limpa(){
    document.getElementById('txt_endentrega').value = ""
    document.getElementById('form_entrega').style.display = "none"
}

function clear_fields(){
    document.getElementById('txt_fone').value = ""
    document.getElementById('txt_nome').value = ""
    document.getElementById('txt_end').value = ""
    document.getElementById('txt_obss').value = ""
    document.getElementById('txt_endentrega').value = ""
    document.getElementById('txt_numero').value = ""
    document.getElementById('txt_obs').value = ""
    document.getElementById('txt_qtd').value = ""
    document.getElementById('txt_cod').value = ""
    
    document.getElementById('txt_valor').value = ""
    document.getElementById("produtos").selectedIndex = 0
    document.getElementById('form_entrega').style.display="none"
    document.getElementById('listar_pedidos').style.display="none"
    document.getElementById('recebimentos').style.display="none"
    document.getElementById('tbl_produto').style.display="none"
    ta = document.getElementById("tpedidos")

    if (ta.querySelectorAll("tr").length>0)
        document.getElementById('tpedidos').remove()
    
    document.getElementById('txt_tt').value = "0"

    document.getElementById('div_obss').style.display = "none"
}

function check_produtos(){
    
    if (document.getElementById('txt_fone').value == ""){
        M.toast({html: 'Selecione um cliente!'})
        return false
    }
    if (document.getElementById('txt_qtd').value == ""){
        M.toast({html: 'Quantidade inválido'})
        return false
    }
    if (document.getElementById('txt_cod').value == ""){
        M.toast({html: 'Codigo inválido'})
        return false
    }
    select = document.getElementById("produtos");
    if (select.options[select.selectedIndex].text == "Selecione o produto"){
        M.toast({html: 'Descricao do produto inválido'})
        return false
    }
    return true
}

function testar_campos(){
    
    if (document.getElementById('txt_fone').value == ""){
        M.toast({html: 'Selecione um cliente!'})
        return false
    }
    if (document.getElementById('txt_endentrega').value == ""){
        M.toast({html: 'Endereço de entrega inválido!'})
        return false
    }
    if (document.getElementById('form_entrega').style.display === "block" && document.getElementById('txt_numero').value == ""){
        M.toast({html: 'Numero do endereço de entrega inválido!'})
        return false
    }
    ta = document.getElementById("tpedidos")

    if (ta.querySelectorAll("tr").length==0){
        M.toast({html: 'Nenhum produto inserido!'})
        return false
    }
        
    
    return true

}

function clear_produtos(){
    
    document.getElementById('txt_qtd').value = ""
    document.getElementById('txt_cod').value = ""
    document.getElementById('txt_valor').value = ""
    
    document.getElementById("produtos").selectedIndex = 0


    M.updateTextFields();
}

function busca_cep(){
    var cep = document.getElementById('txt_endentrega').value
        //Verifica se campo cep possui valor informado.
    if (cep.trim() != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep.replace(/\D/g, ''))) {

                    //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    document.getElementById('txt_endentrega').value = dados.cep +" - " + dados.logradouro + " - " + dados.bairro + " - " + dados.localidade
                    taxa = dados.bairro
                    document.getElementById('form_entrega').style.display = "block"

                    M.updateTextFields();
                } //end if.
                else {
                    swal({
                    text: "CEP incorreto",
                    icon: "error",
                    });
                }
            });
        }else{
            if(document.getElementById('txt_endentrega').value !='Balcao')
                document.getElementById('form_entrega').style.display = "block"
        }
    }else{
        document.getElementById('txt_endentrega').value = document.getElementById('txt_end').value
        M.updateTextFields();
    }
}

function inserir_produto(codigo, descricao, valor, qtd, obs, taxa){

    tbody = document.getElementById('tpedidos')
    if(qtd == 0.2 || qtd == 0.3 || qtd == 0.4){
        val = parseFloat(valor) * 1
    }else{
        val = parseFloat(valor) * parseFloat(qtd)
    }

    
    tbody.innerHTML += "\
    <tr ondblclick='excluir_lstproduto(this.rowIndex-1, "+val+", "+qtd+")' class='tr-row'>\
        <td>"+ qtd +"</td>\
        <td>"+ codigo +"</td>\
        <td>"+ descricao +"</td>\
        <td>"+ parseFloat(val).toFixed(2)+"</td>\
        <td>"+ obs +"</td>\
    </tr>"
    console.log(taxa + "asksaksak")
    subtotal = parseFloat(document.getElementById('txt_tt').value ) + parseFloat(taxa)
    
    total = subtotal + val
    
    console.log(total)
    document.getElementById('txt_tt').value = parseFloat(total).toFixed(2)
    
    M.updateTextFields()
}

function divisao_produto(codigo, descricao, valor, qtd, obs, taxa){
    console.log(codigo, descricao, valor, qtd, obs)
    if(qtd == "0.2"){

        if(pizza2 == 2)
            pizza2 = 0
        if(pizza2 == 0){
            
            console.log("pizza 22")
            inserir_produto(codigo, descricao,0,qtd,obs,taxa)
            pizza2 = 1
            pizza2_valor = valor
        }else if(pizza2 == 1){
            divi=0
            if(pizza2_valor >= valor){
                inserir_produto(codigo, descricao,pizza2_valor,qtd,obs,taxa)
            }else{
                
                inserir_produto(codigo, descricao,valor,qtd,obs,taxa)
            }
            pizza2 = 2
        }
            
        console.log(pizza2)
    }else if(qtd == "0.3"){

        if(pizza3 == 3)
            pizza3 = 0
        console.log(pizza3_valor , valor)
        if(pizza3_valor <= valor)
            pizza3_valor = valor
        if(pizza3 == 0){
            inserir_produto(codigo, descricao,0,qtd,obs,taxa)
            pizza3 = 1
        }else if(pizza3 == 1){
            inserir_produto(codigo, descricao,0,qtd,obs,taxa)
            pizza3 = 2
        }else if(pizza3 == 2){
            divi = 0
            if(pizza3_valor >= valor){
                inserir_produto(codigo, descricao,pizza3_valor,qtd,obs,taxa)
            }else{
                
                inserir_produto(codigo, descricao,valor,qtd,obs,taxa)
            }
            pizza3 = 3
        }

    }else if(qtd == "0.4"){
        if(pizza4 == 4)
            pizza4 = 0
        console.log("pizza 4")
        if(pizza4_valor <= valor)
            pizza4_valor = valor
        if(pizza4 == 0){
            inserir_produto(codigo, descricao,0,qtd,obs,taxa)
            pizza4 = 1
        }else if(pizza4 == 1){
            inserir_produto(codigo, descricao,0,qtd,obs,taxa)
            pizza4 = 2
        }else if(pizza4 == 2){
            inserir_produto(codigo, descricao,0,qtd,obs,taxa)
            pizza4 = 3
        }else if(pizza4 == 3){
            divi = 0
            if(pizza4_valor >= valor){
                inserir_produto(codigo, descricao,pizza4_valor,qtd,obs,taxa)
            }else{
                
                inserir_produto(codigo, descricao,valor,qtd,obs,taxa)
            }
            pizza4 = 4
        }
    }
}

function receber(){
    
    esconder_forms("receber")
    form = document.getElementById('recebimentos')
    
    if(form.style.display=="none"|| form.style.display===""){
        swal("Digite o numero do pedido:", {
            content: "input",
        })
        .then((value) => {
            if (value!=null && value != ""){
                fetch('/home/receber/',{
                    method: "POST",
                    headers:{
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify({
                        codigo: value, 
                    })
    
                }).then(function(result){
                    return result.json()
                }).then(function(data){
                    console.log(data + "aqui")

                    if(data['status']==200){

                        document.getElementById('txt_pedido').value = value
                        document.getElementById('txt_total').value = parseFloat(data['total']).toFixed(2)
                        form.style.display = "block"
                        scroll(0, 1000);
                        M.updateTextFields();
                    }else if(data['status']==300){
                        M.toast({html: 'Pedido não encontrado!'})
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
    else
        form.style.display = "none"
}

function receber_verificar(){
    din = document.getElementById('txt_dinheiro').value.trim()
    if(din == "")
        din = 0
    if(!isNaN(din)){
        credito = document.getElementById('txt_credito').value.trim()
        if(credito == "")
            credito = 0
        if(!isNaN(credito)){
            debito = document.getElementById('txt_debito').value.trim()
            if(debito == "")
                debito = 0
            if(!isNaN(debito)){
                pix = document.getElementById('txt_pix').value.trim()
                if(pix == "")
                    pix = 0
                if(!isNaN(pix)){
                    vr = document.getElementById('txt_vr').value.trim()
                    if(vr == "")
                        vr = 0
                    if(!isNaN(vr)){
                        sodexo = document.getElementById('txt_sodexo').value.trim()
                        if(sodexo == "")
                            sodexo = 0
                        if(!isNaN(sodexo)){
                            alelo = document.getElementById('txt_alelo').value.trim()
                            if(alelo == "")
                                alelo = 0
                            if(!isNaN(alelo)){
                                total = parseFloat(din)  + parseFloat(credito) + parseFloat(debito) + parseFloat(pix) + parseFloat(vr) + parseFloat(sodexo) + parseFloat(alelo) 
                                return total
                            }else{
                                M.toast({html: 'Alelo inválido'})
                                return false
                            }
                        }else{
                            M.toast({html: 'Sodexo inválido'})
                            return false
                        }
                    }else{
                        M.toast({html: 'VR inválido'})
                        return false
                    }
                }else{
                    M.toast({html: 'Pix inválido'})
                    return false
                }
            }else{
                M.toast({html: 'Débito inválido'})
                return false
            }
        }else{
            M.toast({html: 'Crédito inválido'})
            return false
        }
    }else{
        M.toast({html: 'Dinheiro inválido'})
        return false
    }

}

function dinheiro(){
    din = parseFloat( document.getElementById('txt_dinheiro').value.trim())
    total = parseFloat( document.getElementById('txt_total').value.trim())
    if(!isNaN(din)){
        if(din > total){
            document.getElementById('txt_troco').value = parseFloat( din - total).toFixed(2)
            M.updateTextFields()
        }else{
            document.getElementById('txt_troco').value = ""
            M.updateTextFields()
        }
    }else{
        document.getElementById('txt_troco').value = ""
        M.updateTextFields()
    }
}
function receber_pedido(){
    
    subt = receber_verificar()
    console.log(subt)
    if(subt != false){
        if(document.getElementById('txt_troco').value != ""){
            subt = subt - parseFloat(document.getElementById('txt_troco').value)
        }
        if (document.getElementById('txt_total').value == subt){
            swal({
                text: "Confirmar o recebimento",
                buttons: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    fetch('/home/confirmar_receber/',{
                        method: "POST",
                        headers:{
                            'X-CSRFToken': csrf_token,
                        },
                        body: JSON.stringify({
                            codigo: document.getElementById('txt_pedido').value,
                            dinheiro : parseFloat( document.getElementById('txt_dinheiro').value),
                            credito :parseFloat( document.getElementById('txt_credito').value),
                            debito :parseFloat( document.getElementById('txt_debito').value),
                            pix :parseFloat( document.getElementById('txt_pix').value),
                            vr :parseFloat( document.getElementById('txt_vr').value),
                            sodexo :parseFloat(  document.getElementById('txt_sodexo').value),
                            alelo :parseFloat( document.getElementById('txt_alelo').value),
                        })
                    }).then(function(result){
                        return result.json()
                    }).then(function(data){
                        var dataa = 200
                        console.log(data, dataa)
                        if(data['status'] == 200){
                            swal({
                                text: "Pedido recebido!",
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
        }else{
            M.toast({html: 'Divergencia de valores'})
        }    
    }
    
}
function consultar(){
    swal("Digite o numero do pedido:", {
        content: "input",
    })
    .then((value) => {
        console.log(value)
        if (value!=null && value != "" && !isNaN(value)){
            
            fetch('/home/buscar_pedido/',{
                method: "POST",
                headers:{
                    'X-CSRFToken': csrf_token,
                },
                body: JSON.stringify({
                    pedido: value,
                })

            }).then(function(result){
                return result.json()
            }).then(function(data){
                if(data['status']==200){
                    console.log(data['produtos'])
                    document.getElementById('txt_fone').value = data['pedido']['fone_cliente']
                    document.getElementById('txt_nome').value = data['pedido']['nome_cliente']
                    document.getElementById('txt_endentrega').value = data['pedido']['end_entrega']
                    tbody = document.getElementById('tpedidos')
                    tt = 0;
                    tbody.innerHTML = ""
                    for(i=0; i<data['produtos'].length; i++){
                        tbody.innerHTML += "\
                        <tr>\
                            <td> "+ data['produtos'][i]['fields']['qtd_prod'] +" </td>\
                            <td> "+ data['produtos'][i]['fields']['cod_produto'] +" </td>\
                            <td> "+ data['produtos'][i]['fields']['desc_prod'] +" </td>\
                            <td>"+ parseFloat(data['produtos'][i]['fields']['valor_prod']).toFixed(2)+"</td>\
                            <td>"+ data['produtos'][i]['fields']['obs_prod'] +"</td>\
                        </tr>"
                        tt += data['produtos'][i]['fields']['valor_prod']
                    }
                    document.getElementById('txt_tt').value = parseFloat(tt).toFixed(2)
                    
                    M.updateTextFields();
                    if(data['produtos'][0]['fields']['estado'] == 3)
                        M.toast({html: 'Esse pedido foi cancelado'})
                }else{
                    swal({
                        text: "Pedido não encontrado!",
                        icon: "error",
                    });
                }
                
            })    
            
        }else{
            M.toast({html: 'Codigo inválido'})
        }
    });
}

function listar(){
    
    esconder_forms("listar")
    form = document.getElementById('listar_pedidos')
    
    if(form.style.display=="none"|| form.style.display===""){
        form.style.display = "block"
        
        scroll(0, 1000);
    }else{
        form.style.display = "none"
    }

}

function buscar_cliente(){
    fone = document.getElementById('txt_fone')
    if (fone.value.trim().length>=8 && fone.value.trim().length<=11){

        data = new FormData()
        data.append('fone', fone.value)
        fetch('/home/buscar_cliente/',{
            method: "POST",
            headers:{
                'X-CSRFToken': csrf_token,
            },
            body: data

        }).then(function(result){
            return result.json()
        }).then(function(data){
            if(data['data'] != 500){
                id_cliente = data['id_cliente']
                document.getElementById('txt_nome').value = data['clientes'].nome
                
                document.getElementById('txt_end').value = data['clientes'].cep +" - "+ data['clientes'].rua +" - "+ data['clientes'].bairro + " - " + data['clientes'].cidade +" - "+data['clientes'].numero + " - "+data['clientes'].comp
                taxa = data['clientes'].bairro
                if (data['clientes'].obs !=""){
                    document.getElementById('txt_obss').value = data['clientes'].obs
                    document.getElementById('div_obss').style.display = "block"    
                }
                
                M.updateTextFields()    
            }else{
                sessionStorage.setItem("num_cliente", fone.value)
                window.location.href = "../clientes/";
            }
            
            
            
        })
    }else if (fone.value.trim()!=""){
        fone.value = ""
        M.toast({html: 'Telefone inválido'})
    }
}

function add_produto(){


    if(check_produtos() && document.getElementById('txt_end').value !=""){
        swal("Observação do produto:", {
            content: "input",
        })
        .then((obsproduto) => {
            tbody = document.getElementById('tpedidos')
            select = document.getElementById('produtos')
            
            qtd = document.getElementById('txt_qtd').value
            let intt = Number.isInteger(qtd)
            console.log(intt + "teseteee")
            if(document.getElementById('txt_cod').value>300 && intt == false)
                qtd = 1
            if(taxa != ""){
                cadastrar_bairro = taxa
                fetch('/home/buscar_bairro/',{
                    method: "POST",
                    headers:{
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify({
                        taxa: taxa, 
                    })
    
                }).then(function(result){
                    return result.json()
                }).then(function(data){
                    console.log(data)
                    if(data['status']==200){
                        tbody.innerHTML = ""
                        tbody.innerHTML += "\
                        <tr>\
                            <td> 1 </td>\
                            <td> 0 </td>\
                            <td> Taxa </td>\
                            <td>"+ parseFloat(data['taxa']).toFixed(2)+"</td>\
                            <td></td>\
                        </tr>"
                        taxa_entrega = data['taxa']
                        taxa=""
                        
                        if(qtd == "0.2" || qtd == "0.3" || qtd == "0.4"){
                            divi = 1
                            console.log('ta')
                            divisao_produto(document.getElementById('txt_cod').value,select.options[select.selectedIndex].text,document.getElementById('txt_valor').value,qtd,obsproduto,data['taxa'])
                        }else{
                            inserir_produto(document.getElementById('txt_cod').value,select.options[select.selectedIndex].text,document.getElementById('txt_valor').value,qtd,obsproduto,data['taxa'])
                            console.log('taaa')
                        }
                        
                        clear_produtos()
                        document.getElementById('txt_qtd').focus()
                    } else if(data['status']==500){
                        
                        swal("Bairro não cadastrado, inserir o valor da taxa:", {
                            content: "input",
                        })
                        .then((bairroval) => {
                            if(!isNaN(bairroval) && bairroval != null && bairroval.trim() != ""){
                                tbody.innerHTML = ""
                                tbody.innerHTML += "\
                                <tr>\
                                    <td> 1 </td>\
                                    <td> 0 </td>\
                                    <td> Taxa </td>\
                                    <td>"+ parseFloat(bairroval).toFixed(2)+"</td>\
                                    <td></td>\
                                </tr>"
                                taxa_entrega = bairroval
                                taxa=""
                                if(qtd == "0.2" || qtd == "0.3" || qtd == "0.4"){
                                    divi = 1;
                                    console.log('ta')
                                    divisao_produto(document.getElementById('txt_cod').value,select.options[select.selectedIndex].text,document.getElementById('txt_valor').value,qtd,obsproduto,bairroval)
                                }else{
                                    inserir_produto(document.getElementById('txt_cod').value,select.options[select.selectedIndex].text,document.getElementById('txt_valor').value,qtd,obsproduto,bairroval)
                                    console.log('taaa')
                                }
                                clear_produtos()
                                document.getElementById('txt_qtd').focus()

                                fetch('/home/cadastrar_bairro/',{
                                    method: "POST",
                                    headers:{
                                        'X-CSRFToken': csrf_token,
                                    },
                                    body: JSON.stringify({
                                        bairro: cadastrar_bairro,
                                        valor: bairroval, 
                                    })
                    
                                }).then(function(result){
                                    return result.json()
                                }).then(function(data){ 
                                    if(data['status'] != 200){
                                        swal({
                                            text: "Ocorreu algum erro !",
                                            icon: "error",
                                        });
                                    }
                                })    
                            }else{
                                swal({
                                    text: "Valor incorreto!",
                                    icon: "warning",
                                });
                            }
                            
                        })
                    }else{
                        swal({
                            text: "Ocorreu algum erro para incluir a taxa de entrega!",
                            icon: "error",
                        });
                    }
                })   
            }else{
                
                if(qtd == "0.2" || qtd == "0.3" || qtd == "0.4"){
                    divi = 1
                    console.log('ta')
                    divisao_produto(document.getElementById('txt_cod').value,select.options[select.selectedIndex].text,document.getElementById('txt_valor').value,qtd,obsproduto,0)
                }else{
                    inserir_produto(document.getElementById('txt_cod').value,select.options[select.selectedIndex].text,document.getElementById('txt_valor').value,qtd,obsproduto,0)
                    console.log('taaa')
                }  
                clear_produtos()
                document.getElementById('txt_qtd').focus()
            }
            
            
        });    
    }
    
}

function excluir_lstproduto(index, valor, qtd){

    if(qtd == 0.2){
        val = pizza2
        pizza2 = val-1
    }if(qtd == 0.3){
        val = pizza3
        pizza3 = val-1
    }if(qtd == 0.4){
        val = pizza4
        pizza4 = val-1
    }
    document.getElementById('tpedidos').deleteRow(index);
    document.getElementById('txt_tt').value = parseFloat(parseFloat(document.getElementById('txt_tt').value) - parseFloat(valor)).toFixed(2)
    
}

function buscar_produto(value){
    if(value==1){
        codigo = document.getElementById('txt_cod').value
    }else{
       codigo = document.getElementById('produtos').value
    }
    if (codigo!= ""){
        document.getElementById('tbl_produto').style.display = "none"
        data = new FormData()
        data.append('codigo', codigo)
        fetch('/home/buscar_produto/',{
            method: "POST",
            headers:{
                'X-CSRFToken': csrf_token,
            },
            body: data

        }).then(function(result){
            return result.json()
        }).then(function(data){
            if(data['status']==200){
                document.getElementById('txt_cod').value = data['produtos'].codigo
                document.getElementById('txt_valor').value = parseFloat( data['produtos'].valor).toFixed(2)
                
                document.getElementById('produtos').value = data['produtos'].codigo

                /*document.getElementById('txt_end').value = data['clientes'].cep +" - "+ data['clientes'].rua +" - "+ data['clientes'].bairro + " - " + data['clientes'].cidade +" - "+data['clientes'].numero + " - "+data['clientes'].comp

                if (data['clientes'].obs !=""){
                    document.getElementById('txt_obss').value = data['clientes'].obs
                    document.getElementById('div_obss').style.display = "block"    
                }
                */
                
                M.updateTextFields()    
            }else if(data['status'] == 300){
                
                M.toast({html: 'Codigo inválido'})
            }
            
        })
    }else{
        
        document.getElementById('tbl_produto').style.display = "none"
    }
   
}

function gerarpdf(endereco, array, num_pedido, obspedido, telefone, nome){
    let doc = new jsPDF();
    doc.setFont('Roboto-Regular');
    doc.setFontType('bold');
    doc.setFontSize(25);
    doc.text(40, 10, "ENCASA");
    
    doc.setFontType('regular');
    doc.setFontSize(18);
    doc.text(45, 18, "Pizzaria");
    
    doc.setFontSize(12);
    today = new Date()
    doc.text(39, 25, ''+new Intl.DateTimeFormat('pt-BR').format(today)+' - '+ new Intl.DateTimeFormat('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/Sao_Paulo'} ).format(today))
    doc.line(1, 30, 110, 30);
    doc.line(1, 31, 110, 31);

    doc.setFontType('bold');
    doc.setFontSize(20);
    doc.text(25, 40, "Pedido: "+ num_pedido +" - "+''+new Intl.DateTimeFormat('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/Sao_Paulo'} ).format(today) +'');
    
    doc.line(1, 45, 110, 45);
    doc.line(1, 46, 110, 46);
    
    doc.setFontSize(16);
    
    doc.setFontType('regular');

    doc.text(1, 52, "Qtd");
    doc.text(20, 52, "Descrição");
    doc.text(95, 52, "Total");

    doc.line(1, 55, 110, 55);
    doc.line(1, 56, 110, 56);

    linha = 62
    tot = 0
    for(i=0; i<array.length; i++){
        doc.text(1, linha, array[i][0].replace(/0\./g, "1/"));
        doc.text(20, linha, array[i][2]);
        doc.text(95, linha, array[i][3]);
         
        if(array[i][4]!=""){
            linha +=5
            doc.text(25, linha, array[i][4]);
            
        }
        linha+= 10
        console.log(array[i][3])
        tot = tot + parseFloat(array[i][3])
        
        console.log(tot)
    }
    

    linha+=2
    doc.line(1, linha, 110, linha);
    doc.line(1, linha+1, 110, linha+1);

    linha+=10
    doc.setFontType('bold');
    doc.text(40, linha, "Total");
    doc.text(95, linha, tot.toFixed(2));

    
    doc.setFontType('regular');
    doc.line(1, linha+3, 110, linha+3);
    doc.line(1, linha+4, 110, linha+4);

    linha+=4
    doc.setFontSize(12);
    doc.text(1, linha+5, "NÃO É VALÍDO COMO DOCUMENTO FISCAL");
    linha+=5
    
    doc.setFontSize(16);
    
    doc.setFontType('bold');
    //doc.text(1, linha+15, ''+ endereco +'');
    var parts = doc.splitTextToSize(endereco, 115); // 180 é a largura da linha em pontos
    
    // Adiciona cada parte do texto ao PDF em uma linha separada
    for (var i = 0; i < parts.length; i++) {
        doc.text(1, linha+=10, parts[i]); // 10 é a posição X e 10 + (i * 10) é a posição Y
    }
    doc.text(1, linha+=10, nome)
    doc.text(1, linha+=10, telefone)
    linha+=5
    
    if(obspedido!="")
        doc.text(1, linha+=10, obspedido)

//////////////////////////////////
    doc.addPage();
    doc.setFont('Roboto-Regular');
    doc.setFontType('bold');
    doc.setFontSize(25);
    doc.text(40, 10, "ENCASA");

    doc.setFontType('regular');
    doc.setFontSize(18);
    doc.text(45, 18, "Pizzaria");

    doc.setFontSize(12);
    today = new Date()
    doc.text(39, 25, ''+new Intl.DateTimeFormat('pt-BR').format(today)+' - '+''+ new Intl.DateTimeFormat('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/Sao_Paulo'} ).format(today))
    doc.line(1, 30, 110, 30);
    doc.line(1, 31, 110, 31);

    doc.setFontType('bold');
    doc.setFontSize(20);
    doc.text(25, 40, "Pedido: "+ num_pedido +" -"+''+new Intl.DateTimeFormat('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/Sao_Paulo'} ).format(today) +'');

    doc.line(1, 45, 110, 45);
    doc.line(1, 46, 110, 46);

    doc.setFontSize(16);

    doc.setFontType('regular');

    doc.text(1, 52, "Qtd");
    doc.text(20, 52, "Descrição");

    doc.line(1, 55, 110, 55);
    doc.line(1, 56, 110, 56);

    linha = 62
    for(i=0; i<array.length; i++){
        doc.text(1, linha, array[i][0].replace(/0\./g, "1/"));
        doc.text(20, linha, array[i][2]);
        
        if(array[i][4]!=""){
            linha +=5
            doc.text(25, linha, array[i][4]);
            
        }
        linha+= 10
    }


    linha+=2
    doc.line(1, linha, 110, linha);
    doc.line(1, linha+1, 110, linha+1);

    linha+=4    
    doc.setFontSize(16);

    doc.setFontType('bold');
    //doc.text(1, linha+15, ''+ endereco +'');
    var parts = doc.splitTextToSize(endereco, 115); // 180 é a largura da linha em pontos

    // Adiciona cada parte do texto ao PDF em uma linha separada
    for (var i = 0; i < parts.length; i++) {
        doc.text(1, linha+=10, parts[i]); // 10 é a posição X e 10 + (i * 10) é a posição Y
    }
    doc.text(1, linha+=10, nome)
    doc.text(1, linha+=10, telefone)

    linha+=5
    if(obspedido!=""){
        
        doc.line(1, linha, 110, linha);
        doc.text(1, linha+=10, obspedido)
        
        doc.line(1, linha+1, 110, linha+1);
    }
        


    console.log("aqui5")
    doc.save('a5.pdf')
    
    
}


function fechar_pedido(){
    //id_cliente ja existe
    //testar os campos
    
    if (testar_campos() && document.getElementById('txt_end').value !=""){
        entrega = document.getElementById('txt_endentrega').value
        var parts = entrega.split('-');
        
        tabela = document.getElementById("tpedidos");

        if (tabela.querySelectorAll("tr").length>0){
            if(divi == 1){
                M.toast({html: 'Pizza incompleta'})
                return false
            }
            swal({
                title: "Fechar pedido?",
                icon: "warning",
                buttons: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    swal("Observação do pedido", {
                        content: "input",
                    })
                    .then((value) => {

                        if(document.getElementById('txt_numero').value.trim()!=""){
                            numero = document.getElementById('txt_numero').value
                            comp = document.getElementById('txt_comp').value
                            obs = document.getElementById('txt_obs').value
                            entrega += "-"+ numero + " - "+ comp + " - "+ obs
                        }
            
                        var array = new Array(tabela.querySelectorAll("tr").length)
            
                        contador = 0
                        i=0
                        teste = 1
                        for(var y = 0; y<tabela.querySelectorAll("tr").length; y++)
                            array[y] = new Array(5)
            
                        for(var x=0; x<tabela.querySelectorAll("td").length; x++){
                            
                            array[i][contador] = tabela.querySelectorAll("td")[x].innerHTML
            
                            if(teste % 5 == 0 ){
                                i++
                                teste++
                                contador=0
                            }else{
                                teste++
                                contador++
                            }
                        }
                        
                        fetch('/home/fechar_pedido/',{
                            method: "POST",
                            headers:{
                                'X-CSRFToken': csrf_token,
                            },
                            body: JSON.stringify({
                                id_cliente: id_cliente,
                                pedidos: array,
                                entrega: entrega,
                                taxa_entrega: taxa_entrega,
                                total: parseFloat(document.getElementById('txt_tt').value),
                            })
                        }).then(function(result){
                            return result.json()
                        }).then(function(data){
                            console.log(array)
                            
                            if(data['status']==200){
                                gerarpdf(entrega, array, data['num_pedido'], value, document.getElementById('txt_fone').value, document.getElementById('txt_nome').value)

                                location.reload()
                                
                            }
                            
                            
                        })    
                    });
                }
              });
            
        }else{
            M.toast({html: 'Nenhum item selecionado'})
        }    
    }
    
   
}

function cancelar_pedido(cod_pedido){
    console.log(cod_pedido)

    swal({
        text: "Deseja cancelar esse pedido",
        icon: "warning",
        buttons: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            fetch('/home/cancelar_pedido/',{
                method: "POST",
                headers:{
                    'X-CSRFToken': csrf_token,
                },
                body: JSON.stringify({
                    codigo: cod_pedido,
                })
            }).then(function(result){
                return result.json()
            }).then(function(data){
                if(data['status'] == 200){
                    swal({
                        text: "Pedido cancelado!",
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