/**
 * components/MusicPlayer.tsx
 *
 * Player de música de fundo — toca em loop enquanto o convidado
 * navega pelo site. Fica fixo no canto da tela com um botão para
 * tocar/pausar.
 *
 * Por que não toca sozinho direto?
 * Os navegadores bloqueiam áudio com som automático sem alguma
 * interação do usuário. Por isso tentamos tocar ao carregar a
 * página, mas se o navegador bloquear, o botão fica pronto para
 * o usuário iniciar a música com um toque.
 *
 * Para trocar a música: substitua o arquivo /public/musica-casamento.mp3
 * (mantenha o mesmo nome, ou atualize o caminho abaixo).
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { Disc3, VolumeX } from "lucide-react";

const MUSIC_SRC = "/musica-casamento.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Tenta iniciar a música automaticamente ao carregar a página
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Navegador bloqueou o autoplay — o usuário inicia manualmente
        setIsPlaying(false);
      });
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
      >
        {isPlaying ? (
          <Disc3 className="w-5 h-5 text-rose-500 animate-spin-slow" aria-hidden="true" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
