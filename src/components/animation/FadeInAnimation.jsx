import React from 'react';
import { motion, scale } from "motion/react"

const FadeInAnimation = ({children,type}) => {
    let motionConfig = {}
    if(type === "movieDetails"){
        let variants = {
            hidden: { opacity: 0 ,translateY: 50 },
            visible: { opacity: 1 , translateY: 0 },
        }
        motionConfig = {
            variants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.5 },
            transition: { duration: 0.8, ease: "easeInOut" },
        }
    }
    else if(type === "movieVideos"){ 
        let variants = {
            hidden: { opacity: 0 ,translateY: 50 ,scale:0 },
            visible: { opacity: 1 , translateY: 0 ,scale:1 },
        }
        motionConfig = {
            variants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: false, amount: 0.5 },
            transition: { duration: 0.5, ease: "easeInOut" },
        }
    }
  return (
        <>
            <motion.div {...motionConfig}>
                {children}
            </motion.div>
        </>
    );
}

export default FadeInAnimation