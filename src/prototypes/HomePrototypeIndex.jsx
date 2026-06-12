import PageShell from '../components/PageShell.jsx'
import PrototypeCard from '../components/PrototypeCard.jsx'
import { prototypes } from './index.js'

function HomePrototypeIndex() {
  return (
    <PageShell
      title="POC de Telas - Jogo de Corrida"
      subtitle="Indice de prototipos para testar rapidamente fluxos, layouts e estilos."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prototypes.map((prototype) => (
          <PrototypeCard
            key={prototype.id}
            id={prototype.id}
            title={prototype.title}
            description={prototype.description}
            tags={prototype.tags}
          />
        ))}
      </section>
    </PageShell>
  )
}

export default HomePrototypeIndex
