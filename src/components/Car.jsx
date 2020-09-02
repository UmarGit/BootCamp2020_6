import React from "react";
import useWebAnimations, {bounce} from "@wellyshen/use-web-animations";

var flag = true;
var accelerate = 20
var time = 1000
var brake = 100

function Car({launch, left, up, right, down, jump}) {

  var object = {}

  if(left){
    object = {
        keyframes: {
            transform: [ 'translate(-100px,-' + accelerate + 'px)' ],
        },
        timing: {
            duration: time,
            iterations: 1,
            fill: 'forwards',
            easing: "ease-in-out",
        },
        onReady: ({ playState, animate, animation }) => {
          getAnimation().pause();
        },
        onUpdate: ({ playState, animate, animation }) => {
        },
        onFinish: ({ playState, animate, animation }) => {
            getAnimation().pause();
        },
      }
    flag = true
  }
  else{
    if(up){
        if(accelerate < 220){
            accelerate += 1
              object = {
                keyframes: [
                    { transform: 'translateY(-' + accelerate + 'px)' },
                  ],
                timing: {
                    duration: time,
                    iterations: 1,
                    fill: 'forwards',
                    easing: "ease-in-out",
                },
                onReady: ({ playState, animate, animation }) => {
                  getAnimation().pause();
                },
                onUpdate: ({ playState, animate, animation }) => {
                },
                onFinish: ({ playState, animate, animation }) => {
                    getAnimation().pause();
                },
              }
            flag = true
            brake -= 1
        }
    }
    else{
        if(right){
            object = {
                keyframes: {
                    transform: [ 'translate(100px,-' + accelerate + 'px)' ]
                },
                timing: {
                    duration: time,
                    iterations: 1,
                    fill: 'forwards',
                    easing: "ease-in-out",
                },
                onReady: ({ playState, animate, animation }) => {
                  getAnimation().pause();
                },
                onUpdate: ({ playState, animate, animation }) => {
                },
                onFinish: ({ playState, animate, animation }) => {
                    getAnimation().pause();
                },
              }
            flag = true
        }
        else{
            if(down){
                if(brake < 220){
                    brake += 1
                    object = {
                        keyframes: [
                            { transform: 'translateY(' + ((accelerate - 1)) + 'px)' },
                        ],
                        timing: {
                            duration: time,
                            iterations: 1,
                            fill: 'forwards',
                            easing: "ease-in-out",
                        },
                        onReady: ({ playState, animate, animation }) => {
                          getAnimation().pause();
                        },
                        onUpdate: ({ playState, animate, animation }) => {
                        },
                        onFinish: ({ playState, animate, animation }) => {
                            getAnimation().pause();
                        },
                      }
                    flag = true
                    accelerate = 0
                }
            }
            else{
                if(jump === 'jump'){
                    object = {...bounce}
                  }
                  else{
                    object = {
                        keyframes: [
                            { transform: 'translateY(-0px)' },
                          ],
                        timing: {
                            duration: time,
                            iterations: 1,
                            fill: 'forwards',
                            easing: "ease-in-out",
                        },
                        onReady: ({ playState, animate, animation }) => {
                          getAnimation().pause();
                        },
                        onUpdate: ({ playState, animate, animation }) => {
                        },
                        onFinish: ({ playState, animate, animation }) => {
                            getAnimation().pause();
                        },
                      }
                  }
            }
        }
    }
  }

  const { ref, getAnimation } = useWebAnimations(object);

  if(launch && flag){
      getAnimation().play();
      flag = false;
  }

  return (
    <img className="car" ref={ref} src={require('../assets/car.png')} width="100" alt="car"/>
  );
};

export default Car;