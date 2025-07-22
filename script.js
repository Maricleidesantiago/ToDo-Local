const form = document.getElementById("form-tarefas");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");

//EXERCICIO 2: Usar local storage para salvar as tarefas
function salvarTarefas() {
    const tarefas = document.querySelectorAll("#lista-tarefas li");//pega todos os itens da lista
    const tarefasArray = Array.from(tarefas).map((tarefa) => tarefa.textContent);//transforma os itens em um array
    localStorage.setItem("tarefas", JSON.stringify(tarefasArray));//salva o array no local storage como string JSON
}

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
    li.textContent = tarefa;

    const btnExcluir = document.createElement("button");//criar um botão
    btnExcluir.textContent = "Excluir";     //adicionar o texto ao botão

    //Ao clicar no botão de excluir, ele remove a tarefa da lista e do local storage
    btnExcluir.addEventListener("click", () => {
        removerTarefa(tarefa);          //remove a tarefa do local storage
        li.remove();                    //remove o item da lista
    });


    li.appendChild(btnExcluir);         //adiciona o botão ao item da lista
    lista.appendChild(li);              //adiciona o item completo na lista
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
        
        //Atualiza o localStorage com a nova lista
        const tarefas =  document.querySelectorAll("#lista-tarefas li");

        //cria um array de texto com o conteudo das tarefas, para salvar no local storage
        const tarefasArray = Array.from(tarefas).map((tarefa) => tarefa.textContent);
        localStorage.setItem("tarefas", JSON.stringify(tarefasArray));
        
    }
});

    carregarTarefas();//carregar as tarefas ao recarregar a página