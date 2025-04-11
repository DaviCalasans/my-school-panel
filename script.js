function showInformationOfUsers(){
    const cardUser = document.querySelectorAll('.card-user');
    
    const users = [
        {name: 'Davi', age: 18, gender: 'Masculino'},
        {name: 'Renata', age: 30, gender: 'Feminino'}, 
        {name: 'Anderson', age: 42, gender: 'Masculino'}];
    
            for(i = 0; i <= users.length - 1;i++){
                const {name, age, gender} = users[i];
                cardUser[i].innerHTML = `${name} ${age} ${gender}`;
            
                
            }
};
showInformationOfUsers();


        








