import type { AppProps } from "next/app";

export default function Home({ Component, pageProps }: AppProps) {
  return (
      <div className="flex flex-col min-h-screen">
         Hello dashboard
      </div>  
   
  );
}

