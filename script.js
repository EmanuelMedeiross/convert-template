//!Cotação de moedas do dia!
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

//Acessando/selecionando o input
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

//Capturando o input conforme inserção de dados, para executar alguma função. O input amount receberá apenas números.
amount.addEventListener("input", () => {
    //Procurando textos: Expressão Regular
    const hasCharacterRegex = /\D+/g
    //Aplicando um novo valor a "const amount"
    amount.value = amount.value.replace(hasCharacterRegex, "")//Replace encontra o padrão do Regex e substitui por alguma coisa. No caso substituiu por nenhum valor, por nada.
})

//capturando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
    event.preventDefault()
    
    switch (currency.value){
        case "USD":
            converteCurrency(amount.value, "US$", USD)
            break
        case "EUR":
            converteCurrency(amount.value, "€", EUR)
            break
        case "GBP":
            converteCurrency(amount.value, "£", GBP)
            break
    }
}

//Função para converter a moeda
function converteCurrency(amount, symbol, price){
    try {
        // textContent manipula o conteúdo que está dentro da tag.
        description.textContent = `${symbol} 1 = ${formatCuurencyBRL(price)}`

        //Calcula o total.
        let total = amount * price

        // Verifica se o resultado é um número
        if (isNaN(total)) {
            return alert ("Por favor, digite o valor corretamente para converter.")
        }
        total = formatCuurencyBRL(total).replace("R$","")

        //Exibe o resultado total.
        result.textContent = `${total} Reais`
        //Aplica a classe-HTML que exibe o footer na tela, com o resultado da operação.
        footer.classList.add("show-result")
    } catch (error) {
        //remove a classe do footer, removendo ele da tela.
        footer.classList.remove("show-result")
        
        console.log(error)
        alert("Não foi possível converter. Tente novamente mais tarde.")

        
    }
}

//Formata a moeda em Real brasileiro.
function formatCuurencyBRL(value){
    //converte para número para utilizar o toLocalString para formatar no padrão BRL(R$).
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}
