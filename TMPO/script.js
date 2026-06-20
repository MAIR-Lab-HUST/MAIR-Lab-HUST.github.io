const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-preview");
  });
}

const revealSelectors = [
  ".hero-copy h1",
  ".authors",
  ".affiliations",
  ".author-notes",
  ".action-row",
  ".abstract-block",
  ".tldr-card",
  ".section-title",
  ".method-steps article",
  ".tree-stage",
  ".distribution-stage",
  ".legend-strip",
  ".results-summary",
  ".mini-result",
  ".metric-list li",
  ".outcome-grid .tile",
  ".chart-card",
  ".citation-side-card",
  ".bibtex-card"
];

const motionItems = document.querySelectorAll(revealSelectors.join(","));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (motionItems.length && !prefersReducedMotion.matches) {
  document.documentElement.classList.add("motion-ready");

  motionItems.forEach((item, index) => {
    item.classList.add("motion-item");
    item.style.setProperty("--motion-delay", `${Math.min(index * 55, 420)}ms`);
    item.addEventListener(
      "transitionend",
      () => {
        item.style.removeProperty("--motion-delay");
      },
      { once: true }
    );
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.16
    }
  );

  motionItems.forEach((item) => revealObserver.observe(item));
}

const getGridRows = (elements) => {
  const gridItems = Array.from(elements);
  const rowMap = new Map();

  gridItems.forEach((element) => {
    const bounds = element.getBoundingClientRect();
    const rowKey = Math.round(bounds.top + bounds.height / 2);
    const row = rowMap.get(rowKey) || [];
    row.push(element);
    rowMap.set(rowKey, row);
  });

  const rows = [...rowMap.values()];

  return {
    even: rows.filter((_, index) => index % 2 === 0).flat(),
    odd: rows.filter((_, index) => index % 2 === 1).flat()
  };
};

