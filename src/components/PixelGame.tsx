import { useState, useEffect, useRef } from 'react';

const PixelGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef({
    bird: { y: 125, velocity: 0, width: 24, height: 24 },
    pipes: [] as { x: number, topHeight: number, width: number }[],
    frameCount: 0,
    speed: 3,
    gap: 90,
  });

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    gameRef.current = {
      bird: { y: 125, velocity: 0, width: 24, height: 24 },
      pipes: [],
      frameCount: 0,
      speed: 3,
      gap: 90,
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
      g.frameCount++;

      // Bird Physics
      g.bird.velocity += 0.5; // Gravity
      g.bird.y += g.bird.velocity;

      // Pipe Management
      if (g.frameCount % 90 === 0) {
        const minPipeHeight = 40;
        const maxPipeHeight = canvas.height - g.gap - minPipeHeight;
        const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight);
        g.pipes.push({ x: canvas.width, topHeight, width: 40 });
      }

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

        // Hit pipe
        if (
          birdRight > pipeLeft &&
          birdLeft < pipeRight &&
          (birdTop < pipeTopBottom || birdBottom > pipeBottomTop)
        ) {
          endGame();
        }

        // Score increment
        if (!pipe.hasOwnProperty('passed') && pipeRight < birdLeft) {
          (pipe as any).passed = true;
          setScore(s => s + 1);
        }

        // Remove old pipes
        if (pipeRight < 0) {
          g.pipes.splice(index, 1);
        }
      });

      // Bound check
      if (g.bird.y < 0 || g.bird.y + g.bird.height > canvas.height) {
        endGame();
      }

      // Render
      draw(ctx, canvas);

      animationId = requestAnimationFrame(update);
    };

    const endGame = () => {
      setGameOver(true);
      setIsPlaying(false);
      if (score > highScore) setHighScore(score);
    };

    const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const g = gameRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Grid
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Pipes
      ctx.fillStyle = '#00ffff';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      g.pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
        ctx.strokeRect(pipe.x, 0, pipe.width, pipe.topHeight);

        // Bottom pipe
        const bottomY = pipe.topHeight + g.gap;
        const bottomHeight = canvas.height - bottomY;
        ctx.fillRect(pipe.x, bottomY, pipe.width, bottomHeight);
        ctx.strokeRect(pipe.x, bottomY, pipe.width, bottomHeight);
      });

      // Bird (Mogesh)
      ctx.save();
      ctx.translate(50 + g.bird.width / 2, g.bird.y + g.bird.height / 2);
      ctx.rotate(Math.min(Math.PI / 4, Math.max(-Math.PI / 4, g.bird.velocity * 0.1)));

      ctx.fillStyle = '#ff00ff';
      ctx.fillRect(-g.bird.width / 2, -g.bird.height / 2, g.bird.width, g.bird.height);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(-g.bird.width / 2, -g.bird.height / 2, g.bird.width, g.bird.height);

      // Eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(4, -8, 6, 6);

      ctx.restore();
    };

    update();
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, gameOver, score]);

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
      if (!isPlaying) {
        resetGame();
      } else {
        gameRef.current.bird.velocity = -7;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') handleAction(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-4 font-pixel relative select-none">
      <div className="absolute top-4 left-8 text-primary text-xs tracking-tighter">
        HIGH SCORE: {highScore}
      </div>
      <div className="absolute top-4 right-8 text-secondary text-lg">
        SCORE: {score}
      </div>

      {!isPlaying && !gameOver && (
        <div className="text-center z-10">
          <h3 className="text-white text-xl mb-6">FLAPPY MOGESH</h3>
          <button
            onClick={() => { resetGame(); }}
            className="pixel-button scale-110"
          >
            START MISSION
          </button>
        </div>
      )}

      {gameOver && (
        <div className="text-center absolute z-20 bg-black/90 p-8 border-4 border-primary shadow-[10px_10px_0px_white]">
          <h3 className="text-primary text-2xl mb-4 italic tracking-widest">W@STED</h3>
          <p className="text-white mb-6 font-retro text-2xl">SCORE: {score}</p>
          <button
            onClick={() => { resetGame(); }}
            className="pixel-button-cyan"
          >
            RESPAWN
          </button>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="max-w-full h-auto cursor-pointer border-2 border-white/10"
        onClick={() => {
          if (!isPlaying) resetGame();
          else gameRef.current.bird.velocity = -7;
        }}
      />

      <div className="mt-4 text-[10px] text-gray-500 uppercase tracking-widest">
        [ SPACE / CLICK ] TO FLAP
      </div>
    </div>
  );
};

export default PixelGame;
