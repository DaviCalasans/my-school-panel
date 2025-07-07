function myEscope(){
    const users = [];
    const form = document.querySelector('.form')
    const layoutForm = document.querySelector('.layout-form');
    

    function getFormValues(event){
        event.preventDefault();
        const name = form.querySelector('#name');
        const age = form.querySelector('#age');
        const gender = form.querySelector('input[name="gender"]:checked');
        const registration = form.querySelector('#matricula');
        const serie = form.querySelector("#series");
        
        let nameValue = name.value;
        let formatAgeValue = age.value; //Pega o valor da idade passado no input
        let genderValue = getIconGender(gender.value);
        console.log(genderValue)
        let ageValue = formatData(formatAgeValue); //Formata a data para o dd//mm/aaaa
        let registrationValue = parseInt(registration.value); //Pega o valor da matrícula e transforma em tipo number
        let serieValue = serie.value;
        console.log(ageValue, serieValue);

        const newUser = createUser(nameValue,ageValue,genderValue,registrationValue, serieValue);
        createCard();
        renderUsertoScreen(newUser);
        console.log(typeof ageValue, ageValue);
        layoutForm.style.display = 'none';

        form.reset();

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

    //Função para formatar data e calcular a idade do usuário
    function formatData(formatAgeValue){
        const [ano, mes, dia] = formatAgeValue.split('-'); //Desestruturção da string data
        const dateBorn = new Date(ano, mes - 1, dia); //Criação de data com os valores desestruturados
        const somentedate = dateBorn.toLocaleDateString() //Formata a data de nascimento para mostrar somente a data no formato dd/mm/aaaa
        const currentDate = new Date().toLocaleDateString(); //Pega a data atual em formato de dd/mm/aaaa
        const parts = currentDate.split('/'); 
        const currentYear = parts[2];//Pega a última parte (ano) da string data

        const currentAge = currentYear - ano; //Faz o cálculo para encontrar a idade do usuário

        //Retorna um objeto com data de nascimento e idade do usuário
        return {
            dataNascimento: somentedate,
            idade: currentAge
        }
    };
    
    //Agora a factory recebe um objeto na idade (data de nascimento e idade)
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
    
    function renderUsertoScreen(newUser){
        const cardUser = document.querySelectorAll('.card-user');
        console.log(users)
        users.push(newUser);
        
                for(let i = 0; i <= users.length - 1;i++){
                    const {name, dateBorn, age, textGender,iconGender, registrationValue, serieValue} = users[i]; // Desestrutura com a data de nascimento
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
        users.splice(index, 1); // Remove user from array

        // Clear all cards
        const containerCard = document.querySelector('.container-card-user');
        containerCard.innerHTML = '';

        // Re-create cards for remaining users
        for (let i = 0; i < users.length; i++) {
            createCard();
        }

        // Re-render user info in each card
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














