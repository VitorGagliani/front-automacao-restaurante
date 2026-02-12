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

