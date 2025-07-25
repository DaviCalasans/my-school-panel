//BLOQUEAR ENVIO DO FORMULÁRIO
const btnEnviar = document.querySelector('#btn-enviar');
const feedbacks = document.querySelectorAll('.feedback');

function verificaFeedback() {
    let hasError = false;
    for (const feedback of feedbacks) {
        if (feedback.textContent !== '') {
            hasError = true;
            break;
        }
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    const nome = document.querySelector('#name').value.trim();
    const matricula = document.querySelector('#matricula').value.trim();
    const idade = document.querySelector('#age').value.trim();
    const serie = document.querySelector('#series').value;
    const genero = document.querySelector('input[name="gender"]:checked');

    const camposPreenchidos = nome && matricula && idade && serie && genero;

    btnEnviar.disabled = hasError || !camposPreenchidos;
}

//VALIDAÇÃO "NOME COMPLETO"

document.querySelector('#name').addEventListener('input', function(e){
    e.target.value = e.target.value.toUpperCase();

    e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); //Remove qualquer caractere que não for string

})

document.querySelector('#name').addEventListener('blur', function(e){
    const feedback = document.querySelector('#name-feedback');
    const input = e.target;

    e.target.value = e.target.value.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');

    let valorInputNameCorrigido = e.target.value.replace(/(.)\1{2,}/g, '$1');

    if(valorInputNameCorrigido !== e.target.value) {
        e.target.value = valorInputNameCorrigido;
        feedback.textContent = 'O nome não pode conter mais de duas letras iguais consecutivas.';
        feedback.style.color = 'blue';
        input.style.border = '2px solid blue';
        verificaFeedback();
        return;
    }

    let splitName = e.target.value.split(' ');

    if(e.target.value.length < 3){
        feedback.style.color = 'blue';
        input.style.border = '2px solid blue';
        feedback.textContent = 'O nome deve conter pelo menos 3 caracteres.';
        verificaFeedback();
        return;
    }

    if(e.target.value.length > 60 ){
        feedback.style.color = 'red';
        input.style.border = '2px solid red';
        feedback.textContent = 'O nome deve conter no máximo 60 caracteres.';
        verificaFeedback();
        return;
    }

    if(splitName.length < 2){
        feedback.style.color = 'red';
        input.style.border = '2px solid red';
        feedback.textContent = "Por favor, informe o nome completo.";
        verificaFeedback();
        return;
    }

    for(let i = 0; i < splitName.length; i++) {
        if(splitName[i] != 'E' && splitName[i].length < 2) {
            feedback.style.color = 'red';
            input.style.border = '2px solid red';
            feedback.textContent = `O nome "${splitName[i]}" está muito curto.`;
            verificaFeedback();
            return;
        }
    }

    feedback.textContent = '';
    feedback.style.color = '';
    input.style.border = ''; // Limpa borda se estiver tudo certo
    verificaFeedback();
})

document.querySelector('#name').addEventListener('paste', function(e){
    e.preventDefault();

    const feedback = document.querySelector('#name-feedback');

    let textoColado = e.clipboardData.getData('text');

    if (textoColado.length > 60) {
        textoColado = textoColado.substring(0, 60);
        feedback.style.color = 'blue'; // Linha 51: azul
        return feedback.textContent = 'O texto colado foi reduzido para 60 caracteres.';
    }
    e.target.value = textoColado;

    e.target.dispatchEvent(new Event('input'));
    e.target.dispatchEvent(new Event('blur'));

})

//VALIDAÇÃO "MATRÍCULA"

//Remove qualquer caractere diferente de número
document.querySelector('#matricula').addEventListener('input', function(e){
    e.target.value = e.target.value.replace(/\D/g, '');
    
})

document.querySelector('#matricula').addEventListener('blur', function(e){
    const feedback = document.querySelector('#matricula-feedback');
    const input = e.target

    if(e.target.value.length < 6){
        input.style.border = "2px solid red";
        feedback.textContent = 'O matrícula deve possuir 6 números';
        verificaFeedback();
        return;
    }else{
        input.style.border = '';
        feedback.textContent = '';
        verificaFeedback();
    }
})


//VALIDAÇÃO "IDADE"

document.querySelector('#age').addEventListener('blur', function(e){
    const input = e.target;
    const valor = input.value;
    const min = input.min;
    const max = input.max;

    // Se não houver valor ou estiver fora do intervalo permitido
    if (!valor || valor < min || valor > max) {
        input.style.border = '2px solid red';
        return;
    }

    // Limpa borda se estiver tudo certo
    input.style.border = '';
});

//VALIDAÇÃO SELECT

document.querySelector('#series').addEventListener('blur', function(e){
    const optionsSelect = ['1º Série EM', '2º Série EM', '3º Série EM']
    const feedback = document.querySelector('#select-feedback');
    const input = e.target;

    //Se o valor estiver vazio ou diferente de uma das opções mostra um erro
    if(!optionsSelect.includes(e.target.value)){
        input.style.border = '2px solid red';
        feedback.textContent = 'Selecione uma das opções do campo';
        verificaFeedback();
        return;
    }

    //Limpa as bordas se estiver tudo certo
    input.style.border = '';
    feedback.textContent = '';
    verificaFeedback();

})

//VALIDAÇÃO DE RADIO
document.querySelectorAll('input[name="gender"]').forEach(function(radio) {
    radio.addEventListener('change', function(e) {
        verificaFeedback();
    });
});
