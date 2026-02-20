import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

interface FadeUpProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    duration?: number;
    yOffset?: number;
}

const FadeUp = forwardRef<HTMLDivElement, FadeUpProps>(
    ({ children, delay = 0, duration = 0.5, yOffset = 20, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: yOffset }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    duration,
                    delay,
                    ease: [0.25, 0.1, 0.25, 1], // Custom Bézier curve for premium feel
                }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

FadeUp.displayName = 'FadeUp';
export default FadeUp;
