import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { motion, AnimatePresence } from "framer-motion";
export const metadata = {
  title: "SLASH",
  description: "Let's do it",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="main-bg">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
