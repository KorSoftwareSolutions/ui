import Head from "expo-router/head";

interface Props {
  title: string;
  description?: string;
}

export function SeoHead({ title, description }: Props) {
  return (
    <Head>
      <title>{`${title} - KorUI`}</title>
      <meta name="description" content={description} />
    </Head>
  );
}
