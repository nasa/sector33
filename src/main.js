import { gsap } from "gsap";
gsap.registerPlugin();


console.log(gsap.version);



gsap.to('#box-green', {
    x: 400,
    y:-200,
    duration: 4,
    ease: "none"
});

