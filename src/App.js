import React, {useState} from "react";
import useWebAnimations from "@wellyshen/use-web-animations";
import Car from './components/Car'
import NavBar from './components/NavBar'
import RoadStripe from './components/RoadStripe'
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import useSound from 'use-sound';
import start from './assets/start.mp3'
import run from './assets/run.mp3'
import brake from './assets/brake.mp3'
import jumpy from './assets/jumpy.mp3'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

var flag = true

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const [launch, setlaunch] = useState(null)
  const [left, setleft] = useState(null)
  const [up, setup] = useState(null)
  const [right, setright] = useState(null)
  const [down, setdown] = useState(null)
  const [jump, setjump] = useState(null)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const [playStart] = useSound(start);

  const [playRun, { stop }] = useSound(run, {
    volume: 0.1,
  })

  const [playBrake] = useSound(brake, {
    volume: 0.1,
  })

  const [playjumpy] = useSound(jumpy)

  const { ref, getAnimation } = useWebAnimations({
    keyframes: {
      fontSize: [0],
      transform: ['scale(1,1)']
    },
    timing: {
      delay: 800,
      duration: 1500, // Run for 1000ms
      iterations: 1, // Repeat once
      fill: 'forwards',
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


  return (
      <div className="container" tabIndex="0" onMouseOver={()=>{
        if(flag){
          handleToggle()
          setTimeout(
            ()=>{
              handleClose()
            }, 100000)
        }
        flag = false
      }} onKeyDown={event=>{
        switch (event.keyCode) {
          case 37:
            stop()
            playRun()
            setleft('left')
            setTimeout(
              ()=>{
                setleft(null)
              }, 1000)
            break;
          case 38:
            stop()
            playRun()
            setup('up')
            setTimeout(
              ()=>{
                setup(null)
              }, 1000)
            break;
          case 39:
            stop()
            playRun()
            setright('right')
            setTimeout(
              ()=>{
                setright(null)
              }, 1000)
            break;
          case 40:
            stop()
            playBrake()
            setdown('down')
            setTimeout(
              ()=>{
                setdown(null)
              }, 1000)
            break;
          case 32:
            stop()
            playjumpy()
            setjump('jump')
            setTimeout(
              ()=>{
                setjump(null)
              }, 1000)
            break;    
          default:
            break;
        }
      }}>
        <Backdrop className={classes.backdrop} open={open}>
          <div className="wait">
            <CircularProgress color="inherit" />
            <br/>
            Please Wait To Load Images Correctly For Best User Experience.....
            <br/>
            <br/>
            Tip: You can use Up, Down, Left, Right and SpaceBar Keys.......
            <br/>
            <br/>
            Tip: Please Press One key at a time and not hold them, only just tap.......
            <br/>
            <br/>
            Tip: This app is only for demo purposes only.......
            <br/>
            <br/>
            Tip: Best Regards: UmarGit
          </div>
        </Backdrop>
        <NavBar/>
        <div className="hero">
          <Paper elevation={16} className="innerMain">
            <div className="controls">
              <Fab color={up ? 'secondary' : 'primary'} aria-label="add">
                UP
              </Fab>
              <Fab color={down ? 'secondary' : 'primary'} aria-label="add">
                DN
              </Fab>
              <Fab color={left ? 'secondary' : 'primary'} aria-label="add">
                LT
              </Fab>
              <Fab color={right ? 'secondary' : 'primary'} aria-label="add">
                RT
              </Fab>
              <Fab color={jump ? 'secondary' : 'primary'} aria-label="add">
                JM
              </Fab>
            </div>
            <Paper elevation={16} className="inner" ref={ref}>
              <Car launch={launch} left={left} up={up} right={right} down={down} jump={jump}/>
              <RoadStripe  launchx={up} launchy={down} brakex={left} brakey={right}/>
            </Paper>
          </Paper>
          <div className="outer">
            <div className="outerdeep">
              <p onMouseOver={()=>{
                  if(flag){
                    handleToggle()
                    setTimeout(
                      ()=>{
                        handleClose()
                      }, 100000)
                  }
                  flag = false
                }}
                onClick={event=>{
                setlaunch('true')
                playStart()
                getAnimation().play();
                event.target.style.display = 'none';
              }}>START{launch}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;