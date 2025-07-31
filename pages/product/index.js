import { NextSeo } from 'next-seo';
import ProductContainer from "../../src/components/product";
import axios from 'axios';
import { publicRequest } from "../../src/requestMethods";

const Product = ({ productData }) => {

    let schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "qirah",
        "url": "https://www.qirah-haircare.com",
        "logo": "https://admin.thewholetruthfoods.com/wp/wp-content/uploads/2021/01/logo-top.svg",
        "founder": "jitu karsan",
        "foundingDate": "2009",
        "foundingLocation": "Mumbai",
        "sameAs": [
            "https://www.facebook.com/",
            "https://twitter.com/",
            "https://www.instagram.com/",
            "https://www.youtube.com/channel/"
        ]
    }
    return (
        <>
            <NextSeo title="Nutsvibe" description="Hair Growth and Hair fall control Nutsvibe oil" canonical="/product" />
            {/* <SeoSchema data={schemaData} /> */}
            <ProductContainer productData={productData} />
        </>
    )
}
export default Product;


// const formatDate = (timestamp) => {
//     const dateObject = new Date(timestamp);
//     return dateObject.toLocaleDateString('en-US', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//     });
// };

export async function getStaticProps() {
    const res = await publicRequest.get("/products");
    const productData = res.data;

    return {
        props: {
            productData,
        },
        revalidate: 10,
    }
}
