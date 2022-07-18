import Head from "next/head";
import Header from "../components/header";
import Hero from "../components/hero";
import { sanityClient} from "../sanity";
import { Post } from "../typings";
import Posts from "../components/posts";


export interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  return (
    <div className="container  mx-auto">
      <Head>
        <title>|Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <Posts posts={posts}/>
    </div>
  );
};

export default Home;

// SSR
// The home page will be Server Side Rendered /generated and prerendered per request
export const getServerSideProps = async () => {
  // fetching data from the sanity CMS using GROQ as the query language
  const query = `
  *[_type =="post"]{
    _id,
    author ->{
    image,
    name,
  },
  description,
  mainImage,
  slug,
  title
  }`;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
