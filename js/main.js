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
        let formatAgeValue = age.value; 
        let genderValue = getIconGender(gender.value);
        let ageValue = formatData(formatAgeValue); 
        let registrationValue = parseInt(registration.value); 
        let serieValue = serie.value;

        const newUser = createUser(nameValue,ageValue,genderValue,registrationValue, serieValue);
        renderUsertoScreen(newUser);
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

    
    function formatData(formatAgeValue){
        const [ano, mes, dia] = formatAgeValue.split('-'); 
        const dateBorn = new Date(ano, mes - 1, dia); 
        const somentedate = dateBorn.toLocaleDateString() 
        const currentDate = new Date().toLocaleDateString(); 
        const parts = currentDate.split('/'); 
        const currentYear = parts[2];

        const currentAge = currentYear - ano; 

        return {
            dataNascimento: somentedate,
            idade: currentAge
        }
    };
    
    
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