const initNexusGridBackground = () => {
  const canvas = document.getElementById("nexus-grid-canvas");
  const intro = document.querySelector(".scroll-universe-intro");

  if (!canvas || !intro) return;

  const ctx = canvas.getContext("2d", { alpha: false });

  if (!ctx) return;

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let width = 1;
  let height = 1;
  let dpr = 1;
  let particles = [];
  let frameId = 0;
  let startTime = performance.now();

  /* ---- Deterministic hash-based noise for organic landmass shapes ---- */
  const hash = (x, y) => {
    let h = (x | 0) * 374761393 + (y | 0) * 668265263;
    h = (h ^ (h >> 13)) * 1274126177;
    return ((h ^ (h >> 16)) >>> 0) / 0xffffffff;
  };

  const smoothNoise = (px, py, scale) => {
    const sx = px / scale;
    const sy = py / scale;
    const ix = Math.floor(sx);
    const iy = Math.floor(sy);
    const fx = sx - ix;
    const fy = sy - iy;
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);
    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);
    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
  };

  const fractalNoise = (px, py, scale, octaves) => {
    let value = 0, amplitude = 1, frequency = 1, max = 0;
    for (let i = 0; i < octaves; i++) {
      value += smoothNoise(px, py, scale / frequency) * amplitude;
      max += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value / max;
  };

  /* ---- Build grid particles ---- */
  const buildParticles = () => {
    const isSmall = width < 720;
    const gap = isSmall ? 12 : 15;
    const baseDot = isSmall ? 9 : 12;
    const cols = Math.ceil(width / gap) + 6;
    const rows = Math.ceil(height / gap) + 6;
    const originX = (width - (cols - 1) * gap) / 2;
    const originY = (height - (rows - 1) * gap) / 2;
    const cx = width / 2;
    const cy = height * 0.44;

    particles = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const px = originX + c * gap;
        const py = originY + r * gap;

        /* normalised distance from text center */
        const dx = (px - cx) / (width * 0.48);
        const dy = (py - cy) / (height * 0.42);
        const dist = Math.sqrt(dx * dx + dy * dy);

        /* noise layers for organic shape */
        const n1 = fractalNoise(px + 137, py + 241, 200, 4);
        const n2 = fractalNoise(px + 823, py + 519, 110, 3);
        const n3 = fractalNoise(px + 1900, py + 670, 60, 2);
        const noiseVal = n1 * 0.52 + n2 * 0.32 + n3 * 0.16;

        /* vignette: clear center for text, fade at far edges */
        const centerClear = Math.max(0, 1 - Math.exp(-dist * dist * 1.6));
        const edgeFade = 1 - Math.pow(Math.max(0, (dist - 1.6)) * 1.8, 2);
        if (edgeFade <= 0) continue;

        const visibility = noiseVal * centerClear * Math.max(0, edgeFade);

        /* threshold – skip low-visibility dots to create landmass gaps */
        if (visibility < 0.06) continue;

        const sizeScale = 0.45 + Math.min(visibility, 1) * 0.65;
        const size = baseDot * sizeScale;
        const brightness = Math.min(1, visibility * 2.0);
        const phase = hash(c * 17 + 3, r * 31 + 7) * Math.PI * 2;

        particles.push({
          x: px,
          y: py,
          size,
          brightness,
          phase,
          depth: centerClear
        });
      }
    }
  };

  /* ---- Flowing trajectory trails ---- */
  let trails = [];
  const NUM_TRAILS = 12;

  const buildTrails = () => {
    trails = [];
    for (let i = 0; i < NUM_TRAILS; i++) {
      const direction = hash(i * 101 + 33, i * 107 + 37) > 0.5 ? 1 : -1;
      trails.push({
        y: height * (0.04 + hash(i * 47 + 3, i * 83 + 7) * 0.92),
        speed: 0.04 + hash(i * 13 + 5, i * 29 + 11) * 0.06,
        spread: 35 + hash(i * 71 + 9, i * 53 + 13) * 65,
        trailLen: width * (0.18 + hash(i * 91 + 15, i * 37 + 17) * 0.28),
        phase: hash(i * 61 + 19, i * 97 + 23) * 30,
        wavePhase: hash(i * 43 + 39, i * 47 + 41) * Math.PI * 2,
        waveLength: width * (0.26 + hash(i * 113 + 45, i * 127 + 51) * 0.28),
        waveAmp: height * (0.025 + hash(i * 131 + 57, i * 149 + 63) * 0.055),
        waveSpeed: direction * (0.75 + hash(i * 151 + 69, i * 163 + 75) * 0.85),
        bend: 0.45 + hash(i * 167 + 81, i * 173 + 87) * 0.45,
        intensity: 0.7 + hash(i * 31 + 27, i * 43 + 31) * 0.3
      });
    }
  };

  const getTrailWaveY = (tr, x, time) => {
    const primary = (x / tr.waveLength) * Math.PI * 2 + time * tr.waveSpeed + tr.wavePhase;
    const secondary = primary * 0.52 + time * tr.waveSpeed * 0.62 + tr.phase;
    return tr.y + Math.sin(primary) * tr.waveAmp + Math.sin(secondary) * tr.waveAmp * tr.bend;
  };

  /* ---- Resize handler ---- */
  const resize = () => {
    const rect = intro.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles();
    buildTrails();
  };

  /* ---- Render loop ---- */
  const draw = (now) => {
    const time = (now - startTime) * 0.001;

    /* smooth pointer interpolation */
    pointer.x += (pointer.tx - pointer.x) * 0.07;
    pointer.y += (pointer.ty - pointer.y) * 0.07;

    /* dark base fill */
    ctx.fillStyle = "#050608";
    ctx.fillRect(0, 0, width, height);

    /* subtle radial glow behind text area */
    const glow = ctx.createRadialGradient(
      width * 0.5, height * 0.43, 0,
      width * 0.5, height * 0.43, Math.max(width, height) * 0.42
    );
    glow.addColorStop(0, "rgba(16, 18, 22, 1)");
    glow.addColorStop(0.55, "rgba(8, 9, 12, 1)");
    glow.addColorStop(1, "rgba(4, 5, 7, 1)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    /* pre-compute trail head positions for this frame */
    const totalSpan = width * 1.5;
    const trailHeads = new Array(NUM_TRAILS);
    for (let t = 0; t < NUM_TRAILS; t++) {
      const tr = trails[t];
      const progress = ((time * tr.speed + tr.phase) % 1.4) / 1.4;
      trailHeads[t] = -width * 0.15 + progress * totalSpan;
    }

    /* draw square dot-matrix particles */
    const len = particles.length;
    for (let i = 0; i < len; i++) {
      const p = particles[i];

      /* slow breathing pulse */
      const pulse = 0.68 + 0.32 * Math.sin(time * 0.45 + p.phase);

      /* pointer-reactive drift */
      const depthDrift = p.depth * 20;
      const cameraDriftX = pointer.x * 8;
      const cameraDriftY = pointer.y * 5;
      const driftX = cameraDriftX + pointer.x * depthDrift;
      const driftY = cameraDriftY + pointer.y * depthDrift * 0.72;

      /* subtle wave motion */
      const waveX = Math.sin(time * 0.1 + p.y * 0.004 + p.phase) * 1.4;
      const waveY = Math.cos(time * 0.08 + p.x * 0.003 + p.phase) * 1.0;

      const x = p.x + driftX + waveX;
      const y = p.y + driftY + waveY;

      /* --- trail boost: flowing left-to-right light-up --- */
      let trailBoost = 0;
      for (let t = 0; t < NUM_TRAILS; t++) {
        const tr = trails[t];
        const waveY = getTrailWaveY(tr, p.x, time);
        const yDist = Math.abs(p.y - waveY);
        if (yDist > tr.spread) continue;

        const yFactor = 1 - (yDist / tr.spread);
        const headX = trailHeads[t];
        const xDelta = headX - p.x;

        /* particle must be behind the trail head and within trail length */
        if (xDelta > 0 && xDelta < tr.trailLen) {
          const xFactor = Math.pow(1 - xDelta / tr.trailLen, 2.0);
          const crest = 0.72 + 0.28 * Math.sin((p.x / tr.waveLength) * Math.PI * 4 + time * tr.waveSpeed * 1.35 + tr.wavePhase);
          const boost = yFactor * yFactor * xFactor * crest * tr.intensity;
          if (boost > trailBoost) trailBoost = boost;
        }
      }

      /* base colour values – brighter, approaching white at peak */
      const baseTone = Math.round(155 + p.brightness * 90 * pulse);
      const baseAlpha = p.brightness * pulse * 0.95;

      /* apply trail boost – push toward pure white */
      const tone = Math.min(255, Math.round(baseTone + trailBoost * (255 - baseTone)));
      const alpha = Math.min(1, baseAlpha + trailBoost * (1 - baseAlpha));
      const size = p.size * (0.9 + pulse * 0.14 + trailBoost * 0.22);

      ctx.fillStyle = `rgba(${tone}, ${tone}, ${tone}, ${alpha})`;
      ctx.fillRect(x - size * 0.5, y - size * 0.5, size, size);
    }

    if (!prefersReducedMotion.matches && document.visibilityState === "visible") {
      frameId = requestAnimationFrame(draw);
    }
  };

  /* ---- Pointer tracking ---- */
  const updatePointer = (event) => {
    const rect = intro.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    pointer.tx = ((clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.ty = ((clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const resetPointer = () => {
    pointer.tx = 0;
    pointer.ty = 0;
  };

  resize();
  draw(startTime);

  window.addEventListener("resize", resize);
  intro.addEventListener("pointermove", updatePointer);
  intro.addEventListener("pointerleave", resetPointer);
  intro.addEventListener("touchmove", updatePointer, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !prefersReducedMotion.matches) {
      cancelAnimationFrame(frameId);
      startTime = performance.now();
      frameId = requestAnimationFrame(draw);
    }
  });
};

initNexusGridBackground();

const navLinks = [...document.querySelectorAll(".paper-nav a")];
const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (navLinks.length && sectionTargets.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sectionTargets.forEach((section) => activeObserver.observe(section));
}

const qualitativeComparisonCard = document.querySelector(".qualitative-comparison-card");

if (qualitativeComparisonCard) {
  qualitativeComparisonCard.classList.add("is-visible");
}

const emergingRows = document.querySelectorAll(".emerging-row");

if (emergingRows.length) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const vertexShaderSource = `
    attribute vec2 aPosition;
    varying vec2 vUv;

    void main() {
      vUv = aPosition;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    uniform sampler2D uTexture;
    uniform vec2 uTextureSize;
    uniform vec2 uElementSize;
    uniform vec3 uFillColor;
    uniform float uProgress;
    varying vec2 vUv;

    float mapRange(float value, float min1, float max1, float min2, float max2) {
      float p = clamp((value - min1) / (max1 - min1), 0.0, 1.0);
      return min2 + (max2 - min2) * p;
    }

    float variationFivePixelRatio(float progress) {
      float indexProgress = floor(clamp(progress, 0.0, 0.999) * 36.0);
      float ratio = 0.01;
      if (indexProgress >= 1.0) ratio = 0.015;
      if (indexProgress >= 2.0) ratio = 0.02;
      if (indexProgress >= 3.0) ratio = 0.025;
      if (indexProgress >= 4.0) ratio = 0.03;
      if (indexProgress >= 5.0) ratio = 0.01;
      if (indexProgress >= 6.0) ratio = 0.015;
      if (indexProgress >= 7.0) ratio = 0.02;
      if (indexProgress >= 8.0) ratio = 0.025;
      if (indexProgress >= 9.0) ratio = 0.03;
      if (indexProgress >= 10.0) ratio = 0.035;
      if (indexProgress >= 11.0) ratio = 0.04;
      if (indexProgress >= 12.0) ratio = 0.02;
      if (indexProgress >= 13.0) ratio = 0.025;
      if (indexProgress >= 14.0) ratio = 0.03;
      if (indexProgress >= 15.0) ratio = 0.035;
      if (indexProgress >= 16.0) ratio = 0.04;
      if (indexProgress >= 17.0) ratio = 0.045;
      if (indexProgress >= 18.0) ratio = 0.05;
      if (indexProgress >= 19.0) ratio = 0.055;
      if (indexProgress >= 20.0) ratio = 0.06;
      if (indexProgress >= 21.0) ratio = 0.03;
      if (indexProgress >= 22.0) ratio = 0.035;
      if (indexProgress >= 23.0) ratio = 0.04;
      if (indexProgress >= 24.0) ratio = 0.045;
      if (indexProgress >= 25.0) ratio = 0.05;
      if (indexProgress >= 26.0) ratio = 0.055;
      if (indexProgress >= 27.0) ratio = 0.06;
      if (indexProgress >= 28.0) ratio = 0.065;
      if (indexProgress >= 29.0) ratio = 0.07;
      if (indexProgress >= 30.0) ratio = 0.075;
      if (indexProgress >= 31.0) ratio = 0.08;
      if (indexProgress >= 32.0) ratio = 0.085;
      if (indexProgress >= 33.0) ratio = 0.09;
      if (indexProgress >= 34.0) ratio = 0.2;
      if (indexProgress >= 35.0) ratio = 1.0;
      return ratio;
    }

    vec2 coverUv(vec2 uv) {
      uv.y = 1.0 - uv.y;
      vec2 centered = uv - vec2(0.5);
      float imageAspect = uTextureSize.x / uTextureSize.y;
      float elementAspect = uElementSize.x / uElementSize.y;

      if (imageAspect > elementAspect) {
        centered.x *= elementAspect / imageAspect;
      } else {
        centered.y *= imageAspect / elementAspect;
      }

      return centered + vec2(0.5);
    }

    void main() {
      vec2 uv = coverUv(vUv);
      float imageAspect = uTextureSize.x / uTextureSize.y;
      float pixellation = floor(max(1.0, uElementSize.x * variationFivePixelRatio(uProgress)));
      vec2 gridSize = vec2(pixellation, max(1.0, floor(pixellation / imageAspect)));
      vec2 pixelUv = floor(uv * gridSize) / gridSize + 0.5 / gridSize;
      gl_FragColor = texture2D(uTexture, pixelUv);
    }
  `;

  const compileShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || "Unable to compile WebGL shader.");
    }

    return shader;
  };

  const createProgram = (gl) => {
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Unable to link WebGL program.");
    }

    return program;
  };

  const createEmergingWebGL = (tile) => {
    // Return null to disable WebGL on tiles, preventing WebGL context exhaustion (16 limit)
    // which was killing the nexus-grid-canvas background context.
    return null;
    const image = tile.querySelector("img");
    if (!image) return null;

    image.loading = "eager";
    image.decoding = "async";

    const canvas = document.createElement("canvas");
    canvas.className = "emerge-canvas";
    tile.appendChild(canvas);
    tile.classList.add("canvas-emerge-ready");

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) {
      tile.classList.remove("canvas-emerge-ready");
      canvas.remove();
      return null;
    }

    let program;
    try {
      program = createProgram(gl);
    } catch (error) {
      console.warn("WebGL emerging image shader failed; falling back to static image.", error);
      tile.classList.remove("canvas-emerge-ready");
      canvas.remove();
      return null;
    }
    const fillColor = tile.closest(".flow-strip") ? [0.7, 0.35, 0.14] : [0.25, 0.247, 0.718];
    let animationFrame = 0;
    let currentProgress = 0;
    let textureUploaded = false;
    let playStarted = false;
    let activeReveal = false;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);

    const locations = {
      position: gl.getAttribLocation(program, "aPosition"),
      texture: gl.getUniformLocation(program, "uTexture"),
      textureSize: gl.getUniformLocation(program, "uTextureSize"),
      elementSize: gl.getUniformLocation(program, "uElementSize"),
      fillColor: gl.getUniformLocation(program, "uFillColor"),
      progress: gl.getUniformLocation(program, "uProgress")
    };

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const resize = () => {
      const rect = tile.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      return rect;
    };

    const uploadTexture = () => {
      if (!image.complete || !image.naturalWidth) return false;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      textureUploaded = true;
      return true;
    };

    const draw = (progress) => {
      currentProgress = clamp(progress, 0, 1);
      const rect = resize();
      const width = rect.width;
      const height = rect.height;
      if (!width || !height) return;
      if (!textureUploaded && !uploadTexture()) return;

      if (activeReveal || currentProgress > 0.01) {
        tile.classList.add("webgl-emerge-ready");
      } else {
        tile.classList.remove("webgl-emerge-ready");
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(locations.position);
      gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(locations.texture, 0);
      gl.uniform2f(locations.textureSize, image.naturalWidth, image.naturalHeight);
      gl.uniform2f(locations.elementSize, width, height);
      gl.uniform3f(locations.fillColor, fillColor[0], fillColor[1], fillColor[2]);
      gl.uniform1f(locations.progress, currentProgress);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const imageReady = () => {
      if (image.complete && image.naturalWidth) return Promise.resolve();

      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    };

    const play = (delay = 0) => {
      if (playStarted) return;
      playStarted = true;
      const duration = 1500;

      imageReady().then(() => {
        window.setTimeout(() => {
          activeReveal = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = clamp((now - start) / duration, 0, 1);
            draw(progress);
            if (progress < 1) {
              animationFrame = requestAnimationFrame(tick);
            } else {
              activeReveal = false;
              draw(1);
            }
          };
          animationFrame = requestAnimationFrame(tick);
        }, delay);
      });
    };

    const destroy = () => cancelAnimationFrame(animationFrame);
    const setProgress = (progress) => draw(progress);
    const drawInitialFrame = () => draw(currentProgress);

    if (image.complete && image.naturalWidth) {
      drawInitialFrame();
    } else {
      image.addEventListener("load", drawInitialFrame, { once: true });
    }

    image.decode?.().catch(() => null).finally(drawInitialFrame);
    window.addEventListener("resize", drawInitialFrame);

    return { tile, play, setProgress, destroy };
  };

  const tileAnimations = [...document.querySelectorAll(".emerge-tile")]
    .map(createEmergingWebGL)
    .filter(Boolean);

  const showAllEmergingRows = () => {
    tileAnimations.forEach((animation, index) => {
      const rowIndex = Math.floor(index / 6);
      const tileIndex = index % 3;
      animation.play(rowIndex * 220 + tileIndex * 70);
    });
  };

  let scrollRaf = 0;
  const updateEmergingProgress = () => {
    scrollRaf = 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    tileAnimations.forEach((animation, index) => {
      const row = animation.tile.closest(".comparison-row");
      if (!row) return;

      const tileIndex = index % 3;
      const rect = row.getBoundingClientRect();
      const rowProgress = clamp((viewportHeight * 0.92 - rect.top) / (viewportHeight * 0.56), 0, 1);
      const staggeredProgress = clamp((rowProgress - tileIndex * 0.055) / 0.88, 0, 1);
      animation.setProgress(staggeredProgress);
    });
  };

  const requestEmergingProgressUpdate = () => {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(updateEmergingProgress);
  };

  window.addEventListener("scroll", requestEmergingProgressUpdate, { passive: true });
  window.addEventListener("resize", requestEmergingProgressUpdate);
  window.addEventListener("load", requestEmergingProgressUpdate, { once: true });
  requestEmergingProgressUpdate();

  if ("IntersectionObserver" in window) {
    const comparisonObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          showAllEmergingRows();
          comparisonObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.08
      }
    );

    comparisonObserver.observe(qualitativeComparisonCard || emergingRows[0]);
  } else {
    showAllEmergingRows();
  }
}

const bibtex = document.querySelector("#bibtex");

if (bibtex) {
  bibtex.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(bibtex.textContent.trim());
      bibtex.parentElement.dataset.copied = "true";
      window.setTimeout(() => {
        delete bibtex.parentElement.dataset.copied;
      }, 1200);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(bibtex);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
}
