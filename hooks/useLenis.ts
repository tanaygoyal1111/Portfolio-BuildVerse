import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function useLenisSetup() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      // Cinematic easing — slow out, zero overshoot
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Keep ScrollTrigger in sync
    lenis.on('scroll', () => ScrollTrigger.update());

    // GSAP ticker drives Lenis RAF
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Expose on window for external access (e.g. components that need to stop scroll)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as unknown as Record<string, unknown>).lenis;
    };
  }, []);
}
