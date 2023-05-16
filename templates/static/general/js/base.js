

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

closeBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("open");
    menuBtnChange();
});

function menuBtnChange() {
if(sidebar.classList.contains("open")){
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
}else {
    closeBtn.classList.replace("bx-menu-alt-right","bx-menu");
}
}



function sair_sistema(){
    console.log("sair")
    swal({
        text: "Deseja sair do sistema?",
        icon: "warning",
        buttons: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          
            sessionStorage.clear()
            window.location.href = "../index/";
        } 
      });
}