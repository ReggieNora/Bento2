import { useRef, useEffect } from "react";

const LetterGlitch = ({
  glitchColors = ["#7c3aed", "#ec4899", "#2e1065"],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
}: {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<
    {
      char: string;
      color: string;
      targetColor: string;
      colorProgress: number;
      isHirly?: boolean;
    }[]
  >([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());
  const lastTypingTime = useRef(Date.now());

  // Typing state management - modified for permanent display
  const typingState = useRef({
    mode: 'typing' as 'typing' | 'permanent', // Start typing immediately, then permanent
    textToType: 'HIRLY',
    currentIndex: 0,
    hirlyPositions: [] as number[], // Store positions where HIRLY is displayed
    typingSpeed: 150, // Typing speed
    hasTyped: false, // Track if we've finished typing once
  });

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;
  
  // Large font for HIRLY
  const hirlyFontSize = 96;
  const hirlyCharWidth = 60;

  const lettersAndSymbols = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
    "@",
    "#",
    "$",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "/",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "<",
    ">",
    ",",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const getRandomChar = () => {
    return lettersAndSymbols[
      Math.floor(Math.random() * lettersAndSymbols.length)
    ];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  // Single consistent color for HIRLY - bright white for maximum visibility
  const getHirlyColor = () => {
    return "#ffffff"; // Pure white for maximum contrast and visibility
  };

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const calculateHirlyPositions = () => {
    const { columns, rows } = grid.current;
    const text = typingState.current.textToType;
    const centerRow = Math.floor(rows / 2);
    
    // Calculate positions to center HIRLY with much larger spacing
    // Increased offset significantly to move HIRLY more to the right and ensure H is visible
    const totalWidth = text.length * Math.ceil(hirlyCharWidth / charWidth);
    const startCol = Math.floor((columns - totalWidth) / 2) + 6; // Increased from +2 to +6 for better centering
    
    const positions = [];
    for (let i = 0; i < text.length; i++) {
      const colOffset = i * Math.ceil(hirlyCharWidth / charWidth);
      const index = centerRow * columns + startCol + colOffset;
      if (index >= 0 && index < letters.current.length) {
        positions.push(index);
      }
    }
    return positions;
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
      isHirly: false,
    }));
    
    // Calculate HIRLY positions when grid changes
    typingState.current.hirlyPositions = calculateHirlyPositions();
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    
    // If we've already typed HIRLY, immediately display it in the new grid
    if (typingState.current.hasTyped) {
      displayHirlyImmediately();
    }
    
    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current!.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.textBaseline = "top";

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      
      // Use different styling for HIRLY characters
      if (letter.isHirly) {
        ctx.font = `bold ${hirlyFontSize}px monospace`;
        ctx.fillStyle = letter.color;
        ctx.shadowColor = letter.color;
        ctx.shadowBlur = 40; // Increased glow
        ctx.strokeStyle = letter.color;
        ctx.lineWidth = 3; // Thicker stroke
        
        // Draw the character with both fill and stroke for maximum prominence
        // Adjusted offset to ensure H is fully visible - moved further right
        const offsetX = x - 15; // Reduced from -25 to -15 to move text right
        const offsetY = y - 35; // Better centering for larger font
        
        // Multiple layers for maximum glow effect
        ctx.shadowBlur = 60;
        ctx.fillText(letter.char, offsetX, offsetY);
        ctx.shadowBlur = 40;
        ctx.strokeText(letter.char, offsetX, offsetY);
        ctx.shadowBlur = 20;
        ctx.fillText(letter.char, offsetX, offsetY);
      } else {
        ctx.font = `${fontSize}px monospace`;
        ctx.fillStyle = letter.color;
        ctx.shadowBlur = 0;
        ctx.fillText(letter.char, x, y);
      }
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.08));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index] || letters.current[index].isHirly) continue; // Skip HIRLY characters

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };

  const typeHirlyCharacter = () => {
    const { currentIndex, textToType, hirlyPositions } = typingState.current;
    
    if (currentIndex < textToType.length && currentIndex < hirlyPositions.length) {
      const position = hirlyPositions[currentIndex];
      if (letters.current[position]) {
        letters.current[position].char = textToType[currentIndex];
        letters.current[position].color = getHirlyColor();
        letters.current[position].targetColor = getHirlyColor();
        letters.current[position].colorProgress = 1;
        letters.current[position].isHirly = true;
        
        // Clear a much larger area around HIRLY for better visibility
        const clearRadius = 4; // Increased clear radius for better visibility
        for (let dy = -clearRadius; dy <= clearRadius; dy++) {
          for (let dx = -clearRadius; dx <= clearRadius; dx++) {
            const clearPos = position + dy * grid.current.columns + dx;
            if (clearPos >= 0 && clearPos < letters.current.length && 
                letters.current[clearPos] && !letters.current[clearPos].isHirly) {
              letters.current[clearPos].char = ' '; // Clear surrounding characters
              letters.current[clearPos].color = 'rgba(0,0,0,0.1)';
            }
          }
        }
      }
      
      typingState.current.currentIndex++;
      
      if (typingState.current.currentIndex >= textToType.length) {
        typingState.current.mode = 'permanent';
        typingState.current.hasTyped = true;
      }
    }
  };

  const displayHirlyImmediately = () => {
    const { textToType, hirlyPositions } = typingState.current;
    
    // Display all HIRLY characters immediately
    for (let i = 0; i < textToType.length && i < hirlyPositions.length; i++) {
      const position = hirlyPositions[i];
      if (letters.current[position]) {
        letters.current[position].char = textToType[i];
        letters.current[position].color = getHirlyColor();
        letters.current[position].targetColor = getHirlyColor();
        letters.current[position].colorProgress = 1;
        letters.current[position].isHirly = true;
        
        // Clear surrounding area
        const clearRadius = 4; // Increased clear radius
        for (let dy = -clearRadius; dy <= clearRadius; dy++) {
          for (let dx = -clearRadius; dx <= clearRadius; dx++) {
            const clearPos = position + dy * grid.current.columns + dx;
            if (clearPos >= 0 && clearPos < letters.current.length && 
                letters.current[clearPos] && !letters.current[clearPos].isHirly) {
              letters.current[clearPos].char = ' ';
              letters.current[clearPos].color = 'rgba(0,0,0,0.1)';
            }
          }
        }
      }
    }
  };

  const handleSmoothTransitions = () => {
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1 && !letter.isHirly) { // Don't smooth transition HIRLY characters
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(
            startRgb,
            endRgb,
            letter.colorProgress
          );
        }
      }
    });
  };

  const animate = () => {
    const now = Date.now();
    
    // Always update random background letters
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      lastGlitchTime.current = now;
    }
    
    // Handle typing logic - only type once, then stay permanent
    if (typingState.current.mode === 'typing') {
      if (now - lastTypingTime.current >= typingState.current.typingSpeed) {
        typeHirlyCharacter();
        lastTypingTime.current = now;
      }
    }
    // In permanent mode, HIRLY stays displayed forever - no clearing logic

    if (smooth) {
      handleSmoothTransitions();
    }

    // Always redraw the canvas every frame
    drawLetters();

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext("2d");
    resizeCanvas();
    animate();

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current as number);
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  const containerStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    overflow: "hidden",
    zIndex: 1,
    pointerEvents: "none" as const,
  };

  const canvasStyle = {
    display: "block",
    width: "100%",
    height: "100%",
    opacity: 0.5, // Slightly increased opacity for better HIRLY visibility
  };

  const outerVignetteStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none" as const,
    background:
      "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
  };

  const centerVignetteStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none" as const,
    background:
      "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
  };

  return (
    <div style={containerStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && (
        <div style={outerVignetteStyle}></div>
      )}
      {centerVignette && (
        <div style={centerVignetteStyle}></div>
      )}
    </div>
  );
};

export default LetterGlitch;