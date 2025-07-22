//VALIDAÇÃO "NOME COMPLETO"

document.querySelector('#name').addEventListener('input', function(e){
    e.target.value = e.target.value.toUpperCase();

    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, ' '); //Remove qualquer caractere que não for string

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
        return;
    }

    let splitName = e.target.value.split(' ');
    console.log(splitName);

    if(e.target.value.length < 3){
        feedback.style.color = 'blue';
        input.style.border = '2px solid blue';
        return feedback.textContent = 'O nome deve conter pelo menos 3 caracteres.';
    }

    if(e.target.value.length > 60 ){
        feedback.style.color = 'red';
        input.style.border = '2px solid red';
        return feedback.textContent = 'O nome deve conter no máximo 60 caracteres.';
    }

    if(splitName.length < 2){
        feedback.style.color = 'red';
        input.style.border = '2px solid red';
        return feedback.textContent = "Por favor, informe o nome completo.";
    }

    for(let i = 0; i < splitName.length; i++) {
        if(splitName[i] != 'E' && splitName[i].length < 2) {
            feedback.style.color = 'red';
            input.style.border = '2px solid red';
            return feedback.textContent = `O nome "${splitName[i]}" está muito curto.`;
        }
    }

    feedback.textContent = '';
    feedback.style.color = '';
    input.style.border = ''; // Limpa borda se estiver tudo certo
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
    }else{
        input.style.border = '';
        feedback.textContent = '';
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
    const input = e.target;

    //Se o valor estiver vazio ou diferente de uma das opções mostra um erro
    if(!optionsSelect.includes(e.target.value)){
        input.style.border = '2px solid red'
        return
    }

    //Limpa as bordas se estiver tudo certo
    input.style.border = '';

})
