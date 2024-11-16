'use client';

import Image from "next/image";
import Songs from "./components/songs";
import { useState } from "react"; // Import useState

export default function Home() {
  // State to control the visibility of the instructions
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(false);

  // Toggle function for the instructions
  const toggleInstructions = () => {
    setIsInstructionsVisible(prev => !prev);
  };

  return (
    <div className="container mx-auto flex flex-col gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-lg mx-auto px-2">
        <Image
          src="/logo.svg"
          alt="Logo de Lumières sur Chambord"
          width={500}
          height={200}
          className="mx-auto"
          priority
        />
        
        {/* Button to toggle the instructions */}
        <div className="w-full bg-white/10 rounded-lg">
          <button 
            onClick={toggleInstructions} 
            className="bg-white/10 text-white font-medium px-4 py-3 rounded active:scale-95 w-full flex justify-between"
          >

            Comment ça marche?

            {!isInstructionsVisible && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>)}

            {isInstructionsVisible && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>)}


          </button>

          {/* Conditionally render the ul based on isInstructionsVisible */}
          {isInstructionsVisible && (
            <ul className=" flex flex-col gap-4 p-4">
              <li>Vous pouvez contrôler la liste de lecture à partir de cette page. Appuyez sur une chanson pour afficher les boutons de contrôle.</li>
              <li>La chanson au sommet de la liste sera la prochaine chanson jouée lorsque le gros bouton rouge sera pressé.</li>
            </ul>
          )}
        </div>  

        <h1 className="mx-auto text-2xl font-bold">Prochaines chansons</h1>
        <Songs />
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mb-8">
        <div>
          <p>Suivez-nous sur Facebook:</p>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.facebook.com/LumieresSurChambord"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="w-6 h-6 fill-white">
              <path d="M24 4H6C4.895 4 4 4.895 4 6v18c0 1.105.895 2 2 2h10v-9h-3v-3h3v-1.611C16 9.339 17.486 8 20.021 8c1.214.0 1.856.09 2.16.131V11h-1.729C19.376 11 19 11.568 19 12.718V14h3.154l-.428 3H19v9h5c1.105.0 2-.895 2-2V6C26 4.895 25.104 4 24 4z"></path>
            </svg>
            Lumières sur Chambord
          </a>
        </div>
      </footer>
    </div>
  );
}
