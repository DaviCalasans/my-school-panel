const btnCloseSidebar = document.querySelector('#close-sidebar');
const conteinerSidebar = document.querySelector('.container-sidebar');
const txtSidebar = document.querySelectorAll('.txt-sidebar');
const logo = document.querySelector('#logo-text');
const logoOptions = document.querySelector('.logo-options');
const logoCloseSidebar = document.querySelector('.logo-close-sidebar');
const userLog = document.querySelector('.user-log');
const imgInfoUser = document.querySelector('.img-infor-user');
const OptSidebar = document.querySelectorAll('.option-sidebar');


btnCloseSidebar.addEventListener('click', (e) => {
    if(!conteinerSidebar.classList.contains('container-sidebar-fechada')){
        conteinerSidebar.classList.add('container-sidebar-fechada');
        logo.classList.add('logo-fechada');
        logoOptions.classList.add('logo-options-fechada');
        logoCloseSidebar.classList.add('logo-close-sidebar-fechada');
        btnCloseSidebar.classList.add('close-sidebar-fechada');
        userLog.classList.add('user-log-fechada');
        imgInfoUser.classList.add('img-infor-user-fechada');
        addOptionsSidebar();
        removeText();
        changeLogo();
    }else{
        conteinerSidebar.classList.remove('container-sidebar-fechada');
        logo.classList.remove('logo-fechada');
        logoOptions.classList.remove('logo-options-fechada');
        logoCloseSidebar.classList.remove('logo-close-sidebar-fechada');
        btnCloseSidebar.classList.remove('close-sidebar-fechada');
        userLog.classList.remove('user-log-fechada');
        imgInfoUser.classList.remove('img-infor-user-fechada');
        restoreText();
        removeOptionsSidebar();
    }
})

const removeText = () => {
    txtSidebar.forEach(text =>{
        text.classList.add('txt-sidebar-fechado');
    })
}

const restoreText = () => {
    txtSidebar.forEach(text =>{
        text.classList.remove('txt-sidebar-fechado');
    })
}

const addOptionsSidebar = () => {
    OptSidebar.forEach(opt =>{
        opt.classList.add('option-sidebar-fechada');
    })
}
const removeOptionsSidebar = () => {
    OptSidebar.forEach(opt =>{
        opt.classList.remove('option-sidebar-fechada');
    })
}
// const changeLogo = () => {
    //  }
    //     logo.src = './imgs/svg/logo-icon.svg';
    //     logoOptions.style.alignItems = 'center';
    //     logoCloseSidebar.style.alignItems = 'center';
    //     btnCloseSidebar.style.alignSelf = 'center';
    //     logo.style.width = '60px';
    //     logo.style.backgroundColor = 'red';

