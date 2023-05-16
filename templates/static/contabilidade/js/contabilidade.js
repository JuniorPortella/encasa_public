
var dinheiro = 0
var credito = 0
var debito = 0
var pix = 0
var vr = 0
var sodexo = 0
var alelo = 0
var total = 0
var grafico = 0
var myChart = ""
var myChart1 = ""
var myChart2 = ""
var myChart3 = ""
var myChart4 = ""
csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

document.addEventListener("DOMContentLoaded", function(e) {
    console.log("entrouuuu")
    let username = sessionStorage.getItem("username")
    let adm = sessionStorage.getItem("adm")
    if(username == null || adm == null){
        window.location.href = "../index/";
    }
});


function check_date(di, df){
    if(di == ""){
        M.toast({html: 'Data Inicial inválida'})
        return false
    }
    if(df == ""){
        M.toast({html: 'Data Final inválida'})
        return false
    }
    if(df<di){
        M.toast({html: 'Data Final menor que Data Inicial'})
        return false
    }
    return true
}

function buscar(){
    
    let di = document.getElementById('txt_datei').value.split('/').reverse().join('-')
    let df = document.getElementById('txt_datef').value.split('/').reverse().join('-')

   if(check_date(di,df)){
    fetch('/contabilidade/buscar/',{
        method: "POST",
        headers:{
            'X-CSRFToken': csrf_token,
        },
        body: JSON.stringify({
            di: di,
            df: df, 
        })

    }).then(function(result){
        return result.json()
    }).then(function(data){
        console.log(data)
        let normal = 0, normalt = 0
        let brotinho = 0, brotinhot = 0
        let gigante = 0, gigantet = 0
        let calzone = 0, calzonet = 0
        let refri2l = 0, refri2lt = 0
        let refri600 = 0, refri600t = 0
        let refrilata = 0, refrilatat = 0
        let cerveja = 0, cervejat = 0
        let agua = 0, aguat = 0
        let refri1l = 0, refri1lt = 0
        let suco = 0, sucot = 0
        let me2=0
        let me3 =0
        let me4 = 0
        for (i=0; i<data['normal'].length; i++){
            if(data['normal'][i]['fields']['qtd_prod'] == 0.2){
                me2++
                console.log(me2)
                if(me2 == 2){
                    normal++
                    me2 = 0
                }
            }else{
                if(data['normal'][i]['fields']['qtd_prod'] == 0.3){
                    me3++
                    if(me3 == 3){
                        normal++
                        me3 = 0
                    }
                }else{
                    if(data['normal'][i]['fields']['qtd_prod'] == 0.4){
                        me4++
                        if(me4 == 4){
                            normal++
                            me4 = 0
                        }
                    }else{
                        normal += data['normal'][i]['fields']['qtd_prod']
                    }
                }
            }
        }
        for (i=0; i<data['brotinho'].length; i++){
            if(data['brotinho'][i]['fields']['qtd_prod'] == 0.2){
                me2++
                console.log(me2)
                if(me2 == 2){
                    brotinho++
                    me2 = 0
                }
            }else{
                if(data['brotinho'][i]['fields']['qtd_prod'] == 0.3){
                    me3++
                    if(me3 == 3){
                        brotinho++
                        me3 = 0
                    }
                }else{
                    if(data['brotinho'][i]['fields']['qtd_prod'] == 0.4){
                        me4++
                        if(me4 == 4){
                            brotinho++
                            me4 = 0
                        }
                    }else{
                        brotinho += data['brotinho'][i]['fields']['qtd_prod']
                    }
                }
            }
        }
        for (i=0; i<data['gigante'].length; i++){
            if(data['gigante'][i]['fields']['qtd_prod'] == 0.2){
                me2++
                console.log(me2)
                if(me2 == 2){
                    gigante++
                    me2 = 0
                }
            }else{
                if(data['gigante'][i]['fields']['qtd_prod'] == 0.3){
                    me3++
                    if(me3 == 3){
                        gigante++
                        me3 = 0
                    }
                }else{
                    if(data['gigante'][i]['fields']['qtd_prod'] == 0.4){
                        me4++
                        if(me4 == 4){
                            gigante++
                            me4 = 0
                        }
                    }else{
                        gigante += data['gigante'][i]['fields']['qtd_prod']
                    }
                }
            }
        }
        calzone = data['calzone'].length
        refri2l = data['refri2l'].length
        refri600 = data['refri600'].length
        refrilata = data['refrilata'].length
        cerveja = data['cerveja'].length
        agua = data['agua'].length
        refri1l = data['refri1l'].length
        suco = data['suco'].length

        for(i=0; i<data['normal'].length; i++){
            normalt += parseFloat(data['normal'][i]['fields']['valor_prod'])
        }
        for(i=0; i<brotinho; i++){
            brotinhot += parseFloat(data['brotinho'][i]['fields']['valor_prod'])
        }
        for(i=0; i<gigante; i++){
            gigantet += parseFloat(data['gigante'][i]['fields']['valor_prod'])
        }
        for(i=0; i<calzone; i++){
            calzonet += parseFloat(data['calzone'][i]['fields']['valor_prod'])
        }
        for(i=0; i<refri2l; i++){
            refri2lt += parseFloat(data['refri2l'][i]['fields']['valor_prod'])
        }
        for(i=0; i<refri600; i++){
            refri600t += parseFloat(data['refri600'][i]['fields']['valor_prod'])
        }
        for(i=0; i<refrilata; i++){
            refrilatat += parseFloat(data['refrilata'][i]['fields']['valor_prod'])
        }
        for(i=0; i<cerveja; i++){
            cervejat += parseFloat(data['cerveja'][i]['fields']['valor_prod'])
        }
        for(i=0; i<agua; i++){
            aguat += parseFloat(data['agua'][i]['fields']['valor_prod'])
        }
        for(i=0; i<refri1l; i++){
            refri1lt += parseFloat(data['refri1l'][i]['fields']['valor_prod'])
        }
        for(i=0; i<suco; i++){
            sucot += parseFloat(data['suco'][i]['fields']['valor_prod'])
        }




        total = 0
        dinheiroo= 0
        credito= 0
        debito= 0
        pix= 0
        vr= 0
        sodexo= 0
        alelo= 0
        let vendas = data['vendas']
        for (var i=0; i<vendas.length; i++){
            if(vendas[i]['fields']['dinheiro'] != null)
                dinheiroo += vendas[i]['fields']['dinheiro'] - vendas[i]['fields']['taxa_entrega']
            if(vendas[i]['fields']['credito']!=null)
                credito += vendas[i]['fields']['credito'] - vendas[i]['fields']['taxa_entrega']
            if(vendas[i]['fields']['debito']!=null)
                debito += vendas[i]['fields']['debito'] - vendas[i]['fields']['taxa_entrega']
            if(vendas[i]['fields']['pix']!=null)
                pix += vendas[i]['fields']['pix'] - vendas[i]['fields']['taxa_entrega']
            if(vendas[i]['fields']['vr']!=null)
                vr += vendas[i]['fields']['vr'] - vendas[i]['fields']['taxa_entrega']
            if(vendas[i]['fields']['sodexo']!=null)
                sodexo += vendas[i]['fields']['sodexo'] - vendas[i]['fields']['taxa_entrega']
            if(vendas[i]['fields']['alelo']!=null)
                alelo += vendas[i]['fields']['alelo'] - vendas[i]['fields']['taxa_entrega']
            if(vendas[i]['fields']['total']!=null)
                total += vendas[i]['fields']['total'] - vendas[i]['fields']['taxa_entrega']
            
        }


        const canvas = document.getElementById('ChartPizza');
        

        const canvas2 = document.getElementById('ChartBebidas');
        
        
        const canvas3 = document.getElementById('ChartRecebidos');

        if(grafico == 1 ){
            myChart.destroy();
            myChart1.destroy();
            myChart2.destroy();
            grafico = 0
        }
          
        myChart = new Chart(canvas, {
            type: 'doughnut',
            data: {
            labels: ['Pizza Normal', 'Pizza Brotinho', 'Pizza Gigante', 'Calzone'],
            datasets: [{
                data: [normal, brotinho, gigante, calzone],
                borderWidth: 1
            }]
            }
        });

        myChart1 =  new Chart(canvas2, {
            type: 'doughnut',
            data: {
            labels: ['Refri. 2L', 'Refri. 1L', 'Refri. 600', 'Refri. Lata', 'Agua', 'Suco', 'Cerveja'],
            datasets: [{
                data: [refri2l, refri1l, refri600, refrilata, agua, suco, cerveja],
                borderWidth: 1
            }]
            }
        });  

        document.getElementById('txt_normal').value = "Pizza normal: R$" + normalt.toFixed(2)
        document.getElementById('txt_brotinho').value = "Pizza brotinho: R$" + brotinhot.toFixed(2)
        document.getElementById('txt_gigante').value = "Pizza gigante: R$" + gigantet.toFixed(2)
        document.getElementById('txt_calzone').value = "Pizza calzone: R$" + calzonet.toFixed(2)

        
        document.getElementById('txt_refri2').value = "Refri. 2L: R$" + refri2lt.toFixed(2)
        document.getElementById('txt_refri1').value = "Refri. 1L: R$" + refri1lt.toFixed(2)
        document.getElementById('txtrefri600').value = "Refri. 600: R$" + refri600t.toFixed(2)
        document.getElementById('txt_refrilata').value = "Refri. Lata: R$" + refrilatat.toFixed(2)
        document.getElementById('txt_agua').value = "Agua: R$" + aguat.toFixed(2)
        document.getElementById('txt_suco').value = "Suco: R$" + sucot.toFixed(2)
        document.getElementById('txt_cerveja').value = "Cerveja: R$" + cervejat.toFixed(2)


        myChart2 = new Chart(canvas3, {
            type: 'bar',

            data: {
            labels: ['Dinherio', 'Crédito', 'Débito', 'Pix', 'VR', 'Sodexo', 'Alelo'],
            datasets: [{
                label: 'Recebidos',
                data: [dinheiroo.toFixed(2), credito.toFixed(2), debito.toFixed(2), pix.toFixed(2), vr.toFixed(2), sodexo.toFixed(2), alelo.toFixed(2)],
                borderWidth: 1
                
            }]
            
            },
            options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
            }
            
        });
        grafico = 1
        document.getElementById('txt_total').value = "Total recebido no periodo: R$" + total.toFixed(2)

        if(data['status']==200){
           
        } else if(data['status']==500){
            
        }else{
            swal({
                text: "Ocorreu algum erro",
                icon: "error",
            });
        }
    }) 
   }
}