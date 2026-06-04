import InfoPage, { InfoSection } from '../../components/InfoPage/InfoPage.jsx';

export default function Terms() {
  return (
    <InfoPage
      title="Términos y condiciones"
      intro="Estas condiciones regulan el uso de nuestra tienda y la compra de nuestros productos."
    >
      <InfoSection heading="Generalidades">
        <p>
          Al navegar y realizar pedidos en Alma Liviana aceptas los presentes términos.
          Nos reservamos el derecho de actualizarlos en cualquier momento; la versión
          vigente será siempre la publicada en este sitio.
        </p>
      </InfoSection>
      <InfoSection heading="Productos y precios">
        <ul>
          <li>Las imágenes son ilustrativas; pueden existir variaciones leves de color según tu pantalla.</li>
          <li>Los precios están expresados en pesos argentinos e incluyen los impuestos aplicables.</li>
          <li>La disponibilidad está sujeta a stock y puede cambiar sin previo aviso.</li>
        </ul>
      </InfoSection>
      <InfoSection heading="Pedidos y pagos">
        <p>
          Los pedidos se confirman y coordinan por WhatsApp. El pago se acuerda
          directamente con nuestro equipo a través de los medios habilitados.
        </p>
      </InfoSection>
      <InfoSection heading="Propiedad intelectual">
        <p>
          Todos los contenidos, marcas, fotografías y diseños pertenecen a Alma Liviana
          y no pueden ser reproducidos sin autorización previa.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
