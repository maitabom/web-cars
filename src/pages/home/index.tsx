import Container from "../../components/container";

function Home() {
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input className="w-full border-2 rounded-lg h-9 px-3" type="text" placeholder="Digite o nome do carro..." />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">Buscar</button>
      </section>
      <h1 className="font-bold text-center mt-6 text-3xl mb-4">Carros novos e usados em todo o Brasil</h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg">
          <img className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all" src="https://www.webmotors.com.br/wp-content/uploads/2024/05/23163609/Mercedes-AMG-Pure-Speed-Destaque.webp" alt="Nome do Carro" />
          <p className="font-bold mt-1 mb-2 px-2">BMW 320I</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2024/2024 | 10.000 Km</span>
            <strong className="text-black text-xl">R$ 190.000,00</strong>
          </div>
          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-zinc-700">Pouso Alegre - MG</span>
          </div>
        </section>
      </main>
    </Container>
  );
}

export default Home;
