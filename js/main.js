function myEscope(){
    let users = getUsersFromStorage();
    const form = document.querySelector('.form')
    const layoutForm = document.querySelector('.layout-form');

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
        addUserInArray(newUser);
        layoutForm.style.display = 'none';

        const usuariosSalvos = getUsersFromStorage();
        console.log(usuariosSalvos);

        form.reset();

    }
    //ADICIONA O OBJETO newUser AO ARRAY users (Alterei o nome da função para addUserInArray)
    function addUserInArray(newUser){
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

    function getUsersFromStorage(){
        const UsersStr = localStorage.getItem('usuarios');
        return UsersStr ? JSON.parse(UsersStr) : []; 
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
        createCard();
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
    
    function renderUsertoScreen(newUser){
        const cardUser = document.querySelectorAll('.card-user');
        console.log(users)
        users.push(newUser);
        
                for(let i = 0; i <= users.length - 1;i++){
                    const {name, dateBorn, age, textGender,iconGender, registrationValue, serieValue} = users[i]; 
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

        const containerCard = document.querySelector('.container-card-user');
        containerCard.innerHTML = '';

        for (let i = 0; i < users.length; i++) {
            createCard();
        }

        const cardUser = document.querySelectorAll('.card-user');
        for (let i = 0; i < users.length; i++) {
            const { name, age, gender } = users[i];
            cardUser[i].innerHTML = `
                <p>${name}</p>
                <p>${age}</p>
                <p>${gender}</p>
                <button onClick="deleteUser(${i})">Deletar</button>
            `;
        }
    }

    
    form.addEventListener('submit',getFormValues)
    
    
}
myEscope();














