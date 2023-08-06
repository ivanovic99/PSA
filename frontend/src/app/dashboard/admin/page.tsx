import type { AppProps } from "next/app";

export default  function Dashboard({ Component, pageProps }: AppProps) {

   return (
      <div className="flex flex-col min-h-screen">
         Hello dashboard
      </div>  
   
  );
}

