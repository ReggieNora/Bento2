import { useRef, useEffect } from "react";

const LetterGlitch = ({
  glitchColors = ["#7c3aed", "#ec4899", "#2e1065"],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  greetingMessage = null,
  greetingDuration = 120000, // 2 minutes
  userName = "Guest",
}: {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  greetingMessage?: string | null;
  greetingDuration?: number;
  userName?: string;
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
      isGreeting?: boolean;
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
    maxDisplayCycles: 80, // How long to display "HIRLY"
    triggerCycle: 150, // How many random cycles before typing "HIRLY"
    currentCycle: 0,
    hirlyPositions: [] as number[], // Store positions where HIRLY is displayed
    typingSpeed: 200, // Speed of typing each character
  });

  // Greeting state management
  const greetingState = useRef({
    displayState: 'hidden' as 'hidden' | 'typing' | 'displaying' | 'fading',
    startTime: 0,
    currentIndex: 0,
    positions: [] as number[],
    opacity: 1,
    message: '',
  });

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;
  
  // Much larger font for HIRLY
  const hirlyFontSize = 48;
  const hirlyCharWidth = 30;

  // Greeting font size
  const greetingFontSize = 24;
  const greetingCharWidth = 15;

  const lettersAndSymbols = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "!", "@", "#", "$", "&", "*", "(", ")", "-", "_", "+", "=", "/",
    "[", "]", "{", "}", ";", ":", "<", ">", ",", "0", "1", "2", "3",
    "4", "5", "6", "7", "8", "9",
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
    // Use a brighter, more prominent color for HIRLY with some variation
    const colors = ["#ffffff", "#7c3aed", "#ec4899"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getGreetingColor = () => {
    // Use warm, welcoming colors for greeting
    const colors = ["#fbbf24", "#f59e0b", "#d97706", "#ffffff"];
    return colors[Math.floor(Math.random() * colors.length)];
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
    
    // Calculate positions to center HIRLY with larger spacing
    const totalWidth = text.length * Math.ceil(hirlyCharWidth / charWidth);
    const startCol = Math.floor((columns - totalWidth) / 2);
    
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

  const calculateGreetingPositions = () => {
    const { columns, rows } = grid.current;
    const message = greetingState.current.message;
    
    // Position in top-right area
    const topRow = Math.floor(rows * 0.15); // 15% from top
    const charsPerLine = Math.floor(columns * 0.4); // Use 40% of width
    const startCol = Math.floor(columns * 0.55); // Start at 55% from left
    
    const positions = [];
    let currentRow = topRow;
    let currentCol = startCol;
    
    for (let i = 0; i < message.length; i++) {
      if (message[i] === ' ') {
        currentCol += Math.ceil(greetingCharWidth / charWidth);
      } else if (message[i] === '\n' || currentCol >= startCol + charsPerLine) {
        currentRow += 2; // Move to next line with spacing
        currentCol = startCol;
        if (message[i] !== '\n') {
          const index = currentRow * columns + currentCol;
          if (index >= 0 && index < letters.current.length) {
            positions.push(index);
          }
          currentCol += Math.ceil(greetingCharWidth / charWidth);
        }
      } else {
        const index = currentRow * columns + currentCol;
        if (index >= 0 && index < letters.current.length) {
          positions.push(index);
        }
        currentCol += Math.ceil(greetingCharWidth / charWidth);
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
      isGreeting: false,
    }));
    
    // Reset typing state when grid changes
    typingState.current.hirlyPositions = calculateHirlyPositions();
    if (greetingState.current.message) {
      greetingState.current.positions = calculateGreetingPositions();
    }
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
    ctx.textBaseline = "top";

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      
      // Use different styling for greeting characters
      if (letter.isGreeting) {
        ctx.font = `bold ${greetingFontSize}px monospace`;
        const alpha = greetingState.current.opacity;
        const color = letter.color;
        const rgbColor = hexToRgb(color);
        if (rgbColor) {
          ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${alpha})`;
          ctx.shadowColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${alpha * 0.8})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.8})`;
        }
        ctx.shadowBlur = 15;
        ctx.fillText(letter.char, x - 5, y - 5);
      }
      // Use different styling for HIRLY characters
      else if (letter.isHirly) {
        ctx.font = `bold ${hirlyFontSize}px monospace`;
        ctx.fillStyle = letter.color;
        ctx.shadowColor = letter.color;
        ctx.shadowBlur = 20;
        ctx.strokeStyle = letter.color;
        ctx.lineWidth = 2;
        
        // Draw the character with both fill and stroke for more prominence
        ctx.fillText(letter.char, x - 10, y - 15); // Offset to center better
        ctx.strokeText(letter.char, x - 10, y - 15);
        
        // Add extra glow effect
        ctx.shadowBlur = 30;
        ctx.fillText(letter.char, x - 10, y - 15);
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
    if (typingState.current.mode !== 'random') return; // Only update random letters in random mode

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.08));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index] || letters.current[index].isHirly || letters.current[index].isGreeting) continue; // Skip HIRLY and greeting characters

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
        
        // Also mark surrounding positions as HIRLY to create a larger presence
        const surroundingPositions = [
          position - 1,
          position + 1,
          position - grid.current.columns,
          position + grid.current.columns,
        ];
        
        surroundingPositions.forEach(pos => {
          if (pos >= 0 && pos < letters.current.length && letters.current[pos]) {
            // Don't overwrite other HIRLY characters, but make surrounding area less prominent
            if (!letters.current[pos].isHirly && !letters.current[pos].isGreeting) {
              letters.current[pos].char = ' '; // Clear surrounding characters
              letters.current[pos].color = 'rgba(0,0,0,0.1)';
            }
          }
        });
      }
      
      typingState.current.currentIndex++;
      
      if (typingState.current.currentIndex >= textToType.length) {
        typingState.current.mode = 'display';
        typingState.current.displayCycles = 0;
      }
    }
  };

  const typeGreetingCharacter = () => {
    const { currentIndex, message, positions } = greetingState.current;
    
    if (currentIndex < message.length && currentIndex < positions.length) {
      const position = positions[currentIndex];
      if (letters.current[position] && message[currentIndex] !== ' ' && message[currentIndex] !== '\n') {
        letters.current[position].char = message[currentIndex];
        letters.current[position].color = getGreetingColor();
        letters.current[position].targetColor = getGreetingColor();
        letters.current[position].colorProgress = 1;
        letters.current[position].isGreeting = true;
      }
      
      greetingState.current.currentIndex++;
      
      if (greetingState.current.currentIndex >= message.length) {
        greetingState.current.displayState = 'displaying';
        greetingState.current.startTime = Date.now();
      }
    }
  };

  const clearHirly = () => {
    // Clear a larger area around HIRLY positions
    typingState.current.hirlyPositions.forEach(position => {
      const clearPositions = [
        position - 1,
        position,
        position + 1,
        position - grid.current.columns - 1,
        position - grid.current.columns,
        position - grid.current.columns + 1,
        position + grid.current.columns - 1,
        position + grid.current.columns,
        position + grid.current.columns + 1,
      ];
      
      clearPositions.forEach(pos => {
        if (pos >= 0 && pos < letters.current.length && letters.current[pos]) {
          letters.current[pos].char = getRandomChar();
          letters.current[pos].color = getRandomColor();
          letters.current[pos].targetColor = getRandomColor();
          letters.current[pos].colorProgress = 1;
          letters.current[pos].isHirly = false;
        }
      });
    });
  };

  const clearGreeting = () => {
    greetingState.current.positions.forEach(position => {
      if (position >= 0 && position < letters.current.length && letters.current[position]) {
        letters.current[position].char = getRandomChar();
        letters.current[position].color = getRandomColor();
        letters.current[position].targetColor = getRandomColor();
        letters.current[position].colorProgress = 1;
        letters.current[position].isGreeting = false;
      }
    });
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1 && !letter.isHirly && !letter.isGreeting) { // Don't smooth transition HIRLY or greeting characters
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
    
    // Handle greeting logic first (higher priority)
    if (greetingState.current.displayState === 'typing') {
      if (now - lastTypingTime.current >= 100) { // Faster typing for greeting
        typeGreetingCharacter();
        drawLetters();
        lastTypingTime.current = now;
      }
    } else if (greetingState.current.displayState === 'displaying') {
      // Add some glitch effect to greeting while displaying
      if ((now - greetingState.current.startTime) % 500 < 50) {
        greetingState.current.positions.forEach(position => {
          if (letters.current[position] && letters.current[position].isGreeting) {
            letters.current[position].color = getGreetingColor();
          }
        });
        drawLetters();
      }
      
      // Check if greeting duration has passed
      if (now - greetingState.current.startTime >= greetingDuration) {
        greetingState.current.displayState = 'fading';
      }
    } else if (greetingState.current.displayState === 'fading') {
      greetingState.current.opacity -= 0.02;
      if (greetingState.current.opacity <= 0) {
        greetingState.current.displayState = 'hidden';
        greetingState.current.opacity = 1;
        clearGreeting();
      }
      drawLetters();
    }
    
    // Handle HIRLY typing logic (only if no greeting is active)
    else if (greetingState.current.displayState === 'hidden') {
      if (typingState.current.mode === 'typing') {
        if (now - lastTypingTime.current >= typingState.current.typingSpeed) {
          typeHirlyCharacter();
          drawLetters();
          lastTypingTime.current = now;
        }
      } else if (typingState.current.mode === 'display') {
        typingState.current.displayCycles++;
        
        // Add some glitch effect to HIRLY while displaying
        if (typingState.current.displayCycles % 10 === 0) {
          typingState.current.hirlyPositions.forEach(position => {
            if (letters.current[position] && letters.current[position].isHirly) {
              letters.current[position].color = getHirlyColor();
            }
          });
          drawLetters();
        }
        
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
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle greeting message changes
  useEffect(() => {
    if (greetingMessage) {
      greetingState.current.message = greetingMessage;
      greetingState.current.displayState = 'typing';
      greetingState.current.currentIndex = 0;
      greetingState.current.opacity = 1;
      greetingState.current.positions = calculateGreetingPositions();
      lastTypingTime.current = Date.now();
    } else if (greetingState.current.displayState !== 'hidden') {
      greetingState.current.displayState = 'fading';
    }
  }, [greetingMessage]);

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
    opacity: 0.4, // Increased opacity to make HIRLY more visible
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