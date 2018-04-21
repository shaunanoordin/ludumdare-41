/*
Ludum Dare 41
-------------

Game jam project for Ludum Dare 41, built on the theme of Combine 2 Incompatible
Genres.

(Shaun A. Noordin | shaunanoordin.com | 20180421)

--------------------------------------------------------------------------------
 */

import * as APP from "./constants.js";  //Naming note: all caps.
import { Utility } from "./utility.js";

/*  Primary App Class
 */
//==============================================================================
class App {
  constructor() {
    //Initialise properties
    //--------------------------------
    this.config = {
      framesPerSecond: APP.FRAMES_PER_SECOND,
      debugMode: false,
      autoFitCanvas: true,
    };    
    this.html = {
      app: document.getElementById("app"),
      canvas: document.getElementById("canvas"),
    };
    this.context2d = this.html.canvas.getContext("2d");
    this.boundingBox = null;  //To be defined by this.updateSize().
    this.canvasSizeRatio = 1;
    this.canvasWidth = this.html.canvas.width;  //The intended width/height of the canvas.
    this.canvasHeight = this.html.canvas.height;
    this.state = null;
    //--------------------------------
    
    //Account for graphical settings
    //--------------------------------
    this.context2d.mozImageSmoothingEnabled = false;
    this.context2d.msImageSmoothingEnabled = false;
    this.context2d.imageSmoothingEnabled = false;
    //--------------------------------
    
    //Initialise Game Objects
    //--------------------------------
    this.assets = {
      images: {}
    };
    this.assetsLoaded = 0;
    this.assetsTotal = 0;
    
    this.TILE = {
      EMPTY: 0,
      RED: 1,
      BLUE: 2,
      YELLOW: 3,
      GREEN: 4,
      PINK: 5,
      ORANGE: 6,
      random: () => {
        return Math.floor(Math.random() * 6 + 1);
      },
    };
    this.TILE_SIZE = 64;  //Pixel width and height
    this.GRID_ROWS = 6;
    this.GRID_COLS = 6;
    this.GRID_OFFSET_X = 64;
    this.GRID_OFFSET_Y = 64;
    
    this.grid = [];
    for (let row = 0; row < this.GRID_ROWS; row++) {
      this.grid.push([]);
      for (let col = 0; col < this.GRID_COLS; col++) {
        this.grid[row].push(this.TILE.random());
      }
    }
    //--------------------------------
    
    //Prepare Input
    //--------------------------------
    this.keys = new Array(APP.MAX_KEYS);
    for (let i = 0; i < this.keys.length; i++) {
      this.keys[i] = {
        state: APP.INPUT_IDLE,
        duration: 0
      };
    }
    this.pointer = {
      start: { x: 0, y: 0 },
      now: { x: 0, y: 0 },
      state: APP.INPUT_IDLE,
      duration: 0
    };
    //--------------------------------
    
    //Bind Events
    //--------------------------------
    if ("onmousedown" in this.html.canvas && "onmousemove" in this.html.canvas &&
        "onmouseup" in this.html.canvas) {
      this.html.canvas.onmousedown = this.onPointerStart.bind(this);
      this.html.canvas.onmousemove = this.onPointerMove.bind(this);
      this.html.canvas.onmouseup = this.onPointerEnd.bind(this);
    }    
    if ("ontouchstart" in this.html.canvas && "ontouchmove" in this.html.canvas &&
        "ontouchend" in this.html.canvas && "ontouchcancel" in this.html.canvas) {
      this.html.canvas.ontouchstart = this.onPointerStart.bind(this);
      this.html.canvas.ontouchmove = this.onPointerMove.bind(this);
      this.html.canvas.ontouchend = this.onPointerEnd.bind(this);
      this.html.canvas.ontouchcancel = this.onPointerEnd.bind(this);
    }
    if ("onkeydown" in window && "onkeyup" in window) {
      window.onkeydown = this.onKeyDown.bind(this);
      window.onkeyup = this.onKeyUp.bind(this);
    }
    if ("onresize" in window) {
      window.onresize = this.updateSize.bind(this);
    }
    this.updateSize();
    //--------------------------------
    
    //Start!
    //--------------------------------
    this.runCycle = setInterval(this.run.bind(this), 1000 / this.config.framesPerSecond);
    //--------------------------------
  }
  
