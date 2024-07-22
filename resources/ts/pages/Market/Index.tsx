import Layout from "@/layouts/Layout";
import { DefaultButton } from "@/components/DefaultButton";
import { Title } from "@/layouts/Layout/title";
import { Section } from "@/components/Section";

export default () => {
  return (
    <Layout
      header={
        <>
          <Title>Listas de Compra</Title>
          <DefaultButton externalClass="w-auto">
            Adicionar
          </DefaultButton>
        </>
      }
    >
      <Section>
        <div className="relative overflow-x-auto sm:rounded-lg">
          teste
        </div>
      </Section>
    </Layout>
  );
};
