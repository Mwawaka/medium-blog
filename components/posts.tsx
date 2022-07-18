import { Props } from "../pages/index";
import { urlFor } from "../sanity";
import Link from "next/link";

const Posts = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 p-2 lg:gap-6 lg:p-6 md:grid-cols-2 lg:grid-cols-3 ">
      {posts.map((post) => {
        return (
          <Link key={post._id} href={`/post/${post.slug.current}`} passHref>
            <div className="border rounded-xl group cursor-pointer overflow-hidden"> 
              <img src={urlFor(post.mainImage).url()!} className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out " />
              <div className="flex justify-between bg-white p-8">
                <div>
                  <p className="text-2xl font-semibold ">{post.title}</p>
                  <p>
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  src={urlFor(post.author.image).url()!}
                  alt="author image"
                  className="w-16 h-16 rounded-full"
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
