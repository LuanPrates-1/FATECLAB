/** Marca do FatecLab: um chip de circuito com uma trilha que liga três nós. */
export function MarcaFatecLab({ tamanho = 28 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M8 2h18l4 4v18l-6 6H6l-4-4V8z"
        fill="none"
        stroke="var(--ciano)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M9 22v-6l5-5h9" fill="none" stroke="var(--ciano)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="9" cy="23" r="2.4" fill="var(--ciano)" />
      <circle cx="23.5" cy="11" r="2.4" fill="var(--ciano)" />
      <circle cx="19" cy="21" r="2.4" fill="none" stroke="var(--ciano)" strokeWidth="2" />
    </svg>
  );
}

export function Logo({ tamanho = 28 }: { tamanho?: number }) {
  return (
    <span className="logo">
      <MarcaFatecLab tamanho={tamanho} />
      <span className="logo-nome">FatecLab</span>
    </span>
  );
}
