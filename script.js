function myEscope(){
    const users = [];
    const form = document.querySelector('.form')
    const layoutForm = document.querySelector('.layout-form');
    

    function getFormValues(event){
        event.preventDefault();
        const name = form.querySelector('#name')
        const age = form.querySelector('#age')
        const gender = form.querySelector('input[name="gender"]:checked')
        
        let nameValue = name.value;
        let ageValue = age.value;
        let genderValue = gender.value;
        
        const newUser = createUser(nameValue,ageValue,genderValue);
        createCard();
        renderUsertoScreen(newUser);
        layoutForm.style.display = 'none';

        form.reset();

    }
    
    function createUser(name, age, gender){
        return{
            name: name,
            age: age,
            gender: gender
            
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
        console.log(cardUser);
        console.log(users);
    
        users.push(newUser);
        
                for(let i = 0; i <= users.length - 1;i++){
                    const {name, age, gender} = users[i];
                    cardUser[i].innerHTML = `
                    <p>${name}</p>
                    <p>${age}</p> 
                    <p>${gender}</p>
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














