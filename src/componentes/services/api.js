export async function getCategorias() {
  const response = await fetch('http://localhost:8080/categorias/listar')

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias')
  }

  return response.json()
}

export async function getProdutos(categoriaId) {
  const response = await fetch(  `http://localhost:8080/produto/listar/${categoriaId}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos')
  }

  return response.json()
}

export async function getCarrinho(idPedido) {
  const response = await fetch(  `http://localhost:8080/pedido/${idPedido}`);
  if (!response.ok) {
    throw new Error('Erro ao carregar carrinho')
  }
  
   return response.json()
}

export async function getMesas() {
  const response = await fetch( 'http://localhost:8080/mesas/listar');
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos')
  }
  
  return response.json()
}

export async function criarPedido(pedido) {
  const response = await fetch("http://localhost:8080/pedido/novo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pedido)
  })

  if (!response.ok) {
    throw new Error("Erro ao criar pedido")
  }

  return response.json()
}

export async function adicionarAoPedido(idPedido, mesa, idProduto, quantidade, observacao){
  const response = await fetch(`http://localhost:8080/pedido/adicionar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ idPedido, mesa,idProduto, quantidade, observacao })
  })
  if (!response.ok) {
    throw new Error("Erro ao adicionar produto ao pedido")
  }
  return response.json()
}

export async function getPedidoDialog(idPedido) {
  const response = await fetch(`http://localhost:8080/pedido/grid/${idPedido}`)

  if (!response.ok) {
    throw new Error('Erro ao buscar pedido')
  }

  return response.json()
}

export async function getGrid({ status, mesa, inicio, fim } = {}) {
  const params = new URLSearchParams()

  if (status) params.append("status", status)
  if (mesa) params.append("mesa", mesa)
  if (inicio) params.append("inicio", inicio)
  if (fim) params.append("fim", fim)

  const url = `http://localhost:8080/pedido/grid${
    params.toString() ? `?${params.toString()}` : ""
  }`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Erro ao carregar grid")
  }

  return response.json()
}

