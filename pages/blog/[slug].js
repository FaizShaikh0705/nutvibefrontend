// // pages/blog/[slug].js
// import { NextSeo } from 'next-seo';
// import MasterLayout from '../../src/components/layouts/master';
// import SeoSchema from '../../src/components/seo/schema';
// import BlogDetailsContainer from '../../src/components/blog/blogDetails';
// // import axios from 'axios';
// import { publicRequest } from "../../src/requestMethods";

// const RelatedBlog = ({ blogDetailsData }) => {
//     let schemaData = {
//         // ... your schema data
//     };

//     return (
//         <>
//             <NextSeo title="Nutsvibe" description="Hair Growth and Hair fall control Nutsvibe oil" canonical="/blog" />
//             {/* <SeoSchema data={schemaData} /> */}
//             <BlogDetailsContainer blogDetailsData={blogDetailsData} />
//         </>
//     );
// };

// export async function getStaticPaths() {
//     const res = await publicRequest.get('/blog');
//     const blogDetailsData = await res.data;

//     const slugs = Object.keys(blogDetailsData).map((key) =>
//         blogDetailsData[key].sluginput.toLowerCase().split(' ').join('-')
//     );

//     const paths = slugs.map((slug) => ({
//         params: { slug },
//     }));

//     return {
//         paths,
//         fallback: false,
//     };
// }

// export async function getStaticProps({ params }) {
//     const { slug } = params;
//     const res = await publicRequest.get('/blog');
//     const blogDetailsData = await res.data;

//     const key = Object.keys(blogDetailsData).find(
//         (key) => blogDetailsData[key].sluginput.toLowerCase().split(' ').join('-') === slug
//     );

//     return {
//         props: {
//             blogDetailsData: blogDetailsData[key], // Access the specific blog using the key
//         },
//     };
// }

// export default RelatedBlog;
