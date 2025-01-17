import React, { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'
import './repport.css'
const Repport = () => {
  const printRef = useRef(null)


  const handleDownload= async()=>{
    if(!printRef)return;

    const canvas = await html2canvas(printRef.current)
    const data = canvas.toDataURL();
    const doc = new jsPdf({
        orientation: 'portrait',
        unit: 'px',
        format: "A4",
        
    })

    doc.addImage(data, "PNG", 0,0,703/2, 1144/2)
    doc.save(`relatorio-kimilamicrocredito-${new Date().getTime()}.pdf`)
  }

  return (
    <>
    <button onClick={handleDownload}>baixar relatorio</button>
    <div className='repport' ref={printRef}>
      

      <header>
        <h1>Banco de Moçambique</h1>
        <h2>Departamento de Supervisão Prudencial</h2>
        <p>Reporte Periódico de Informação de Micro Finanças</p>
        <p>Instituições Sujeitas à Monitorização (Operadores de Microcrédito)</p>
        <p><strong>Período de Reporte:</strong> 01/02/{new Date().getFullYear()} a 30/06/{new Date().getFullYear()}</p>
    </header>

    <section id="identificacao">
        <h3>Identificação da Instituição</h3>
        <ul>
            <li><strong>Nome ou Designação:</strong> KIMILAMICROCREDITO, E.I</li>
            <li><strong>Endereço ou Localização:</strong> Cidade Da Matola, Bairro Nkobe, Q.13 N242/1</li>
            <li><strong>Telefone:</strong> +258 84 04 85 105 / +258 87 04 85 105</li>
            <li><strong>E-mail:</strong> kimilamicrocredito@gmail.com</li>
            <li><strong>Ano de início de atividades:</strong> 2024</li>
        </ul>
    </section>

    <section id="gestao">
        <h3>Responsável pela Gestão da Instituição</h3>
        <ul>
            <li><strong>Nome:</strong> Jamila Da Conceição Mandlate</li>
            <li><strong>Posição:</strong> Sócia única (Gestora Geral)</li>
        </ul>
    </section>

    <section id="atividade">
        <h3>Informações sobre a Atividade (Saldos)</h3>
        <table>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>I Semestre {new Date().getFullYear()}</th>
                    <th>II Semestre {new Date().getFullYear()}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Crédito concedido</td>
                    <td>111,000.00</td>
                    <td>111,000.00</td>
                </tr>
                <tr>
                    <td>Crédito reembolsado</td>
                    <td>89,355.00</td>
                    <td>21,090.00</td>
                </tr>
                <tr>
                    <td>Crédito vencido</td>
                    <td>10,545.00</td>
                    <td>0.00</td>
                </tr>
            </tbody>
        </table>
    </section>

    <section id="taxas">
        <h3>Taxas de Juro e Prazos de Vencimentos</h3>
        <table>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Máximo</th>
                    <th>Mínimo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Taxa de Juro</td>
                    <td>25%</td>
                    <td>20%</td>
                </tr>
                <tr>
                    <td>Prazos</td>
                    <td>90 dias</td>
                    <td>30 dias</td>
                </tr>
            </tbody>
        </table>
    </section>

    <footer>
        <p>{`Maputo, aos ${new Date().getDate()} de ${new Date().getUTCMonth()} de ${new Date().getFullYear()}`}</p>
        <p>_________________________________________</p>
        <p>Jamila Da Conceição Mandlate</p>
    </footer>
    </div>
    </>
  )
}

export default Repport
