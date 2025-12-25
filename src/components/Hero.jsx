import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
	const videoRef = useRef();

	const isMobile = useMediaQuery({ maxWidth: 767 });

	useGSAP(() => {
		const heroSplit = new SplitText(".title", {
			type: "chars, words",
		});

		const paragraphSplit = new SplitText(".subtitle", {
			type: "lines",
		});

		// Apply text-gradient class once before animating
		heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

		gsap.from(heroSplit.chars, {
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
		});

		gsap.from(paragraphSplit.lines, {
			opacity: 0,
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
			delay: 1,
		});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#hero",
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			})
			.to(".right-leaf", { y: 200 }, 0)
			.to(".left-leaf", { y: -200 }, 0)
			.to(".arrow", { y: 100 }, 0);

		const startValue = isMobile ? "top 60%" : "center 70%";
		const endValue = isMobile ? "80% top" : "65% top";




		videoRef.current.onloadedmetadata = () => {
			const video = videoRef.current;
			video.pause();
			video.currentTime = 0;

			ScrollTrigger.create({
				trigger: "video",
				start: startValue,
				end: endValue,
				pin: true,
				scrub: 0.4,
				onUpdate: (self) => {
					const targetTime = self.progress * video.duration;

					// Smooth interpolation (kills freezing)
					video.currentTime += (targetTime - video.currentTime) * 0.22;

				},
			});
		};

	}, []);

	return (
		<>
			<video
	ref={videoRef}
	muted
	autoPlay
	loop
	playsInline
	preload="auto"
	src="/videos/output.mp4"
	className="w-[120%] h-full object-cover"
	style={{
		willChange: "transform",
		transform: "translateZ(0)",
	}}
/>

		</>
	);
};

export default Hero;