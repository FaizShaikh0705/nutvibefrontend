import { NextSeo } from 'next-seo';
import MasterLayout from '../src/components/layouts/master';
import SeoSchema from "../src/components/seo/schema";
import LoginPageContainer from "../src/components/login";
import axios from 'axios';

const login = () => {
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
            <NextSeo title="Nutsvibe" description="Hair Growth and Hair fall control Nutsvibe oil" canonical="/success" />
            {/* <SeoSchema data={schemaData} /> */}
            <LoginPageContainer />
        </>
    )
}

export default login