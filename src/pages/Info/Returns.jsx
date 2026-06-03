import InfoPage, { InfoSection } from '../../components/InfoPage/InfoPage.jsx';

export default function Returns() {
  return (
    <InfoPage
      title="Cambios y devoluciones"
      intro="Queremos que ames tu Alma Liviana. Si algo no es lo que esperabas, estamos para ayudarte."
    >
      <InfoSection heading="Cambios">
        <p>
          Tienes hasta 15 días calendario desde la recepción de tu pedido para
          solicitar un cambio de talla o de prenda, siempre que el artículo conserve
          sus etiquetas y no presente signos de uso.
        </p>
      </InfoSection>
      <InfoSection heading="Devoluciones">
        <ul>
          <li>Las devoluciones por garantía no tienen costo para ti.</li>
          <li>Para cambios por talla, el costo del nuevo envío corre por cuenta de la clienta.</li>
          <li>El reembolso se realiza al mismo medio de pago dentro de 5 a 10 días hábiles.</li>
        </ul>
      </InfoSection>
      <InfoSection heading="Cómo solicitarlo">
        <p>
          Escríbenos por WhatsApp con tu número de pedido y una breve descripción del
          motivo. Te guiaremos paso a paso para que el proceso sea simple y rápido.
        </p>
      </InfoSection>
      <InfoSection heading="Prendas no elegibles">
        <p>
          Por higiene, no aceptamos cambios ni devoluciones de prendas usadas, lavadas
          o sin etiquetas originales.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
