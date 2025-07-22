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
            const li = document.createElement("li");
            li.textContent = tarefa;
            lista.appendChild(li);
        });
    }
}
//EXERCICIO 1: Usar arrow function para manipular o clique(envio do formulario)
form.addEventListener("submit", (event) => {
    event.preventDefault();//evitar o comportamento padrão do formulário
    const novaTarefa = input.value.trim();//trim para remover os espaços em branco

    if (novaTarefa !== "") {//verificar se a tarefa não está vazia
        const li = document.createElement("li");//criar um item da lista
        li.textContent = novaTarefa;//adicionar o conteúdo do campo de digitação
        lista.appendChild(li);//adicionar a tarefa na lista
        input.value = "";//limpar o campo de digitação
        salvarTarefas();//salvar as tarefas no local storage
    }
});

    carregarTarefas();//carregar as tarefas ao recarregar a página