const btnCloseSidebar = document.querySelector('#close-sidebar');
const conteinerSidebar = document.querySelector('.container-sidebar');
const txtSidebar = document.querySelectorAll('.txt-sidebar');
const logo = document.querySelector('#logo-text');
const logoOptions = document.querySelector('.logo-options');
const logoCloseSidebar = document.querySelector('.logo-close-sidebar')


btnCloseSidebar.addEventListener('click', (e) => {
    if(!conteinerSidebar.classList.contains('container-sidebar-fechada')){
        conteinerSidebar.classList.add('container-sidebar-fechada');
        btnCloseSidebar.src = './imgs/svg/open-sidebar-icon.svg';
        removeText();
        changeLogo();
    }else{
        conteinerSidebar.classList.remove('container-sidebar-fechada');
        btnCloseSidebar.src = './imgs/svg/close-sidebar-icon.svg';
        restoreText();
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

const changeLogo = () => {
    logoOptions.style.alignItems = 'center';
    logoCloseSidebar.style.alignItems = 'center';
    btnCloseSidebar.style.alignSelf = 'center';
    logo.src = './imgs/svg/logo-icon.svg';
    logo.style.width = '60px';
    logo.style.backgroundColor = 'red';
}

