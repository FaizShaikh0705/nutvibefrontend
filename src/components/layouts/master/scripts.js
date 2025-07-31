import Script from 'next/script';

const LayoutScript = () => {
  if(!process.browser){
    return null;
  }
  return (
    <>
      <Script type="text/javascript" async="async" src="https://script.crazyegg.com/pages/scripts/0100/9676.js" />
       
    </>
  )
}

export default LayoutScript;