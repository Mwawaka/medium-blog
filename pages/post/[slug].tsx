import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import Header from "../../components/header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

// typescript interface
interface Props {
  postData: Post;
}
interface IFormInput {
  _id: string; //? optional _id?:string
  name: string;
  email: string;
  comment: string;
}
const PostData = ({ postData }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/create-comment", {
      method: "POST",
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };
  return (
    <main className="">
      <Header />
      <img
        src={urlFor(postData.mainImage).url()}
        className="w-full h-24 object-cover md:h-40"
      />
      <article className="max-w-3xl mx-auto flex flex-col space-y-1 px-5">
        <h1 className="text-3xl mt-10 mb-2 ">{postData.title}</h1>
        <h2 className="text-gray-500 text-md ">{postData.description}</h2>
        <div className="flex items-center  space-x-4">
          <img
            src={urlFor(postData.author.image).url()}
            className="h-12 w-12 rounded-full mt-2"
          />
          <p className="text-xs font-extralight">
            Blog post by{" "}
            <span className="text-green-600">{postData.author.name} </span> -
            Published at {new Date(postData._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="leading-8 mb-3">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={postData.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-3xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc"> {children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="border-yellow-400 max-w-lg mx-auto border my-5" />

      {submitted ? (
        <div className="bg-yellow-500 py-5 text-center text-white mt-12 max-w-3xl mx-auto space-y-3">
          <h1 className="text-4xl font-bold">
            Thank you! Comment Submitted Successfully !
          </h1>
          <p className="font-lg tracking-wider">Later seen, if approved</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-6 max-w-2xl mx-auto mb-12"
        >
          <h3 className="text-base text-yellow-400">Enjoyed this article ?</h3>
          <h4 className="font-bold text-3xl">Leave a comment below !</h4>
          <hr className=" py-3 mt-2 " />
          <label className="flex flex-col space-y-3 mb-4">
            <span className=" text-gray-700">Name</span>
            {/* id of the form */}

            <input
              type="hidden"
              {...register("_id")}
              name="id" //input element requires the name attribute for the value to be sent
              value={postData._id} //specifies the initial value of the input field
            />
            <input
              {...register("name", {
                required: true,
                maxLength: 20,
                minLength: {
                  value: 2,
                  message: "Name is too short",
                },
              })}
              type="text"
              placeholder="John Doe"
              className=" py-2 px-4 border rounded shadow-md form-input outline-none focus:ring ring-yellow-400"
            />
          </label>
          <label className="flex flex-col space-y-3 mb-4">
            <span className=" text-gray-700">Email</span>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email address is invalid",
                },
              })}
              type="email"
              placeholder="johndoe@gmail.com"
              className=" py-2 px-4 border rounded shadow-md form-input outline-none focus:ring ring-yellow-400"
            />
          </label>
          <label className="flex flex-col space-y-3 mb-4">
            <span className=" text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              placeholder="Comment..."
              rows={8}
              className=" py-2 px-4 border rounded shadow-md form-input outline-none focus:ring ring-yellow-400"
            />
          </label>

          {/* error will return if the field validation fails */}
          <div className="flex flex-col space-y-3 ">
            {errors.name && (
              <span className="text-red-500">- Name is required.</span>
            )}
            {/* {errors.name?.message && (
            <span className="text-red-500">-{errors.name.message}</span>
          )} */}
            {errors.email && (
              <span className="text-red-500">- Email is required.</span>
            )}

            {errors.comment && (
              <span className="text-red-500">- Comment is required.</span>
            )}
          </div>

          <input
            type="submit"
            value="Submit"
            className="bg-yellow-500 py-2 shadow-md rounded hover:bg-yellow-400 focus:outline-none cursor-pointer text-white font-semibold "
          />
        </form>
      )}
      <div className="max-w-2xl mx-auto flex flex-col space-y-5  my-12 shadow shadow-yellow-400 py-2 px-5">
        <h1 className="font-bold text-3xl">Comments</h1>
        <hr />
        {postData.comments.map((comment) => {
          return (
            <div key={comment._id} className="">
              <p className="py-5">
                <span className="text-yellow-500">{comment.name}</span>:{" "}
                {comment.comment}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
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
    fallback: "blocking", //fails to find the page it returns a 404 error
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type=='post' && slug.current==$slug][0]{
        _id,
        _createdAt,
        author->{
        name,
        image
      },
      'comments':*[_type=='comment' && approved==true && post._ref==^._id],
      description,
      mainImage,
      title,
      slug,
      body,
      }
    `;
  const postData = await sanityClient.fetch(query, {
    slug: params?.slug, //initializes the $slug variable ?optional
  });

  if (!postData) {
    return {
      notFound: true, //returns a 404 page if the post data is not found
    };
  }
  return {
    props: {
      postData,
    },
    revalidate: 60, //revalidate the cached data, Incremental static regeneration
  };
};


