import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Printable = React.forwardRef((_, ref) => (
  <div ref={ref} style={{ padding: 20 }}>
    <h1>Meu Relatório</h1>
    <p>Este conteúdo será salvo como PDF.</p>
  </div>
));

export default function Repport() {
  const ref = useRef();
  const salvarPDF = useReactToPrint({
    content: () => ref.current,
    documentTitle: "Meu_Relatorio",
  });

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <button onClick={salvarPDF} style={{ padding: 10, fontSize: 16 }}>
        Salvar como PDF
      </button>
      <Printable ref={ref} />
    </div>
  );
}
