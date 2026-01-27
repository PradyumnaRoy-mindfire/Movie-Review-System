// import { motion } from "motion/react";
import { motion } from "framer-motion";


const StaggeredLetterAnimation = ({children}) => {
    const letters = Array.from(children);

    const containerVariants = {
        hidden : {opacity: 0},
        visible : {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.075
            }
        }
    }

    const letterVariants = {
        hidden : {opacity: 0},
        visible : {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    }
    return (
        <>
           <motion.div 
            variants={containerVariants}
            initial="hidden" 
            animate="visible">
                {letters.map((letter, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block">
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))} 
            </motion.div>
        </>
    );
};

export default StaggeredLetterAnimation;