  //----------------------------------------------------------------
  
  run() {
    this.paint();
  }
  
  //----------------------------------------------------------------
  
  paint() {
    let c2d = this.context2d;
    
    //Clear
    c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    //Paint the grid
    c2d.beginPath();
    c2d.lineWidth = "2";
    c2d.strokeStyle = "#ccc";
    c2d.rect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let row = 0; row < this.GRID_ROWS; row++) {
      for (let col = 0; col < this.GRID_COLS; col++) {
        c2d.rect(
          this.GRID_OFFSET_X + col * this.TILE_SIZE,
          this.GRID_OFFSET_Y + row * this.TILE_SIZE,
          this.TILE_SIZE, this.TILE_SIZE
        );
      }
    }
    c2d.stroke();
    c2d.closePath();

  }
  
  //----------------------------------------------------------------
  
  onPointerStart(e) {
    this.pointer.state = APP.INPUT_ACTIVE;
    this.pointer.duration = 1;
    this.pointer.start = this.getPointerXY(e);
    this.pointer.now = this.pointer.start;
    return Utility.stopEvent(e);
  }
  
  onPointerMove(e) {
    if (this.pointer.state === APP.INPUT_ACTIVE) {
      this.pointer.now = this.getPointerXY(e);
    }
    return Utility.stopEvent(e);
  }
  
  onPointerEnd(e) {
    this.pointer.state = APP.INPUT_ENDED;
    //this.pointer.now = this.getPointerXY(e);
    return Utility.stopEvent(e);
  }
  
  getPointerXY(e) {
    let clientX = 0;
    let clientY = 0;
    if (e.clientX && e.clientY) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches.length > 0 && e.touches[0].clientX &&
        e.touches[0].clientY) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    let inputX = (clientX - this.boundingBox.left) * this.canvasSizeRatio;
    let inputY = (clientY - this.boundingBox.top) * this.canvasSizeRatio;
    return { x: inputX, y: inputY };
  }
  
  //----------------------------------------------------------------
  
  onKeyDown(e) {
    let keyCode = Utility.getKeyCode(e);
    if (keyCode > 0 && keyCode < APP.MAX_KEYS && this.keys[keyCode].state != APP.INPUT_ACTIVE) {
      this.keys[keyCode].state = APP.INPUT_ACTIVE;
      this.keys[keyCode].duration = 1;
    }  //if keyCode == 0, there's an error.
  }
  
  onKeyUp(e) {
    let keyCode = Utility.getKeyCode(e);    
    if (keyCode > 0 && keyCode < APP.MAX_KEYS) {
      this.keys[keyCode].state = APP.INPUT_ENDED;
    }  //if keyCode == 0, there's an error.
  }
  
  //----------------------------------------------------------------
  
  updateSize() {
    if (this.config.autoFitCanvas) {
      const bestFit = Math.min(
        this.html.app.offsetWidth / this.canvasWidth,
        this.html.app.offsetHeight / this.canvasHeight
      );
      
      this.html.canvas.style =
        "width: " + Math.round(bestFit * this.canvasWidth) + "px; " +
        "height: " + Math.round(bestFit * this.canvasHeight) + "px; ";
    }
    
    let boundingBox = (this.html.canvas.getBoundingClientRect)
      ? this.html.canvas.getBoundingClientRect()
      : { left: 0, top: 0 };
    this.boundingBox = boundingBox;
    this.canvasSizeRatio = Math.min(
      this.canvasWidth / this.boundingBox.width,
      this.canvasHeight / this.boundingBox.height
    );
  }
  
}
//==============================================================================

/*  Initialisations
 */
//==============================================================================
var app;
window.onload = function() {
  window.app = new App();
};
//==============================================================================
