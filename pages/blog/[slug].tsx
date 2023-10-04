import Link from "next/link";
export default function SingleBlog({ post }) {
  const data = post[0];
  console.log("post", data);
  return (
    <main className="">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {data.title.rendered}
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400"
            dangerouslySetInnerHTML={{
                __html: data.content.rendered
            }}>
            </p>
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

  return {
    props: {
      post,
    },
  };
}
