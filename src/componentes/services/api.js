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
  const response = await fetch(  `http://localhost:8080/mesa/listar`);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos')
  }
  
  return response.json()
}
