import InfoPage, { InfoSection } from '../../components/InfoPage/InfoPage.jsx';

export default function Shipping() {
  return (
    <InfoPage
      title="Envíos"
      intro="Preparamos cada pedido con cuidado para que llegue a ti en perfecto estado."
    >
      <InfoSection heading="Cobertura">
        <p>
          Realizamos envíos a toda Colombia a través de transportadoras aliadas.
          También coordinamos entregas internacionales bajo cotización; escríbenos
          por WhatsApp y te ayudamos con gusto.
        </p>
      </InfoSection>
      <InfoSection heading="Tiempos de entrega">
        <ul>
          <li>Ciudades principales: 2 a 4 días hábiles.</li>
          <li>Poblaciones y zonas rurales: 4 a 7 días hábiles.</li>
          <li>Los pedidos se despachan dentro de las 48 horas siguientes a la confirmación del pago.</li>
        </ul>
      </InfoSection>
      <InfoSection heading="Costos de envío">
        <p>
          El valor del envío se calcula según la ciudad de destino y se confirma al
          coordinar tu pedido por WhatsApp. Para compras superiores a $200.000 el
          envío es gratuito dentro de Colombia.
        </p>
      </InfoSection>
      <InfoSection heading="Seguimiento">
        <p>
          Una vez despachado tu pedido te compartiremos el número de guía por
          WhatsApp para que puedas seguir tu paquete en todo momento.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
