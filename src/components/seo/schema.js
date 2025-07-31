//import Script from 'next/script';
const SeoSchema = ({ data, id }) => {
  if(!process.browser){
    return null;
  }
  /* eslint-disable */
  return (
    <>
    	<script id={id ? id : "seoschema"} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </>
  )
}
export default SeoSchema;
