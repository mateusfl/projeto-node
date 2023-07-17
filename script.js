document.getElementById("form").addEventListener("submit", async (event) => {
  event.preventDefault()

  const inputItem = document.getElementById("inputItem").value

  if (!inputItem) {
    alert("Por favor, digite o nome do item.")
    return
  }

  const response = await fetch("http://localhost:8080/adicionarItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item: inputItem }),
  })

  if (response.ok) {
    const data = await response.json()
    updateItemList(data.items)
  } else {
    alert("Erro ao adicionar o item.")
  }
})

function updateItemList(items) {
  const itemList = document.getElementById("listaItems")
  itemList.innerHTML = ""
  
  if (items.length) {
      itemList.innerHTML = ""
      items.forEach((item) => {
      const li = document.createElement("li")
      li.textContent = item
      itemList.appendChild(li).classList.add(...['bg-slate-100', 'p-1', 'rounded-md', 'my-1'])
    })
  } else {
    const li = document.createElement("li")
    li.textContent = "A lista está vazia"
    itemList.appendChild(li)
  }
}

async function fetchItems() {
  const response = await fetch("http://localhost:8080/listaItens")
  if (response.ok) {
    const data = await response.json()
    updateItemList(data.items)
  } else {
    alert("Erro ao obter a lista de itens do servidor.")
  }
}

async function clearItems() {
  const response = await fetch("http://localhost:8080/limpar", {
    method: "DELETE",
  })
  if (response.ok) {
    fetchItems()
  }
}

window.addEventListener("load", fetchItems)
