import InfoPage, { InfoSection } from '../../components/InfoPage/InfoPage.jsx';

export default function Privacy() {
  return (
    <InfoPage
      title="Política de privacidad"
      intro="Cuidamos tus datos con el mismo cariño con el que hacemos nuestras prendas."
    >
      <InfoSection heading="Datos que recopilamos">
        <p>
          Recopilamos la información que nos compartes al crear tu cuenta o realizar un
          pedido: nombre, correo electrónico y datos de contacto necesarios para
          coordinar tu compra y envío.
        </p>
      </InfoSection>
      <InfoSection heading="Uso de la información">
        <ul>
          <li>Procesar y coordinar tus pedidos.</li>
          <li>Brindarte atención y soporte personalizado.</li>
          <li>Informarte sobre novedades, solo si así lo autorizas.</li>
        </ul>
      </InfoSection>
      <InfoSection heading="Protección de datos">
        <p>
          No vendemos ni compartimos tus datos con terceros con fines comerciales.
          Aplicamos medidas razonables de seguridad para proteger tu información.
        </p>
      </InfoSection>
      <InfoSection heading="Tus derechos">
        <p>
          Puedes solicitar acceder, corregir o eliminar tus datos personales en
          cualquier momento escribiéndonos a través de nuestra página de contacto.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
