import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const component = useRef(null);

  const slider = useRef(null);
  const horizontalTrigger = useRef(null);
  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      /* ===============================
         VIDEO: play while scrolling,
         pause exactly when scroll stops
      =============================== */
      let isPlaying = false;
      let pauseTimeout;

      ScrollTrigger.create({
        trigger: videoSectionRef.current,
        start: "top bottom",
        end: "bottom top",

        onUpdate: (self) => {
          const video = videoRef.current;
          if (!video) return;

          const velocity = Math.abs(self.getVelocity());

          if (velocity > 5) {
            // user is scrolling
            clearTimeout(pauseTimeout);

            if (!isPlaying) {
              video.play().catch(() => {});
              isPlaying = true;
            }

            // pause only AFTER scrolling fully stops
            pauseTimeout = setTimeout(() => {
              video.pause();
              isPlaying = false;
            }, 120);
          }
        },
      });

      /* ===============================
         HORIZONTAL SCROLL (UNCHANGED)
      =============================== */
      const scrollWidth = slider.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollAmount = scrollWidth - windowWidth;

      if (scrollAmount > 0) {
        gsap.to(slider.current, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalTrigger.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, component);

    return () => ctx.revert();
  }, [imagesLoaded]);

  return (
    <div ref={component} className="overflow-x-hidden bg-[#111] text-white">
      {/* VIDEO SECTION */}
      <section
        ref={videoSectionRef}
        className="h-screen relative flex items-center justify-center"
      >
        <h1 className="text-5xl z-10 font-bold">CanGOLF</h1>

        <video
          ref={videoRef}
          src="/videos/input.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* HORIZONTAL SCROLL */}
      <section
        ref={horizontalTrigger}
        className="h-screen overflow-hidden bg-[#111]"
      >
        <div
          ref={slider}
          className="flex flex-nowrap h-full items-center w-max px-[10vw] gap-[5vw]"
        >
          <div className="w-[80vw] md:w-[40vw] flex-shrink-0 text-[#b9b3a9]">
            <h2 className="text-4xl md:text-6xl font-bold">Simulators</h2>
            <p className="mt-4 opacity-70">
              Keep scrolling to see all images →
            </p>
          </div>

          {["5207262", "3371358", "3618545"].map((id) => (
            <div
              key={id}
              className="w-[80vw] md:w-[600px] h-[70vh] flex-shrink-0"
            >
              <img
                onLoad={handleImageLoad}
                src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`}
                className="w-full h-full object-cover shadow-2xl"
                alt=""
              />
            </div>
          ))}
        </div>
      </section>

      {/* OUTRO */}
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-5xl font-bold text-[#f1dba7]">Fin.</h2>
      </section>
    </div>
  );
}
