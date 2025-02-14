// pages/_app.tsx

import "../styles/globals.css"; // Importation des styles globaux
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // Gestion d'un thème simple (dark / light)
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Récupère le thème sauvegardé ou définit light par défaut
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className={`${theme}`}>
      {/* Bouton pour changer le thème */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      {/* Affiche la page demandée */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
