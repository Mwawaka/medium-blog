import { GetStaticProps } from "next";
import Header from "../../components/header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
interface Props{
    postData:Post
}
const PostData = ({ postData }: Props) => {
    return (
        <main className=""> 
            <Header />
            <img src={urlFor(postData.mainImage).url()} className="w-full h-40 object-cover" />
            <article className="max-w-3xl mx-auto flex flex-col space-y-1 ">
                <h1 className="text-3xl mt-10 mb-4 ">{postData.title}</h1>
                <h2 className="text-gray-500 text-xl">{postData.description}</h2>
                <div className="flex items-center  space-x-4" >
                    <img src={urlFor(postData.author.image).url()} className="h-12 w-12 rounded-full mt-2" />
                    <p className="text-xs font-extralight">Blog post by <span className="text-green-600">{postData.author.name} </span> - Published at {new Date(postData._createdAt).toLocaleString() }</p>
                </div>
            </article>
        </main>
    )
    
};
export default PostData;

// Static Site Generation with Incremental Static Regeneration
// page will be generated at build time and then revalidated after some time to ensure that it doesn't contain stale data.
// getStaticPaths is used since we have dynamic pages
export const getStaticPaths = async () => {
  const query = `
    *[_type=='post']{
        _id,
        slug{
        current
      },
    }
    `;
  const postData = await sanityClient.fetch(query);

  // configuring the dynamic paths and finding the pages that exist 
  const paths = postData.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type=='post' && slug.current==$slug][0]{
        _id,
        _createdAt,
        author->{
        name,
        image
      },
      description,
      mainImage,
      title,
      slug,
      body,
      }
    `;
    const postData = await sanityClient.fetch(query, {
      slug:params?.slug
    });
    if (!postData) {
        return {
            notFound: true,
        }
    }
  return {
    props: {
      postData,
      },
    revalidate:60, //revalidate the cached 
  };
};

// similar to
/*
return {
    paths:[
    {
        params:{
        slug:post.slug.current
        }
    },
    ],
    fallback: "blocking",
}
*/
