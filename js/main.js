//PEGA OS DADOS E TRANSFORMA A STRING EM ARRAY
export function getUsersFromStorage(){
    const UsersStr = localStorage.getItem('usuarios');
    return UsersStr ? JSON.parse(UsersStr) : []; 
}

function myEscope(){
    let users = getUsersFromStorage();
    const form = document.querySelector('.form')
    const overlayDelete = document.querySelector('#overlay-delete');
    const overlayForm = document.querySelector('#overlay-form');
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
        form.reset();

    }

    //RECEBE O QUE FOI DIGITADO NO INPUT DE PESQUISA
    inputSearch.addEventListener('input', function(e){
        let nomeDigitado = e.target.value;
        if(nomeDigitado !== ''){
            encontrarNome(nomeDigitado);
        }else{
            renderUsertoScreen(users);
            apagarFeedback();
        }
    })

    //BUSCA NO ARRAY users O NOME DIGITADO
    function encontrarNome(nomeDigitado){
        const nomesEncontrados = users.filter(user => 
        user.name.toLowerCase().startsWith(nomeDigitado.toLowerCase())
        );

        if(nomesEncontrados.length < 1){
            esconderCards();
            return;
        }

        if(nomesEncontrados.length > 0 && nomesEncontrados.length < 2){
            mostrarCards(nomesEncontrados);
            return;
        }

        if(nomesEncontrados.length > 1){
            mostrarCards(nomesEncontrados);
            return;
        }
    }

    function qtdUsersTotal(qtdUsers){
        qtdUsers.innerHTML = `Quantidade de alunos cadastrados: ${users.length}`
    }

    function esconderCards(){
        const containerCard = document.querySelector('.container-card-user');
        containerCard.innerHTML = `<div class="nd-encontrado"><p>Não foi encontrado nenhum usuário</p></div>
        <button type="submit" value="Criar aluno" onclick="showForm()" id="btn-criar-aluno">
            <img src="./imgs/svg/add-user-icon.svg" alt="">
        </button>`
    }

    function apagarFeedback(){
        const ndEncontrado = document.querySelector('.nd-encontrado');
        ndEncontrado.remove();
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
                iconGender: 'imgs/svg/male-icon.svg'
            }
        }else{
            return {
                textGender: 'Feminino',
                iconGender: 'imgs/svg/female-icon.svg'
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
        const btnCriar = document.querySelector('#btn-criar-aluno');
        const containerCard = document.querySelector('.container-card-user')
        const cardUserlayout = document.createElement('div');
        cardUserlayout.className = 'card-user'
        containerCard.insertBefore(cardUserlayout, btnCriar);
    }
    
    function renderUsertoScreen(usuariosSalvos){
        const containerCard = document.querySelector('.container-card-user');
        const cards = containerCard.querySelectorAll('.card-user');
        cards.forEach(card => card.remove());
        // containerCard.style.background = 'purple';
        containerCard.style.display = 'flex';
        containerCard.style.flexDirection = 'row';
        containerCard.style.flexWrap = 'wrap';
        containerCard.style.justifyContent = 'flex-start';


        // Cria um card para cada usuário salvo
        for(let i = 0; i < usuariosSalvos.length; i++){
            createCard();
        }

        const cardUser = document.querySelectorAll('.card-user');
        for(let i = 0; i < usuariosSalvos.length; i++){
            const {name, dateBorn, age, textGender,iconGender, registrationValue, serieValue} = usuariosSalvos[i]; 
            cardUser[i].innerHTML = `
                <img src="./imgs/svg/user-card-icon.svg" alt="" id="user-card-img">
                <div class="text-info-user">
                <p>${name}</p>
                <p>${dateBorn} (${age} anos)</p> 
                <p>Matrícula: 0000${registrationValue}</p> 
                <p>${serieValue}</p> 
                <p>${textGender} <img src="${iconGender}" id="male-icon"></p>
                </div>
                <button onclick="showModalDelete(${i}, '${name}')" id="btn-delete-small"><img src="./imgs/svg/btn-delete-small.svg" alt="" ></button>
            `;
        }
    };

    //Cria os toasts de feedback (Uusário criado e deletado)
    function addToast(mensagem, status){
        const containerToast = document.querySelector('.container-toast');
        const toast = document.createElement('div');
        toast.className = `toast ${status}`;

        containerToast.appendChild(toast);
        
        if(status === 'delete'){
            toast.innerHTML = `<img src="./imgs/svg/delete-icon.svg" alt=""> ${mensagem}`;
            let progress = document.createElement("div");
            progress.className = "progress";
            progress.style.background = "var(--color-red)";
            toast.appendChild(progress);
        }
        
        if(status === 'create'){
            toast.innerHTML = `<img src="./imgs/svg/check-icon.svg" alt=""> ${mensagem}`;
            let progress = document.createElement("div");
            progress.className = "progress";
            toast.appendChild(progress);
        }

        // Animação de entrada do toast
        setTimeout(() => {
          toast.classList.add("show");
        }, 100);
    
        // Remoção do toast após 3 segundos
        setTimeout(() => {
          toast.classList.remove("show");
          setTimeout(() => toast.remove(), 300); // Esperar animação sair
        }, 5000);
    }

    window.showForm = function(){
        const btnCancelarCadastro = document.querySelector('#btn-cancelar-cadastro');
        const btnFazerCadastro = document.querySelector('#btn-enviar');
        
        
        btnCancelarCadastro.onclick = (function(e){
            overlayForm.classList.remove('show')
        })

        btnFazerCadastro.onclick = (function(e){
            overlayForm.classList.remove('show')
            let statusDelete = 'create'
            addToast('Usuário criado com sucesso!', statusDelete);
        })

        
        overlayForm.classList.add('show')
    };
    
    const btnEnviarForm = document.querySelector('#btn-enviar');

    btnEnviarForm.onclick = (function(e){
        let statusDelete = 'create'
        addToast('Usuário criado com sucesso!', statusDelete)
    });

    window.showModalDelete = function(index, nomeAluno){
        const btnDelete = document.querySelector('#btn-long-delete');
        const btnCancelar = document.querySelector('#btn-cancelar');
        const txtNomeAluno = document.querySelector('#nome-aluno');

        btnCancelar.onclick = (function(e){
            overlayDelete.classList.remove('show');
        })

        btnDelete.onclick = (function(e){
            deleteUser(index);
            overlayDelete.classList.remove('show');
            let statusDelete = 'delete'
            addToast('Usuário deletado com sucesso!', statusDelete);
        })

        overlayDelete.classList.add('show');
        txtNomeAluno.textContent = nomeAluno;
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














