const form = document.getElementById("form-tarefas");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");

const campoBusca = document.getElementById("input-busca");//tarefa 4:implementar filtro de tarefa


//EXERCICIO 2: Usar local storage para salvar as tarefas
function salvarTarefas() {
    const tarefas = document.querySelectorAll("#lista-tarefas li");//pega todos os itens da lista
    const tarefasArray = Array.from(tarefas).map((tarefa) =>
        tarefa.querySelector("span").textContent);//pega o texto da tarefa

    localStorage.setItem("tarefas", JSON.stringify(tarefasArray));//salva o array no local storage como string JSON
}

//EXERCICIO 4: Implementar filtro de tarefa
campoBusca.addEventListener("input", () => {
    const termoBusca = campoBusca.value.toLowerCase();//pega o que foi digitado no campo de busca em minusculo
    const tarefas = document.querySelectorAll("#lista-tarefas li");//pega todos os itens da lista

    //usando o forEach
    tarefas.forEach((tarefa) => {
        const texto = tarefa.textContent.toLowerCase();//conteúdo da tarefa
        if (texto.includes(termoBusca)) {
            tarefa.style.display = "list-item"; //mostra se bate com o filtro
        } else {
            tarefa.style.display = "none"; //esconde se não bate com o filtro 
        }
    });
});


//Exercicio 2: Pegando os dados do local storage com Json.parse para renderizar as tarefas 
//novamente na lista ao recarregar a página
function carregarTarefas(){
    const tarefas = localStorage.getItem("tarefas");
    if (tarefas) {
        const tarefasArray = JSON.parse(tarefas);//transforma a string JSON em um array
        tarefasArray.forEach((tarefa) => {
            /*const li = document.createElement("li");
            li.textContent = tarefa;
            lista.appendChild(li);*/
            //Atualização para o EXERCÍCIO 3
            adicionarTarefa(tarefa);
        });
    }
}

//EXERCICIO 3: Função que adiciona uma nova tarefa na tela com botão de excluir
function adicionarTarefa(tarefa) {
    const li = document.createElement("li");

    const span = document.createElement("span"); // cria o span
    span.textContent = tarefa; // adiciona o texto da tarefa
    li.appendChild(span); // adiciona o span ao li

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";

    btnExcluir.addEventListener("click", function () {
        li.remove();
        salvarTarefas(); // salva novamente após excluir
    });

    li.appendChild(btnExcluir); // adiciona o botão ao li
    document.getElementById("lista-tarefas").appendChild(li);
}

//EXERCICIO 3: Função que remove uma tarefa da lista e do local storage
function removerTarefa(tarefaRemover) {
    const tarefas = localStorage.getItem("tarefas");
    if (tarefas) {
        const tarefasArray = JSON.parse(tarefas);

        // Filtra o array para remover a tarefa clicada
        const novasTarefas = tarefasArray.filter(t => t !== tarefaRemover);

        //salva o novo array atualizado no local storage
        localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    }
}

//EXERCICIO 1: Usar arrow function para manipular o clique(envio do formulario)
form.addEventListener("submit", (event) => {
     //evitar o comportamento padrão do formulário
    event.preventDefault();                

    //trim para remover os espaços em branco
    const novaTarefa = input.value.trim();
    //verificação para ver se a tarefa não está vazia
    if (novaTarefa !== "") {   
        //adicionar a tarefa na lista         
        adicionarTarefa(novaTarefa);  
        //limpar o campo de entrada  
        input.value = "";               
        
        //Atualizar o localStorage com a nova lista
        const tarefas =  document.querySelectorAll("#lista-tarefas li");

        //criar um array de texto com o conteudo das tarefas, para salvar no local storage
        const tarefasArray = Array.from(tarefas).map((tarefa) => tarefa.textContent);
        localStorage.setItem("tarefas", JSON.stringify(tarefasArray));
        
    }
});

    carregarTarefas();//carregar as tarefas ao recarregar a página