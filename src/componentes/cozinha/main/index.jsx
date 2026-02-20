export const Cozinha = () => {
  return (
    <div id="filtro" className="">
      <h1 className="text-2xl font-bold text-black mb-6 p-5">
        Acompanhamento de pedidos
      </h1>

      <div className="flex items-center gap-4 p-6">
  <div className="bg-[#f0f7ee] px-6 py-4 rounded-2xl shadow-md flex items-center gap-4">
    
   <div className="flex items-center gap-4">
     <label className="text-[#414141] font-semibold">
      Status: 
    </label>

    <select
      className="
        bg-white 
        text-[#414141] 
        px-4 py-3 
        rounded-xl 
        shadow-sm 
        border border-transparent
        focus:outline-none 
        focus:ring-2 
        focus:ring-green-400
        hover:shadow-md
        transition
        cursor-pointer
      "
    >
      <option value="All">Todos as mesas</option>
      <option value="Aberto">Aberto</option>
      <option value="EmPreparo">Em preparo</option>
      <option value="Finalizado">Finalizado</option>
    </select>

   </div>

    <div className="flex items-center gap-4 bg-[#f0f7ee] px-6 py-4">

  <label className="text-[#414141] font-semibold">
    Período:
  </label>

  <input
    type="date"
    className="
      bg-white
      px-4 py-2
      rounded-xl
      shadow-sm
      border border-transparent
      focus:outline-none
      focus:ring-2
      focus:ring-green-400
      transition
    "
  />

  <span className="text-[#414141] font-medium">
    até
  </span>

  <input
    type="date"
    className="
      bg-white
      px-4 py-2
      rounded-xl
      shadow-sm
      border border-transparent
      focus:outline-none
      focus:ring-2
      focus:ring-green-400
      transition
    "
  />

  <div className="flex items-center gap-4">
     <label className="text-[#414141] font-semibold">
      Mesa: 
    </label>

    <select
      className="
        bg-white 
        text-[#414141] 
        px-4 py-3 
        rounded-xl 
        shadow-sm 
        border border-transparent
        focus:outline-none 
        focus:ring-2 
        focus:ring-green-400
        hover:shadow-md
        transition
        cursor-pointer
      "
    >
      <option value="All">Todos os pedidos</option>
      <option value="Aberto">Aberto</option>
      <option value="EmPreparo">Em preparo</option>
      <option value="Finalizado">Finalizado</option>
    </select>

   </div>

</div>

  </div>
</div>

    </div>
  )
}