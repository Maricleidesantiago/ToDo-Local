const form = document.getElementById("form-tarefas");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");


/*Evento do formulario. Impedir o comportamento padrão do formulario que é recarregar a pagina
Pegar o texto digitado no imput( ou seja , a nova tarefa)
Adicionar essa nova tarefa na lista(ul id="lista-tarefas")
Limpar o campo imput, para que o usuario possa digitar outra tarefa*/
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const novaTarefa = input.value;
    if (novaTarefa) {
        const li = document.createElement("li");
        li.textContent = novaTarefa;
        lista.appendChild(li);
        input.value = "";
    }
});

