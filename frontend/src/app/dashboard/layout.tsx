export default function Layout({ children, }: {
   children: React.ReactNode
 }) {
   return (
      <div className="flex flex-col min-h-screen">
         <main className="flex-1 w-full max-w-screen-xl mx-auto">
            {children}
         </main>
      </div>
   );
}
