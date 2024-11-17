'use client'

import { useEffect } from "react";
import { k } from '../app/utils/kaboomContext';

export default function Home() {

  useEffect(() => {
    const canvas = document.getElementById("game") as HTMLCanvasElement;

    if (!canvas) {
      console.error("Canvas element with ID 'game' not found");
      return;
    }

    // If not already initialized in `kaboomContext`, initialize Kaboom here
    k.setBackground(k.Color.fromHex("#311047"));
  }, []);

  return (
    <div>
      <canvas id="game" ></canvas>
    </div>
  );
}
