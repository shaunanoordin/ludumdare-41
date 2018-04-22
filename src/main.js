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

const GAME_STATE = {
  READY: 'ready_and_waiting_for_user_input',
  ACTIVE: 'active_and_receiving_user_input',
  BUSY: 'processing_events_and_not_receiving_user_input',
};

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
    this.state = GAME_STATE.READY;
    //--------------------------------
    
    //Account for graphical settings
    //--------------------------------
    this.context2d.mozImageSmoothingEnabled = false;
    this.context2d.msImageSmoothingEnabled = false;
    this.context2d.imageSmoothingEnabled = false;
    //--------------------------------
    
    //Game Constants
    //--------------------------------
    this.MINIMUM_LINE_LENGTH = 3;
    //--------------------------------
    
    //Game Objects
    //--------------------------------
    this.assets = {
      images: {}
    };
    this.assetsLoaded = 0;
    this.assetsTotal = 0;
    
    this.TILES = {
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
    this.GRID_OFFSET_X = 128;
    this.GRID_OFFSET_Y = 64;
    
    this.grid = [];
    for (let row = 0; row < this.GRID_ROWS; row++) {
      for (let col = 0; col < this.GRID_COLS; col++) {
        this.grid.push({
          row, col,
          value: this.TILES.random()
        });
      }
    }
    
    this.lineOfTouchedTiles = [];
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
    
    //--------------------------------
    const lineOfTouchedTiles = this.lineOfTouchedTiles;
    
    //Check if user has touched a tile and is starting to draw a line.
    if (this.state === GAME_STATE.READY) {
      
      //If a tile is touched, start the line drawing!
      const touchedTile = this.getTouchedTile();
      if (touchedTile) {  //If there's a touched tile, it implies this.pointer.state === APP.INPUT_ACTIVE.
        this.state = GAME_STATE.ACTIVE;
        lineOfTouchedTiles.push(touchedTile);
      }
      
    } else if (this.state === GAME_STATE.ACTIVE) {
      
      const touchedTile = this.getTouchedTile();
      
      //If a tile is touched, checked if it's a "valid" tile to add to the line of tiles.
      //A tile is valid only if it's not already in the line of tiles, and it's adjacent to the "head" of the line.
      if (touchedTile && lineOfTouchedTiles.length > 0) {
        const headTile = lineOfTouchedTiles[lineOfTouchedTiles.length-1];
        const prevHeadTile = (lineOfTouchedTiles.length > 1)
          ? lineOfTouchedTiles[lineOfTouchedTiles.length-2] : null;
        let tileIsValid = !this.lineOfTouchedTiles.find((tile) => {
          return tile.row === touchedTile.row && tile.col === touchedTile.col
        });
        
        tileIsValid = tileIsValid && (
          (headTile.row === touchedTile.row + 1 && headTile.col === touchedTile.col) ||
          (headTile.row === touchedTile.row - 1 && headTile.col === touchedTile.col) ||
          (headTile.row === touchedTile.row && headTile.col === touchedTile.col + 1) ||
          (headTile.row === touchedTile.row && headTile.col === touchedTile.col - 1)
        );
    
        //If the tile is valid it, add it to the line 
        if (tileIsValid) {
          lineOfTouchedTiles.push(touchedTile);
        }
        
        //Alternatively, the user might be trying to "walk back" the line.
        if (prevHeadTile && touchedTile.row === prevHeadTile.row && touchedTile.col === prevHeadTile.col) {
          lineOfTouchedTiles.pop();
        }
      }
      
      if (this.pointer.state === APP.INPUT_ENDED || this.pointer.state === APP.INPUT_IDLE) {
        if (lineOfTouchedTiles.length >= this.MINIMUM_LINE_LENGTH) {
          //SUCCESS
          this.state = GAME_STATE.BUSY;
        } else {
          //DON'T DO ANYTHING
          
          //Reset
          this.lineOfTouchedTiles = [];      
          this.state = GAME_STATE.READY;
        }
      }
      
    } else if (this.state === GAME_STATE.BUSY) {
      
      console.log('--------');
      
      //User has just finished drawing a valid line - process it now.
      if (this.lineOfTouchedTiles.length > 0) {
        console.log(this.lineOfTouchedTiles);
        
        //Clear the line of touched tiles.
        this.lineOfTouchedTiles = [];
        
      } else {
        
        //All done, now let's 
        this.state = GAME_STATE.READY;
        
      }
      
      
      
    }
    //--------------------------------
    
    this.paint();
  }
  
  //----------------------------------------------------------------
  
  paint() {
    let c2d = this.context2d;
    
    //Clear
    c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    //Paint the grid
    //--------------------------------
    c2d.beginPath();
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
    c2d.closePath();
    c2d.lineWidth = "2";
    switch (this.state) {
      case GAME_STATE.READY: c2d.strokeStyle = "#ccc"; break;
      case GAME_STATE.ACTIVE:
        c2d.strokeStyle = (this.lineOfTouchedTiles.length < this.MINIMUM_LINE_LENGTH)
          ? "#ccc" : "#fff";
        break;
      case GAME_STATE.BUSY: c2d.strokeStyle = "#333"; break;
      default: c2d.strokeStyle = "#999";
    }
    c2d.stroke();
    //--------------------------------
    
    //Paint the line of touched tiles (background)
    //--------------------------------
    c2d.beginPath();
    this.lineOfTouchedTiles.map((tile) => {
      c2d.rect(
        this.GRID_OFFSET_X + tile.col * this.TILE_SIZE,
        this.GRID_OFFSET_Y + tile.row * this.TILE_SIZE,
        this.TILE_SIZE, this.TILE_SIZE
      );
    });    
    c2d.closePath();
    c2d.fillStyle = (this.lineOfTouchedTiles.length < this.MINIMUM_LINE_LENGTH)
      ? "#ccc" : "#fff";
    c2d.fill();
    //--------------------------------
    
    //Paint the tiles
    //--------------------------------
    this.paint_tiles(this.grid);
    //--------------------------------
    
    //Paint the line of touched tiles (overlay line)
    //--------------------------------
    c2d.beginPath();
    this.lineOfTouchedTiles.map((tile, index) => {
      if (index === 0) {
        c2d.moveTo(
          this.GRID_OFFSET_X + tile.col * this.TILE_SIZE + this.TILE_SIZE / 2,
          this.GRID_OFFSET_Y + tile.row * this.TILE_SIZE + this.TILE_SIZE / 2,
        );
      } else {
        c2d.lineTo(
          this.GRID_OFFSET_X + tile.col * this.TILE_SIZE + this.TILE_SIZE / 2,
          this.GRID_OFFSET_Y + tile.row * this.TILE_SIZE + this.TILE_SIZE / 2,
        );
      }
    });
    c2d.lineWidth = "8";
    c2d.lineCap = "round";
    c2d.lineJoin = "round";
    c2d.strokeStyle = (this.lineOfTouchedTiles.length < this.MINIMUM_LINE_LENGTH)
      ? "#999" : "#333";
    c2d.stroke();
    //--------------------------------
  }
  
  paint_tiles(grid = []) {
    let c2d = this.context2d;
    
    grid.map((tile) => {
      c2d.beginPath();
      c2d.arc(
        tile.col * this.TILE_SIZE + this.TILE_SIZE / 2 + this.GRID_OFFSET_X,
        tile.row * this.TILE_SIZE + this.TILE_SIZE / 2 + this.GRID_OFFSET_Y,
        this.TILE_SIZE * 0.4, 0, 2 * Math.PI);
      c2d.closePath();
      switch (tile.value) {
        case this.TILES.RED: c2d.fillStyle = "#c33"; break;
        case this.TILES.BLUE: c2d.fillStyle = "#39c"; break;
        case this.TILES.YELLOW: c2d.fillStyle = "#fc3"; break;
        case this.TILES.GREEN: c2d.fillStyle = "#396"; break;
        case this.TILES.PINK: c2d.fillStyle = "#f9c"; break;
        case this.TILES.ORANGE: c2d.fillStyle = "#c93"; break;
        default: c2d.fillStyle = "#333";
      }
      c2d.fill();
    });
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

  getTouchedTile() {
    //Sanity check: can't get the touched tile if nothing is touched.
    if (this.pointer.state !== APP.INPUT_ACTIVE) return null;

    const col = Math.floor((this.pointer.now.x - this.GRID_OFFSET_X) / this.TILE_SIZE);
    const row = Math.floor((this.pointer.now.y - this.GRID_OFFSET_Y) / this.TILE_SIZE);
    
    //Sanity check: make sure we're within bounds.
    if (col < 0 || col >= this.GRID_COLS || row < 0 || row >= this.GRID_ROWS) {
      return null;
    }
    
    const touchedTile = this.grid.find((tile) => {
      return (tile.col === col && tile.row === row)
    });
    
    //return { col, row, value };
    return touchedTile;
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
