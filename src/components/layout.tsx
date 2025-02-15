import { PropsWithChildren } from "react";
import Header from "./header";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      {/* header */}
      <Header />
      <main className="container min-h-screen px-4 py-8 mx-auto">
        {" "}
        {children}
      </main>
      {/* footer */}
      <footer className="border-t  backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
        <div className="text-center container text-gray-200 mx-auto">
          <p> Made with 💖 by Adarsh Shukla</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
