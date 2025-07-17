document.querySelector('#name').addEventListener('input', function(e){
    e.target.value = e.target.value.toUpperCase();
})

document.querySelector('#name').addEventListener('blur', function(e){
    const feedback = document.querySelector('#name-feedback');

    e.target.value = e.target.value.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');

    let valorInputNameCorrigido = e.target.value.replace(/(.)\1{2,}/g, '$1');

    if(valorInputNameCorrigido !== e.target.value) {
        e.target.value = valorInputNameCorrigido;
        feedback.textContent = 'O nome não pode conter mais de duas letras iguais consecutivas.';
        feedback.style.color = 'blue';
        return;
    }

    let splitName = e.target.value.split(' ');
    console.log(splitName);

    if(e.target.value.length < 3){
        feedback.style.color = 'red';
        return feedback.textContent = 'O nome deve conter pelo menos 3 caracteres.';
    }

    if(e.target.value.length > 60 ){
        feedback.style.color = 'red';
        return feedback.textContent = 'O nome deve conter no máximo 60 caracteres.';
    }

    if(splitName.length < 2){
        feedback.style.color = 'red';
        return feedback.textContent = "Por favor, informe o nome completo.";
    }

    for(let i = 0; i < splitName.length; i++) {
        if(splitName[i] != 'E' && splitName[i].length < 2) {
            feedback.style.color = 'red';
            return feedback.textContent = `O nome "${splitName[i]}" está muito curto.`;
        }
    }

    feedback.textContent = '';
    feedback.style.color = ''; // Limpa cor se estiver tudo certo
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

