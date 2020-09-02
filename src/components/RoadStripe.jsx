import React from "react";
import useWebAnimations from "@wellyshen/use-web-animations";

function RoadStripe({launchx, launchy, brakex, brakey}) {
    const { ref, getAnimation } = useWebAnimations({
        keyframes: [
            { transform: 'translateY(-100px)' },
          ],
        timing: {
          delay: 500, // Start with a 500ms delay
          duration: 200, // Run for 1000ms
          iterations: 4, // Repeat once
          direction: "alternate", // Run the animation forwards and then backwards
          easing: "ease-in-out", // Use a fancy timing function
        },
        onReady: ({ playState, animate, animation }) => {
            getAnimation().pause();
        },
        onUpdate: ({ playState, animate, animation }) => {
          // Triggered when the animation enters the running state or changes state
        },
        onFinish: ({ playState, animate, animation }) => {
          // Triggered when the animation enters the finished state (Google Chrome: available in v84+)
        },
        // More useful options...
      });

    if(launchx){
       getAnimation().play();
    }
    else{
        if(launchy){
            getAnimation().play();
         }
         else{
            if(brakex){
                getAnimation().pause();
             }
             else{
                if(brakey){
                    getAnimation().pause();
                 }
             }
         }
    }

  return (
    <div className="roadStrip" ref={ref}></div>
  );
};

export default RoadStripe;