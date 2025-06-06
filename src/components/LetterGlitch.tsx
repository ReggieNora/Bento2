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

  // Typing state management
  const typingState = useRef({
    mode: 'random' as 'random' | 'typing' | 'display',
    textToType: 'HIRLY',
    currentIndex: 0,
    displayCycles: 0,
    maxDisplayCycles: 60, // How long to display "HIRLY"
    triggerCycle: 200, // How many random cycles before typing "HIRLY"
    currentCycle: 0,
    hirlyPositions: [] as number[], // Store positions where HIRLY is displayed
    typingSpeed: 150, // Speed of typing each character
  });

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

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

  const getHirlyColor = () => {
    // Use a brighter, more prominent color for HIRLY
    return "#ffffff";
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
    const startCol = Math.floor((columns - text.length) / 2);
    
    const positions = [];
    for (let i = 0; i < text.length; i++) {
      const index = centerRow * columns + startCol + i;
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
    
    // Reset typing state when grid changes
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
    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current!.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      
      // Use different styling for HIRLY characters
      if (letter.isHirly) {
        ctx.font = `bold ${fontSize + 2}px monospace`;
        ctx.fillStyle = letter.color;
        ctx.shadowColor = letter.color;
        ctx.shadowBlur = 10;
      } else {
        ctx.font = `${fontSize}px monospace`;
        ctx.fillStyle = letter.color;
        ctx.shadowBlur = 0;
      }
      
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;
    if (typingState.current.mode !== 'random') return; // Only update random letters in random mode

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

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
      }
      
      typingState.current.currentIndex++;
      
      if (typingState.current.currentIndex >= textToType.length) {
        typingState.current.mode = 'display';
        typingState.current.displayCycles = 0;
      }
    }
  };

  const clearHirly = () => {
    typingState.current.hirlyPositions.forEach(position => {
      if (letters.current[position]) {
        letters.current[position].char = getRandomChar();
        letters.current[position].color = getRandomColor();
        letters.current[position].targetColor = getRandomColor();
        letters.current[position].colorProgress = 1;
        letters.current[position].isHirly = false;
      }
    });
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
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
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    const now = Date.now();
    
    // Handle typing logic
    if (typingState.current.mode === 'typing') {
      if (now - lastTypingTime.current >= typingState.current.typingSpeed) {
        typeHirlyCharacter();
        drawLetters();
        lastTypingTime.current = now;
      }
    } else if (typingState.current.mode === 'display') {
      typingState.current.displayCycles++;
      if (typingState.current.displayCycles >= typingState.current.maxDisplayCycles) {
        clearHirly();
        typingState.current.mode = 'random';
        typingState.current.currentCycle = 0;
        typingState.current.currentIndex = 0;
        drawLetters();
      }
    } else if (typingState.current.mode === 'random') {
      // Handle random glitch updates
      if (now - lastGlitchTime.current >= glitchSpeed) {
        updateLetters();
        drawLetters();
        lastGlitchTime.current = now;
        
        typingState.current.currentCycle++;
        if (typingState.current.currentCycle >= typingState.current.triggerCycle) {
          typingState.current.mode = 'typing';
          typingState.current.currentIndex = 0;
          typingState.current.hirlyPositions = calculateHirlyPositions();
          lastTypingTime.current = now;
        }
      }
    }

    if (smooth) {
      handleSmoothTransitions();
    }

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
    opacity: 0.25,
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