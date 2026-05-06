import { useState, useEffect, useRef } from 'react';

const PixelGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef({
    bird: { y: 125, velocity: 0, width: 24, height: 24 },
    pipes: [] as { x: number, topHeight: number, width: number, passed?: boolean }[],
    particles: [] as { x: number, y: number, size: number, color: string, life: number }[],
    frameCount: 0,
    speed: 2,
    gap: 100,
    bgOffset: 0,
    hasStarted: false,
  });

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setIsGlitching(false);
    gameRef.current = {
      bird: { y: 125, velocity: 0, width: 24, height: 24 },
      pipes: [],
      particles: [],
      frameCount: 0,
      speed: 2,
      gap: 100,
      bgOffset: 0,
      hasStarted: false,
    };
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const update = () => {
      const g = gameRef.current;
      g.bgOffset = (g.bgOffset + 1) % 40;

      // Bird Physics
      if (g.hasStarted) {
        g.frameCount++;
        g.bird.velocity += 0.25;
        g.bird.y += g.bird.velocity;
      }

      // Trail Particles
      if (g.hasStarted && g.frameCount % 2 === 0) {
        g.particles.push({
          x: 62,
          y: g.bird.y + 12,
          size: Math.random() * 4 + 2,
          color: Math.random() > 0.5 ? '#ff00ff' : '#00ffff',
          life: 1.0
        });
      }

      // Update Particles
      g.particles.forEach((p, i) => {
        p.x -= g.speed * 0.5;
        p.life -= 0.02;
        if (p.life <= 0) g.particles.splice(i, 1);
      });

      // Pipe Management
      if (g.hasStarted && g.frameCount % 85 === 0) {
        const minPipeHeight = 50;
        const maxPipeHeight = canvas.height - g.gap - minPipeHeight;
        const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight);
        g.pipes.push({ x: canvas.width, topHeight, width: 50 });
      }

      if (g.hasStarted) {
        g.pipes.forEach((pipe, index) => {
          pipe.x -= g.speed;

          // Collision Detection
          const birdRight = 50 + g.bird.width;
          const birdLeft = 50;
          const birdTop = g.bird.y;
          const birdBottom = g.bird.y + g.bird.height;

          const pipeRight = pipe.x + pipe.width;
          const pipeLeft = pipe.x;
          const pipeTopBottom = pipe.topHeight;
          const pipeBottomTop = pipe.topHeight + g.gap;

          if (
            birdRight > pipeLeft &&
            birdLeft < pipeRight &&
            (birdTop < pipeTopBottom || birdBottom > pipeBottomTop)
          ) {
            triggerDeath();
          }

          if (!pipe.passed && pipeRight < birdLeft) {
            pipe.passed = true;
            setScore(s => s + 1);
          }

          if (pipeRight < 0) {
            g.pipes.splice(index, 1);
          }
        });
      }

      // Bound check
      if (g.bird.y < 0 || g.bird.y + g.bird.height > canvas.height) {
        triggerDeath();
      }

      draw(ctx, canvas);
      animationId = requestAnimationFrame(update);
    };

    const triggerDeath = () => {
      setIsGlitching(true);
      setTimeout(() => {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) setHighScore(score);
      }, 300);
    };

    const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const g = gameRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isGlitching) {
        ctx.fillStyle = Math.random() > 0.5 ? '#ff00ff' : '#00ffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // Parallax Background Grid
      ctx.strokeStyle = '#0a0a0a';
      ctx.lineWidth = 1;
      for (let i = -g.bgOffset; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Particles
      g.particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1.0;

      // Pipes
      g.pipes.forEach(pipe => {
        const grad = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipe.width, 0);
        grad.addColorStop(0, '#111');
        grad.addColorStop(0.5, '#222');
        grad.addColorStop(1, '#000');
        ctx.fillStyle = grad;
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;

        // Top pipe
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
        ctx.strokeRect(pipe.x, 0, pipe.width, pipe.topHeight);
        // Top pipe cap
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(pipe.x - 4, pipe.topHeight - 12, pipe.width + 8, 12);
        ctx.strokeRect(pipe.x - 4, pipe.topHeight - 12, pipe.width + 8, 12);

        // Bottom pipe
        const bottomY = pipe.topHeight + g.gap;
        const bottomHeight = canvas.height - bottomY;
        ctx.fillStyle = grad;
        ctx.fillRect(pipe.x, bottomY, pipe.width, bottomHeight);
        ctx.strokeRect(pipe.x, bottomY, pipe.width, bottomHeight);
        // Bottom pipe cap
        ctx.fillStyle = '#ff00ff';
        ctx.fillRect(pipe.x - 4, bottomY, pipe.width + 8, 12);
        ctx.strokeRect(pipe.x - 4, bottomY, pipe.width + 8, 12);
      });

      // Bird (Mogesh)
      ctx.save();
      ctx.translate(50 + g.bird.width / 2, g.bird.y + g.bird.height / 2);
      ctx.rotate(Math.min(Math.PI / 4, Math.max(-Math.PI / 4, g.bird.velocity * 0.1)));

      // Bird Body
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-g.bird.width / 2, -g.bird.height / 2, g.bird.width, g.bird.height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(-g.bird.width / 2, -g.bird.height / 2, g.bird.width, g.bird.height);

      // Face
      ctx.fillStyle = '#000';
      ctx.fillRect(4, -6, 4, 4); // Eye
      ctx.fillRect(6, 4, 6, 2); // Mouth

      ctx.restore();
    };

    update();
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, gameOver, score, isGlitching]);

  useEffect(() => {
    const handleStartEvent = () => {
      if (!isPlaying) resetGame();
    };
    window.addEventListener("startGame", handleStartEvent);
    return () => window.removeEventListener("startGame", handleStartEvent);
  }, [isPlaying]);

  useEffect(() => {
    const handleAction = (e?: any) => {
      if (e && e.preventDefault) e.preventDefault();
      if (!isPlaying && !isGlitching) {
        resetGame();
      } else if (isPlaying) {
        gameRef.current.hasStarted = true;
        gameRef.current.bird.velocity = -6.5;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') handleAction(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGlitching]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-4 font-pixel relative select-none overflow-hidden">
      {/* HUD */}
      <div className="absolute top-4 left-8 text-primary text-[8px] tracking-widest bg-black px-2 py-1 border border-white/20">
        HI_SCORE: {highScore}
      </div>
      <div className="absolute top-4 right-8 text-secondary text-2xl drop-shadow-[2px_2px_0px_#fff]">
        {score}
      </div>

      {!isPlaying && !gameOver && !isGlitching && (
        <div className="text-center z-10 animate-float">
          <h3 className="text-white text-xl mb-6 tracking-tighter">MISSION: FLAPPY</h3>
          <button
            onClick={() => { resetGame(); }}
            className="pixel-button-cyan scale-125"
          >
            INITIALIZE
          </button>
        </div>
      )}

      {gameOver && (
        <div className="text-center absolute z-20 bg-black p-8 border-4 border-primary shadow-[10px_10px_0px_white] animate-in zoom-in duration-300">
          <h3 className="text-primary text-3xl mb-4 italic font-black">SYSTEM FAILURE</h3>
          <p className="text-white mb-6 font-retro text-2xl">RECOVERED DATA: {score}</p>
          <button
            onClick={() => { resetGame(); }}
            className="pixel-button w-full"
          >
            REBOOT
          </button>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className={`max-w-full h-auto cursor-pointer border-2 transition-all duration-300 ${isGlitching ? 'border-primary' : 'border-white/10'}`}
        onClick={() => {
          if (!isPlaying && !isGlitching) resetGame();
          else if (isPlaying) {
            gameRef.current.hasStarted = true;
            gameRef.current.bird.velocity = -6.5;
          }
        }}
      />

      <div className="mt-4 text-[8px] text-gray-500 uppercase tracking-widest flex items-center gap-4">
        <span>[SPACE] FLAP</span>
        <span className="w-1 h-1 bg-gray-500 rounded-full" />
        <span>AVOID OBSTACLES</span>
      </div>
    </div>
  );
};

export default PixelGame;
