import { useState, useEffect } from "react";

import { getGrid, getPedidoDialog } from "../../services/api";

export const Cozinha = () => {
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pedidoDialog, setPedidoDialog] = useState([]);
  const [status, setStatus] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        if (!pedidoSelecionado) return;

        setLoading(true);

        const data = await getPedidoDialog(pedidoSelecionado);
        setPedidoDialog(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, [pedidoSelecionado]);

  const buscarPedidos = async () => {
    try {
      const data = await getGrid({
        status: status === "All" || status === "" ? null : status,
        inicio: inicio || null,
        fim: fim || null,
      });

      setPedidos(data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  useEffect(() => {
    buscarPedidos();
  }, []);

  useEffect(() => {
    buscarPedidos(); // refresh a cada 10 sec

    const interval = setInterval(() => {
      buscarPedidos();
    }, 10000);

    return () => clearInterval(interval);
  }, [status, inicio, fim]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-4xl font-bold text-[#1e293b] tracking-tight">
          Acompanhamento de Pedidos
        </h1>
        <p className="text-gray-500 mt-1">
          Visualize e gerencie os pedidos em tempo real
        </p>
      </div>

      {/* Filtros */}
      <div className="px-8 pb-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap gap-6 items-end border border-gray-100">
          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none transition w-52 cursor-pointer"
            >
              <option value="All">Todos</option>
              <option value="Aberto">Aberto</option>
              <option value="EmPreparo">Em preparo</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          {/* Período */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">
              Período
            </label>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none transition cursor-pointer"
              />
              <span className="text-gray-400">até</span>
              <input
                type="date"
                value={fim}
                onChange={(e) => setFim(e.target.value)}
                className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none transition cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-[#0f172a]">
                    Comanda #{pedido.id}
                  </h2>

                  <span className="text-xs px-3 py-1 rounded-full font-semibold text-gray-700">
                    <select
                      defaultValue={pedido.status}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none transition cursor-pointer"
                    >
                      <option value="Aberto">Aberto</option>
                      <option value="EmPreparo">Em preparo</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </span>
                </div>

                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Produto:</span>{" "}
                  {pedido.Produto}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-semibold">Quantidade:</span>{" "}
                  {pedido.quantidade}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-semibold">Obs:</span>{" "}
                  {pedido.observacao || "—"}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-semibold">Mesa:</span> {pedido.mesa_id}
                </p>
              </div>

              <button
                onClick={() => setPedidoSelecionado(pedido.pedido_id)}
                className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer"
              >
                Ver Pedido
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      {pedidoSelecionado && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setPedidoSelecionado(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-xl max-h-[75vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[#0f172a]">
                  Pedido #{pedidoDialog[0]?.pedido_id}
                </h2>
                <p className="text-sm text-gray-400">
                  Atualize o status do pedido
                </p>
              </div>

              <button
                onClick={() => setPedidoSelecionado(null)}
                className="text-gray-400 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            {/* Status Select */}
            <div className="px-6 pt-4">
              <select
                defaultValue={pedidoDialog[0]?.status}
                className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
              >
                <option value="Aberto">Aberto</option>
                <option value="EmPreparo">Em preparo</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>

            {/* Produtos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loading ? (
                <p className="text-center text-gray-400">Carregando...</p>
              ) : (
                pedidoDialog.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition"
                  >
                    <p className="font-semibold text-[#0f172a]">
                      {item.produto}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      Quantidade:{" "}
                      <span className="font-bold">
                        {item.quantidade_produto}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      Observações:{" "}
                      <span className="font-medium">
                        {item.observacao_produto || "—"}
                      </span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
