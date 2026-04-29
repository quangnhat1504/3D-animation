"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import ParallaxText from "./ParallaxText";
import { ANCSoundWaves, LeaderLines, RimLightSweep, AIPulseRing } from "./Effects";

const FRAME_COUNT = 240;
const FRAME_PREFIX = "ezgif-frame-";
const FRAME_EXTENSION = ".jpg";

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Framer Motion scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `/sequence/${FRAME_PREFIX}${paddedIndex}${FRAME_EXTENSION}`;
        
        await new Promise<void>((resolve) => {
          img.onload = () => {
            resolve();
          };
          img.onerror = () => {
            // Failsafe for missing images
            resolve();
          };
        });
        loadedImages.push(img);
      }

      setImages(loadedImages);
      setLoaded(true);

      // Draw the first frame and sample edge pixel
      if (loadedImages.length > 0 && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const firstImage = loadedImages[0];
        
        // Match canvas size to window/image ratio
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        if (ctx) {
          drawCover(ctx, firstImage, canvas.width, canvas.height);
          
          // Sample the top-left pixel to dynamically set background color
          try {
            const pixelData = ctx.getImageData(0, 0, 1, 1).data;
            const hexColor = `#${((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + pixelData[2]).toString(16).slice(1)}`;
            document.documentElement.style.setProperty("--color-background", hexColor);
            document.body.style.backgroundColor = hexColor;
          } catch (e) {
            console.error("Could not sample pixel color due to CORS or other error", e);
          }
        }
      }
    };

    loadImages();

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current || !images.length) return;
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const currentFrame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(frameIndex.get()) - 1));
        drawCover(ctx, images[currentFrame], canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  // Update canvas on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!loaded || !canvasRef.current || images.length === 0) return;
    
    const index = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(latest) - 1));
    const image = images[index];
    
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawCover(ctx, image, canvas.width, canvas.height);
      }
    }
  });

  // Helper function to draw image with object-fit: cover behavior
  const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
    // Clear canvas
    ctx.clearRect(0, 0, w, h);
    
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    
    let drawWidth = w;
    let drawHeight = h;
    let offsetX = 0;
    let offsetY = 0;
    
    if (imgRatio > canvasRatio) {
      drawWidth = h * imgRatio;
      offsetX = (w - drawWidth) / 2;
    } else {
      drawHeight = w / imgRatio;
      offsetY = (h - drawHeight) / 2;
    }
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading overlay */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="text-white font-medium text-xl tracking-widest animate-pulse">
              LOADING SEQUENCE...
            </div>
          </div>
        )}
        
        <canvas 
          ref={canvasRef} 
          className="h-full w-full object-cover"
        />
        
        {/* Chặng 1: The Core of Silence (ANC) */}
        <ANCSoundWaves scrollYProgress={smoothProgress} startRange={0.05} endRange={0.25} />
        <ParallaxText 
          scrollYProgress={smoothProgress}
          text="The Core of Silence"
          subtext="Hệ thống 4 micro chuyên dụng triệt tiêu tiếng ồn môi trường lên đến 40dB, mang lại không gian tĩnh lặng tuyệt đối."
          startRange={0.05}
          endRange={0.25}
          alignment="left"
        />
        
        {/* Chặng 2: Acoustic Precision (Driver Exploded View) */}
        <LeaderLines scrollYProgress={smoothProgress} startRange={0.30} endRange={0.55} />
        <ParallaxText 
          scrollYProgress={smoothProgress}
          text="Acoustic Precision"
          subtext="Màng loa phủ Beryllium siêu nhẹ và cứng cáp, tái tạo dải âm High-fidelity với độ méo tiếng gần như bằng không."
          startRange={0.30}
          endRange={0.55}
          alignment="right"
        />
        
        {/* Chặng 3: Tactile Luxury (Material / Macro) */}
        <RimLightSweep scrollYProgress={smoothProgress} startRange={0.60} endRange={0.75} />
        <ParallaxText 
          scrollYProgress={smoothProgress}
          text="Tactile Luxury"
          subtext="Sự kết hợp hoàn hảo giữa nhôm phay xước cao cấp và lớp phủ chống bám vân tay, mang lại cảm giác cầm nắm sang trọng."
          startRange={0.60}
          endRange={0.75}
          alignment="bottom-center"
          fontWeight="thin"
        />
        
        {/* Chặng 4: Seamless Logic (Connectivity) */}
        <AIPulseRing scrollYProgress={smoothProgress} startRange={0.80} endRange={0.95} />
        <ParallaxText 
          scrollYProgress={smoothProgress}
          text="Seamless Logic"
          subtext="Công nghệ Bluetooth 5.4 kết hợp thuật toán tối ưu hóa độ trễ, đảm bảo sự đồng bộ hoàn hảo giữa âm thanh và hình ảnh."
          startRange={0.80}
          endRange={0.95}
          alignment="center"
        />
      </div>
    </div>
  );
}
