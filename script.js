function myEscope(){
    const users = [];
    const form = document.querySelector('.form')
    const name = form.querySelector('#name')
    const age = form.querySelector('#age')
    const gender = form.querySelector('#gender')
    
    function getInfoUsers(event){
        event.preventDefault();
        let nameValue = name.value;
        let ageValue = age.value;
        let genderValue = gender.value;
        
        const newUser = createUser(nameValue,ageValue,genderValue);
        renderUsertoScreen(newUser)

        form.reset();

    }

    function renderUsertoScreen(newUser){
        const cardUser = document.querySelectorAll('.card-user');
    
        users.push(newUser);
        
                for(let i = 0; i <= users.length - 1;i++){
                    const {name, age, gender} = users[i];
                    cardUser[i].innerHTML = `${name} ${age} ${gender}`;
                }
    };
    
    function createUser(name, age, gender){
        return{
            name: name,
            age: age,
            gender: gender
    
        }
    }
    form.addEventListener('submit',getInfoUsers)
    console.log(users)
    
    
}

myEscope();





        








