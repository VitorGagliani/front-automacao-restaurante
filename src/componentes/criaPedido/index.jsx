import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { criarPedido } from "../services/api";

export const CriaPedido = () => {
  const navigate = useNavigate();
  const { mesaId } = useParams();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  async function handleCriarPedido() {
    try {
      const pedido = {
        telefone: telefone,
        clienteNome: nome,
        idMesa: Number(mesaId),
      };

      const response = await criarPedido(pedido);

      const pedidoId = response.id;
      navigate(`/cardapio/${pedidoId}/1`, {
        state: { mesa: Number(mesaId) },
      });

      console.log("Pedido criado:", response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 flex justify-center items-center">
      <div>
        <img
          src="/public/Zesty-Logo-Preto.svg"
          className="w-[250px] mb-6"
          alt=""
        />
        <h1 className=" text-2xl mb-6 font-medium text-center text-[#414141]">
          Mesa {mesaId}
        </h1>
        <div className="form text-white grid gap-6 mb-7 placeholder:text-gray-600">
          <input
            type="text"
            name="nomeCliente"
            id="nomeCliente"
            placeholder="Insira seu nome"
            className="bg-blue-50 px-2 py-2 rounded-xl text-gray-700 placeholder:text-gray-600"
            required
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="tel"
            name="telefoneCliente"
            id="telefoneCliente"
            placeholder="Insira seu telefone"
            className="bg-blue-50 px-2 py-2 rounded-xl text-gray-700 placeholder:text-gray-600"
            required={true}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <button
          onClick={handleCriarPedido}
          className="w-full px-5 text-xl py-3 rounded text-[#414141] bg-[#E1FED1] hover:bg-[#afde9c] transition"
        >
          Iniciar Pedido
        </button>
      </div>
    </div>
  );
};
