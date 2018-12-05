var botaoAdicionar = document.querySelector('#adicionar-paciente');

botaoAdicionar.addEventListener('click', function(event){
   event.preventDefault();
   
   var form = document.querySelector('#form-adiciona');
   var paciente = dadosPaciente(form);
   var pacienteTr = criaTr(paciente);

   var erros = validaPaciente(paciente);
   
   if(erros.length > 0){
       exibeMenssagensDeErro(erros);
       return;
   }

   var tabela = document.querySelector('#tabela-pacientes');
   tabela.appendChild(pacienteTr);
   
    form.reset();
    document.querySelector('#mensagens-erro').innerHTML = '';
});

function dadosPaciente(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function criaTr(paciente){
    var pacienteTr = document.createElement('tr');
    pacienteTr.classList.add('paciente');

    pacienteTr.appendChild(criaTd(paciente.nome, 'info-nome'));
    pacienteTr.appendChild(criaTd(paciente.peso, 'info-peso'));
    pacienteTr.appendChild(criaTd(paciente.altura, 'info-altura'));
    pacienteTr.appendChild(criaTd(paciente.gordura, 'info-gordura'));
    pacienteTr.appendChild(criaTd(paciente.imc, 'info-imc'));

    return pacienteTr;
}

function criaTd(dado,classe){
    var td = document.createElement('td');

    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){
    var erros = [];

    if(!validaPeso(paciente.peso)){
        erros.push('Peso é inválido!');
    }

    if(!validaAltura(paciente.altura)){
        erros.push('Altura é inválida!');
    }

    if(paciente.gordura.length == 0 || paciente.peso.length == 0 || paciente.altura.length == 0 || paciente.nome.length == 0){
        erros.push('Campo não pode ser em branco!');
    }

    return erros;
}

function exibeMenssagensDeErro(erros){
    var ul = document.querySelector('#mensagens-erro');
    ul.innerHTML = '';
    
    erros.forEach(function(erro) {
        var li = document.createElement('li');
        li.textContent = erro;
        ul.appendChild(li);
    });
}