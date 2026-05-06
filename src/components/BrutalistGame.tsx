import { useState, useEffect, useRef } from 'react';

type BrushType = 'BLOCK' | 'WIRE' | 'DOTS' | 'ERASER';

const BrutalistGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brush, setBrush] = useState<BrushType>('WIRE');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(20);

  const colors = [
    '#ff3e00', // Acid Orange
    '#0000ff', // Electric Blue
    '#ffff00', // Neon Yellow
    '#00ff00', // Lime Green
    '#000000', // Black
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas);
  }, []);

  const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 30) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 30) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.beginPath(); // Reset path
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.lineWidth = brushSize;
    ctx.lineCap = brush === 'BLOCK' ? 'square' : 'round';
    ctx.lineJoin = brush === 'BLOCK' ? 'miter' : 'round';
    ctx.strokeStyle = brush === 'ERASER' ? '#ffffff' : color;
    ctx.fillStyle = brush === 'ERASER' ? '#ffffff' : color;

    if (brush === 'BLOCK') {
      ctx.fillRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
      ctx.strokeRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
    } else if (brush === 'DOTS') {
      for (let i = 0; i < 5; i++) {
        const dx = (Math.random() - 0.5) * brushSize * 2;
        const dy = (Math.random() - 0.5) * brushSize * 2;
        ctx.fillRect(x + dx, y + dy, 4, 4);
      }
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center bg-white p-2 sm:p-4 font-sans relative select-none border-4 border-black shadow-[10px_10px_0px_#000]">
      {/* Desktop Controls Overlay */}
      <div className="hidden sm:flex absolute top-4 left-4 right-4 justify-between items-start gap-2 z-10 pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="bg-black text-white px-3 py-1 text-black italic text-xs uppercase shadow-[4px_4px_0px_#ff3e00]">
            SKETCH.SYS
          </div>
          <div className="flex flex-col gap-1 bg-white border-2 border-black p-1 shadow-[4px_4px_0px_#000]">
            {(['WIRE', 'BLOCK', 'DOTS', 'ERASER'] as BrushType[]).map(b => (
              <button
                key={b}
                onClick={() => setBrush(b)}
                className={`px-3 py-1.5 text-[10px] text-black text-left uppercase transition-all border border-transparent ${brush === b
                  ? 'bg-primary text-white border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-gray-50 text-black hover:bg-gray-200 hover:border-black'
                  }`}
              >
                {b === 'ERASER' ? '× ERASER' : `› ${b}`}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 pointer-events-auto items-end">
          <div className="bg-black text-white px-3 py-1 text-black italic text-xs uppercase shadow-[-4px_4px_0px_#00ffff]">
            PALETTE
          </div>
          <div className="flex gap-1 bg-white border-2 border-black p-1 shadow-[-4px_4px_0px_#000]">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 border-2 transition-all ${color === c && brush !== 'ERASER'
                  ? 'border-black scale-110 shadow-[2px_2px_0px_#000] z-10'
                  : 'border-white hover:border-black'
                  }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button
            onClick={clearCanvas}
            className="mt-2 bg-white border-2 border-black px-4 py-1 text-black italic text-xs uppercase hover:bg-primary hover:text-white transition-all shadow-[-4px_4px_0px_#000] active:shadow-none active:translate-x-[-2px] active:translate-y-[2px]"
          >
            CLEAR_BUFFER
          </button>
        </div>
      </div>

      {/* Mobile Top Header */}
      <div className="sm:hidden w-full flex justify-between items-center mb-2 px-1">
        <div className="bg-black text-white px-2 py-0.5 text-black italic text-[10px] uppercase shadow-[2px_2px_0px_#ff3e00]">
          SKETCH.SYS
        </div>
        <button
          onClick={clearCanvas}
          className="bg-white border-2 border-black px-2 py-0.5 text-black italic text-[8px] uppercase shadow-[2px_2px_0px_#000]"
        >
          CLEAR
        </button>
      </div>

      <div className="relative w-full max-w-4xl group">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-auto bg-white border-2 sm:border-4 border-black shadow-[5px_5px_0px_#000] sm:shadow-[20px_20px_0px_#000] touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <div className="absolute bottom-2 right-2 pointer-events-none text-black italic text-black/10 text-2xl sm:text-7xl text-black">
          SKETCH.SYS
        </div>
      </div>

      {/* Mobile Toolbar */}
      <div className="sm:hidden w-full bg-white border-t-2 border-black mt-2 p-1 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-1">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {(['BLOCK', 'WIRE', 'DOTS', 'ERASER'] as BrushType[]).map(b => (
              <button
                key={b}
                onClick={() => setBrush(b)}
                className={`px-2 py-1 text-[8px] text-black uppercase transition-all border ${brush === b
                  ? 'bg-primary text-white border-black shadow-[1px_1px_0px_#000]'
                  : 'bg-white text-black border-black/10'
                  }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 border ${color === c && brush !== 'ERASER' ? 'border-black scale-110 shadow-[1px_1px_0px_#000]' : 'border-black/20'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[7px] text-black uppercase">S:{brushSize}</span>
            <input
              type="range"
              min="5"
              max="100"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-16 h-1 accent-black"
            />
          </div>
        </div>
      </div>

      {/* Desktop Footer (Hidden on Mobile) */}
      <div className="hidden sm:flex mt-6 flex-col items-center gap-1">
        <p className="text-black italic text-black text-sm uppercase tracking-tighter">EXPRESSION THROUGH RAW GEOMETRY</p>
        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400">
          <span>SIZE: {brushSize}PX</span>
          <input
            type="range"
            min="5"
            max="100"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32 accent-black"
          />
        </div>
      </div>
    </div>
  );
};

export default BrutalistGame;
