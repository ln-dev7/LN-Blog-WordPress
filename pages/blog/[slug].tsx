import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
export default function SingleBlog({ postData: post, featuredImage }) {
  console.log("post", post);
  return (
    <main className="">
      <Head>
        <title>{post.title.rendered}</title>
      </Head>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            {featuredImage && (
              <div className="w-full h-96 mb-8">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={featuredImage}
                  alt="image description"
                />
              </div>
            )}

            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {post.title.rendered}
            </h2>
            <div
              className="font-light text-gray-500 sm:text-xl dark:text-gray-400"
              dangerouslySetInnerHTML={{
                __html: post.content.rendered,
              }}
            ></div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:8888/backend/wp-json/wp/v2/posts");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://localhost:8888/backend/wp-json/wp/v2/posts/?slug=${params.slug}`
  );
  const post = await res.json();

  const postData = post[0];

  let featuredImage = null;
  if (postData.featured_media) {
    const imgRes = await fetch(
      `http://localhost:8888/backend/wp-json/wp/v2/media/${postData.featured_media}`
    );
    const imgData = await imgRes.json();
    featuredImage = imgData.source_url;
  }

  return {
    props: {
      postData,
      featuredImage,
    },
  };
}
