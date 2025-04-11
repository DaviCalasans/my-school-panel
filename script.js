const users = [];

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

renderUsertoScreen(createUser('Davi', 18, 'Masculino'));
renderUsertoScreen(createUser('Renata', 30, 'Feminino'));
renderUsertoScreen(createUser('Anderson', 42, 'Masculino'));



        








