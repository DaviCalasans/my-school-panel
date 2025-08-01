//PEGA OS DADOS E TRANSFORMA A STRING EM ARRAY
export function getUsersFromStorage(){
    const UsersStr = localStorage.getItem('usuarios');
    return UsersStr ? JSON.parse(UsersStr) : []; 
}

function myEscope(){
    let users = getUsersFromStorage();
    const form = document.querySelector('.form')
    const layoutForm = document.querySelector('.layout-form');
    // console.log(users);
    renderUsertoScreen(users);
    let qtdUsers = document.querySelector('#qtd-users');
    qtdUsersTotal(qtdUsers);
    const inputSearch = document.querySelector('#search');

    function getFormValues(event){
        event.preventDefault();
        const nameValue = form.querySelector('#name').value;
        const ageValue = form.querySelector('#age').value;
        const gender = form.querySelector('input[name="gender"]:checked');
        const registration = form.querySelector('#matricula');
        const serieValue = form.querySelector("#series").value;
        
        const genderValue = getIconGender(gender.value);
        const formatAgeValue = formatData(ageValue); 
        const registrationValue = parseInt(registration.value); 

        const newUser = createUser(nameValue,formatAgeValue,genderValue,registrationValue, serieValue);
        addUserAndSave(newUser);
        renderUsertoScreen(users);
        qtdUsersTotal(qtdUsers);
        layoutForm.style.display = 'none';
        form.reset();

    }
    //RECEBE O QUE FOI DIGITADO NO INPUT DE PESQUISA
    inputSearch.addEventListener('input', function(e){
        let nomeDigitado = e.target.value;
        if(nomeDigitado !== ''){
            encontrarNome(nomeDigitado);
        }else{
            renderUsertoScreen(users);
        }
    })

    //BUSCA NO ARRAY users O NOME DIGITADO
    function encontrarNome(nomeDigitado){
        const nomesEncontrados = users.filter(user => 
        user.name.toLowerCase().startsWith(nomeDigitado.toLowerCase())
        );

        if(nomesEncontrados.length < 1){
            console.log("Não foi encontrado nenhum resultado");
            esconderCards();
            return;
        }

        if(nomesEncontrados.length > 0 && nomesEncontrados.length < 2){
            console.log(`Foi encontrado 1 resultado: ${nomesEncontrados}`);
            mostrarCards(nomesEncontrados);
            return;
        }

        if(nomesEncontrados.length > 1){
            console.log(`Foram encontrados ${nomesEncontrados.length} resultados`);
            mostrarCards(nomesEncontrados);
            return;
        }
    }

    function qtdUsersTotal(qtdUsers){
        qtdUsers.innerHTML = `Quantidade de alunos cadastrados: ${users.length}`
    }

    function esconderCards(){
        const containerCard = document.querySelector('.container-card-user');
        containerCard.innerHTML = 'Não foi encontrado nenhum usuário';
    }

    function mostrarCards(nomesEncontrados){
        renderUsertoScreen(nomesEncontrados);
    }

    //ADICIONA O OBJETO newUser AO ARRAY users (Alterei o nome da função para addUserAndSave)
    function addUserAndSave(newUser){
        users.push(newUser);
        toStringfy(users)

    }
    //TRANSFORMA O ARRAY users EM Stringfy
    function toStringfy(users){
        const usersStr = JSON.stringify(users)
        addUserInStorage(usersStr)
    }
    //ADICIONA O ARRAY users AO LOCALSTORAGE
    function addUserInStorage(usersStr){
        localStorage.setItem('usuarios', usersStr);
    }
    

    function getIconGender(genderValue){
        if(genderValue === 'Masculino'){
            return {
                textGender: 'Masculino',
                iconGender: 'imgs/male-icon.png'
            }
        }else{
            return {
                textGender: 'Feminino',
                iconGender: 'imgs/female-icon.png'
            }
        }
    }

    
    function formatData(formatAgeValue) {
      const [ano, mes, dia] = formatAgeValue.split('-'); 
      const nascimento = new Date(ano, mes - 1, dia); // mês começa do 0
      const hoje = new Date();

      // Calcula idade com base no mês e dia
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const diaAtual = hoje.getDate();

      if (
        mesAtual < nascimento.getMonth() ||
        (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())
      ) {
        idade--;
      }

      // Formata para DD/MM/AAAA
      const dataFormatada = nascimento.toLocaleDateString('pt-BR');

      return {
        dataNascimento: dataFormatada,
        idade: idade
      };
    }

    
    
    function createUser(name, ageObj, genderObj, registrationValue, serieValue){
        return{
            name: name,
            dateBorn: ageObj.dataNascimento,
            age: ageObj.idade,
            textGender: genderObj.textGender,
            iconGender: genderObj.iconGender,
            registrationValue: registrationValue,
            serieValue: serieValue
        }
    }
    
    function createCard(){
        const containerCard = document.querySelector('.container-card-user')
        const cardUserlayout = document.createElement('div');
        cardUserlayout.className = 'card-user'
        containerCard.appendChild(cardUserlayout);
    }
    
    function renderUsertoScreen(usuariosSalvos){
        const containerCard = document.querySelector('.container-card-user');
        containerCard.innerHTML = ''; // Limpa os cards antigos

        // Cria um card para cada usuário salvo
        for(let i = 0; i < usuariosSalvos.length; i++){
            createCard();
        }

        const cardUser = document.querySelectorAll('.card-user');
        for(let i = 0; i < usuariosSalvos.length; i++){
            const {name, dateBorn, age, textGender,iconGender, registrationValue, serieValue} = usuariosSalvos[i]; 
            cardUser[i].innerHTML = `
                <p>${name}</p>
                <p>${dateBorn} (${age} anos)</p> 
                <p>Matrícula: 0000${registrationValue}</p> 
                <p>${serieValue}</p> 
                <p>${textGender} <img src="${iconGender}" id="male-icon"></p>
                <button onClick="deleteUser(${i})">Deletar</button>
            `;
        }
    };

    window.showForm = function(){
        const display = window.getComputedStyle(layoutForm).display;
        
        if(display !== 'none'){
            layoutForm.style.display = 'none';
        }else{
            layoutForm.style.display = 'block';
        }
    };

    window.deleteUser = function(index) {
        users.splice(index, 1); 
        toStringfy(users)
        qtdUsersTotal(qtdUsers);
        renderUsertoScreen(users);
    }

    
    form.addEventListener('submit',getFormValues)
    
    
}
myEscope();














