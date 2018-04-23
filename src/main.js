/*
Ludum Dare 41
-------------

Game jam project for Ludum Dare 41, built on the theme of Combine 2 Incompatible
Genres.

(Shaun A. Noordin | shaunanoordin.com | 20180421)

--------------------------------------------------------------------------------
 */

import * as APP from "./constants.js";  //Naming note: all caps.
import { Utility, ImageAsset } from "./utility.js";

const GAME_STATE = {
  STARTING: "loading_resources_and_getting_ready_to_start",
  READY: "ready_and_waiting_for_user_input",
  ACTIVE: "active_and_receiving_user_input",
  BUSY: "processing_events_and_not_receiving_user_input",
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
      autoFitEverything: true, //Ludum Dare 41
      //autoFitCanvas: false,
    };    
    this.html = {
      app: document.getElementById("app"),
      canvas: document.getElementById("canvas"),
      controls: document.getElementById("controls"),
      message: document.getElementById("message"),
      orders: document.getElementById("orders"),
    };
    this.context2d = this.html.canvas.getContext("2d");
    this.boundingBox = null;  //To be defined by this.updateSize().
    this.canvasSizeRatio = 1;
    this.canvasWidth = this.html.canvas.width;  //The intended width/height of the canvas.
    this.canvasHeight = this.html.canvas.height;
    this.state = GAME_STATE.STARTING;
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
    this.COLOURS = {
      DEFAULT: "#666",
      READY: "#999",
      ACTIVE: "#666",
      ACTIVE_STRONG: "#333",
      BUSY: "#ccc",
      HIGHLIGHT_WEAK: "#ccc",
      HIGHLIGHT_STRONG: "#fff",
    };
    //--------------------------------
    
    //Game Objects
    //--------------------------------
    this.assets = {
      images: {}
    };
    this.assetsLoaded = 0;
    this.assetsTotal = 0;
    
    this.assets.images.ingredients = new ImageAsset("assets/ingredients.png");
    
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
    this.GRID_OFFSET_X = 0;
    this.GRID_OFFSET_Y = 64;
    
    this.grid = [];
    for (let row = -1; row < this.GRID_ROWS; row++) {
      for (let col = 0; col < this.GRID_COLS; col++) {
        this.grid.push({
          row, col,
          value: this.TILES.random(),
          isDropping: false,
        });
      }
    }
    
    this.lineOfSelectedTiles = [];
    
    //Tracks when tiles drop.
    this.dropTilesNow = false;
    this.dropDistance = 0;
    this.dropSpeed = 1;  //Drop speed changes depending on the height of the line of selected tiles.
    this.DROP_SPEED_FACTOR = 4;
    
    this.score = 0;
    this.message = "";
    this.messageTimer = 0;
    this.DEFAULT_MESSAGE_TIME = 2 * APP.FRAMES_PER_SECOND;
    this.FOOD_ORDER_COUNT = 3;
    this.INGREDIENTS_PER_ORDER = 3;
    this.BAD_ORDER_PENALTY = 3;  //If player creates a dish nobody asked for, add a penalty.
    this.MAKE_SCORE_LOOK_BIG_FACTOR = 100;
    this.foodOrders = [];
    this.fillFoodOrders();
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
    const lineOfSelectedTiles = this.lineOfSelectedTiles;
    
    //Check if all assets are ready.
    if (this.state === GAME_STATE.STARTING) {
      this.assetsLoaded = 0;
      this.assetsTotal = 0;
      for (let category in this.assets) {
        for (let asset in this.assets[category]) {
          this.assetsTotal++;
          if (this.assets[category][asset].loaded) this.assetsLoaded++;
        }
      }
      if (this.assetsLoaded < this.assetsTotal) {
        this.html.message.textContent = "Starting...";
        return;
      }
      
      this.state = GAME_STATE.READY;

    //Check if user has touched/clicked on a tile and is starting to draw a line.
    } else if (this.state === GAME_STATE.READY) {
      
      //If a tile is touched/clicked on, start the line drawing!
      const selectedTile = this.getSelectedTile();
      if (selectedTile) {  //If there's a touched tile, it implies this.pointer.state === APP.INPUT_ACTIVE.
        this.state = GAME_STATE.ACTIVE;
        lineOfSelectedTiles.push(selectedTile);
      }
      
    } else if (this.state === GAME_STATE.ACTIVE) {
      
      const selectedTile = this.getSelectedTile();
      
      //If a tile is touched, checked if it's a "valid" tile to add to the line of tiles.
      //A tile is valid only if it's not already in the line of tiles, and it's adjacent to the "head" of the line.
      if (selectedTile && lineOfSelectedTiles.length > 0) {
        const headTile = lineOfSelectedTiles[lineOfSelectedTiles.length-1];
        const prevHeadTile = (lineOfSelectedTiles.length > 1)
          ? lineOfSelectedTiles[lineOfSelectedTiles.length-2] : null;
        let tileIsValid = !this.lineOfSelectedTiles.find((tile) => {
          return tile.row === selectedTile.row && tile.col === selectedTile.col
        });
        
        tileIsValid = tileIsValid && (
          (headTile.row === selectedTile.row + 1 && headTile.col === selectedTile.col) ||
          (headTile.row === selectedTile.row - 1 && headTile.col === selectedTile.col) ||
          (headTile.row === selectedTile.row && headTile.col === selectedTile.col + 1) ||
          (headTile.row === selectedTile.row && headTile.col === selectedTile.col - 1)
        );
    
        //If the tile is valid it, add it to the line 
        if (tileIsValid) {
          lineOfSelectedTiles.push(selectedTile);
        }
        
        //Alternatively, the user might be trying to "walk back" the line.
        if (prevHeadTile && selectedTile.row === prevHeadTile.row && selectedTile.col === prevHeadTile.col) {
          lineOfSelectedTiles.pop();
        }
      }

      //If user has stopped drawing a line of tiles, let's process it.      
      if (this.pointer.state === APP.INPUT_ENDED || this.pointer.state === APP.INPUT_IDLE) {
        if (lineOfSelectedTiles.length >= this.MINIMUM_LINE_LENGTH) {
          //OK, there's a valid line. Pass it to the "busy state" logic to process it.
          this.state = GAME_STATE.BUSY;
        } else {
          //If there's no valid line, just reset the input.
          this.lineOfSelectedTiles = [];      
          this.state = GAME_STATE.READY;
        }
      }
      
    } else if (this.state === GAME_STATE.BUSY) {
      
      //If user has just finished drawing a valid line - process it now.
      if (lineOfSelectedTiles.length > 0) {
        this.scoreSelectedTiles();
        
        //Clear the line of selected tiles.
        const uniqueRows = [];  //The height of the line is used to determine the drop speed.
        lineOfSelectedTiles.map((selectedTile) => {
          this.grid.map((tile) => {
            if (tile.row === selectedTile.row && tile.col === selectedTile.col) {
              //If it's a selected tile, empty it. The this.dropTiles() will later do the dropping.
              tile.value = this.TILES.EMPTY;
              //Keep track of the height of the line.
              if (!uniqueRows.includes(tile.row)) { uniqueRows.push(tile.row); }
            }
          });
        });
        this.lineOfSelectedTiles = [];
        this.dropSpeed = Math.max(1, Math.sqrt(uniqueRows.length)) * this.DROP_SPEED_FACTOR;
      }
      
      //If there are any empty tiles, drop the tiles down!
      const doneDropping = this.dropTiles();
      
      //Otherwise, it's all good, now let users continue playing.
      if (doneDropping) {
        this.state = GAME_STATE.READY;
      }
    }
    //--------------------------------
    
    this.paint();
  }
  
  //----------------------------------------------------------------
  
  /*  Drops all tiles.
      Returns true if there's nothing else to drop, false otherwise.
   */
  dropTiles() {
    //If we're in drop mode, drop every falling tile by the drop speed.
    //Once the drop distance reaches (or exceeds) the point where the falling
    //tiles reach the next row below it (where the empty tiles are), overwrite
    //the empty tiles with the falling tiles. Copy a new grid, to be safe.
    //Also, don't forget to refresh the buffer above the grid.
    
    if (this.dropTilesNow) {
      this.dropDistance += this.dropSpeed;
      
      if (this.dropDistance > this.TILE_SIZE) {
        const newGrid = this.grid.map((tile) => {
          const tileAbove = this.grid.find((ta) => {
            return ta.row === tile.row - 1 && ta.col === tile.col;
          });
          
          if (tileAbove && tileAbove.isDropping) {  //If it's an empty tile receiving a falling tile, overwrite it.
            return {
              row: tile.row,
              col: tile.col,
              value: tileAbove.value,
              isDropping: false,
            };
          } else if (!tileAbove) {  //If it's a tile in the buffer row, refresh it.
            return {
              row: tile.row,
              col: tile.col,
              value: this.TILES.random(),
              isDropping: false,
            }
          } else {  //Otherwise, keep the tile.
            return {
              row: tile.row,
              col: tile.col,
              value: tile.value,
              isDropping: false,
            };
          }
        });
        this.grid = newGrid;
        
        this.dropDistance = 0;
        this.dropTilesNow = false;  //OK, stop dropping.
      }
    }
    
    //Now check if we need to continue dropping.
    //For each tile, check if there's an empty tile below it. If there is, mark
    //the tile as a falling tile.

    let doneDropping = true;
    this.grid.map((tile) => {
      const tileBelow = this.grid.find((tb) => {
        return tb.row === tile.row + 1 && tb.col === tile.col;
      });
    if (tileBelow && (tileBelow.value === this.TILES.EMPTY || tileBelow.isDropping)) {
        tile.isDropping = true;
        this.dropTilesNow = true;
        doneDropping = false;  //Gotta keep dropping!
      }
    });

    return doneDropping;
  }
  
  /*  Adds a temporary message.
   */
  addMessage(message) {
    this.message = message;
    this.messageTimer = this.DEFAULT_MESSAGE_TIME;
  }
  
  /*  Get all the ingredients in the line of selected tiles, and cook 'em for a
      score!
   */
  scoreSelectedTiles() {
    if (this.lineOfSelectedTiles.length < this.MINIMUM_LINE_LENGTH) return;
  
    //First figure out the unique ingredients from the line of selected tiles.
    const uniqueIngredients = {};
    this.lineOfSelectedTiles.map((tile) => {
      const ingval = tile.value.toString();
      if (!uniqueIngredients[ingval]) {
        uniqueIngredients[ingval] = 1;
      } else {
        uniqueIngredients[ingval]++;
      }
    });
    
    //For each available food order, check if the unique ingredients match all
    //the ingredients of the food order.
    let score = 0;
    this.foodOrders = this.foodOrders.filter((foodOrder) => {

      //Check 1: does each (unique) selected ingredient have a corresponding
      //ingredient in the food order recipe?
      let selectedIngredientsOK = true;
      Object.keys(uniqueIngredients).map((ingval) => {
        selectedIngredientsOK =
          selectedIngredientsOK &&
          foodOrder.ingredients.includes(ingval);
      });
      
      //Check 2: does each ingredient in the food order recipe appear in the
      //list of selected ingredients?
      let foodOrderIngredientsOK = true;
      foodOrder.ingredients.map((ingval) => {
        foodOrderIngredientsOK =
          foodOrderIngredientsOK &&
          uniqueIngredients[ingval] > 0
      });
      
      const selectedIngredientsMatchOrder = selectedIngredientsOK && foodOrderIngredientsOK;
      
      //If we get a match, increase the score and remove the food order from the list.
      if (selectedIngredientsMatchOrder) {
        score += this.lineOfSelectedTiles.length;
        return false;  //Remove from the list.
      } else {
        return true;  //Keep the food order on the list.
      }
    });
    
    //Update the score!
    //If the user made any sort of good match - matching selected ingredients
    //to any food order's ingredients - add to the score.
    //If the user selected ingredients and cooked a meal that nobody wanted, add
    //a penalty to the score.
    score *= this.MAKE_SCORE_LOOK_BIG_FACTOR;
    if (score > 0) {
      this.addMessage("+" + score + " points!");
    } else {
      score = this.lineOfSelectedTiles.length * -this.BAD_ORDER_PENALTY * this.MAKE_SCORE_LOOK_BIG_FACTOR;
      this.addMessage("Bad recipe! " + score + " points...");
    }
    this.score += score;
    
    //OK, if there are any empty slots for new food orders, let's fill 'em up!
    this.fillFoodOrders();
  }
  
  /*  Adds food orders.
   */
  fillFoodOrders() {
    while (this.foodOrders.length < this.FOOD_ORDER_COUNT) {
      const ingredients = [];
      while (ingredients.length < this.INGREDIENTS_PER_ORDER) {
        const ingval = this.TILES.random().toString();
        if (!ingredients.includes(ingval)) ingredients.push(ingval);
      }
      
      let newFoodOrder = { ingredients: ingredients.sort() };
      this.foodOrders.push(newFoodOrder);
    }
    
    //Reset displayed orders, then fill it up again.
    while (this.html.orders.firstChild) this.html.orders.removeChild(this.html.orders.firstChild);
    this.foodOrders.map((foodOrder) => {
      const htmlFoodOrder = document.createElement("li");
      foodOrder.ingredients.map((ingval) => {
        const htmlIngredient = document.createElement("span");
        htmlIngredient.className = "ingredient ingredient-" + ingval;
        htmlFoodOrder.appendChild(htmlIngredient);
      });
      
      this.html.orders.appendChild(htmlFoodOrder);
    });
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
      case GAME_STATE.READY: c2d.strokeStyle = this.COLOURS.READY; break;
      case GAME_STATE.ACTIVE:
        c2d.strokeStyle = (this.lineOfSelectedTiles.length < this.MINIMUM_LINE_LENGTH)
          ? this.COLOURS.ACTIVE : this.COLOURS.ACTIVE_STRONG;
        break;
      case GAME_STATE.BUSY: c2d.strokeStyle = this.COLOURS.BUSY; break;
      default: c2d.strokeStyle = this.COLOURS.DEFAULT;
    }
    c2d.stroke();
    //--------------------------------
    
    //Paint the line of selected tiles (background)
    //--------------------------------
    c2d.beginPath();
    this.lineOfSelectedTiles.map((tile) => {
      c2d.rect(
        this.GRID_OFFSET_X + tile.col * this.TILE_SIZE,
        this.GRID_OFFSET_Y + tile.row * this.TILE_SIZE,
        this.TILE_SIZE, this.TILE_SIZE
      );
    });    
    c2d.closePath();
    c2d.fillStyle = (this.lineOfSelectedTiles.length < this.MINIMUM_LINE_LENGTH)
      ? this.COLOURS.ACTIVE : this.COLOURS.ACTIVE_STRONG;
    c2d.fill();
    //--------------------------------
    
    //Paint the tiles
    //--------------------------------
    this.paint_tiles(this.grid);
    //--------------------------------
    
    //Paint the line of selected tiles (overlay line)
    //--------------------------------
    c2d.beginPath();
    this.lineOfSelectedTiles.map((tile, index) => {
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
    c2d.strokeStyle = (this.lineOfSelectedTiles.length < this.MINIMUM_LINE_LENGTH)
      ? this.COLOURS.HIGHLIGHT_WEAK : this.COLOURS.HIGHLIGHT_STRONG;
    c2d.stroke();
    //--------------------------------
    
    //Show score, or a message if there's one.
    //--------------------------------
    if (this.message.length > 0 && this.messageTimer > 0) {
      this.messageTimer--;
      this.html.message.textContent = this.message;
      if (this.messageTimer === 0) this.message = "";
    } else {
      this.html.message.textContent = this.score;
    }
    //--------------------------------
  }
  
  paint_tiles(grid = []) {
    let c2d = this.context2d;
    
    grid.map((tile) => {
      if (tile.value === this.TILES.EMPTY) return;  //Don't draw empty tiles.
      if (tile.row === -1 && !tile.isDropping) return;  //Don't draw the buffer row if it isn't dropping.
      
      //If the tile is dropping, it has a y-offset.
      const offsetY = (tile.isDropping)
        ? this.dropDistance : 0;
      
      c2d.beginPath();
      c2d.arc(
        tile.col * this.TILE_SIZE + this.TILE_SIZE / 2 + this.GRID_OFFSET_X,
        tile.row * this.TILE_SIZE + this.TILE_SIZE / 2 + this.GRID_OFFSET_Y + offsetY,
        this.TILE_SIZE * 0.1, 0, 2 * Math.PI);
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
      
      
      //Paint the tiles
      const PNG_TILE_SIZE = 32;
      const srcX = tile.value * PNG_TILE_SIZE;
      const srcY = 0;
      const srcW = PNG_TILE_SIZE;
      const srcH = PNG_TILE_SIZE;
      const tgtX = tile.col * this.TILE_SIZE + this.GRID_OFFSET_X;
      const tgtY = tile.row * this.TILE_SIZE + this.GRID_OFFSET_Y + offsetY;
      const tgtW = this.TILE_SIZE;
      const tgtH = this.TILE_SIZE;
      
      c2d.drawImage(this.assets.images.ingredients.img, srcX, srcY, srcW, srcH, tgtX, tgtY, tgtW, tgtH);
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

  getSelectedTile() {
    //Sanity check: can't get the selected tile if nothing is touched/clicked on.
    if (this.pointer.state !== APP.INPUT_ACTIVE) return null;

    const col = Math.floor((this.pointer.now.x - this.GRID_OFFSET_X) / this.TILE_SIZE);
    const row = Math.floor((this.pointer.now.y - this.GRID_OFFSET_Y) / this.TILE_SIZE);
    
    //Sanity check: make sure we're within bounds.
    if (col < 0 || col >= this.GRID_COLS || row < 0 || row >= this.GRID_ROWS) {
      return null;
    }
    
    const selectedTile = this.grid.find((tile) => {
      return (tile.col === col && tile.row === row)
    });
    
    //return { col, row, value };
    return selectedTile;
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
    /*
    if (this.config.autoFitCanvas) {
      const bestFit = Math.min(
        this.html.app.offsetWidth / this.canvasWidth,
        this.html.app.offsetHeight / this.canvasHeight
      );
      
      this.html.canvas.style =
        "width: " + Math.round(bestFit * this.canvasWidth) + "px; " +
        "height: " + Math.round(bestFit * this.canvasHeight) + "px; ";
    }*/
    
    //Ludum Dare 41
    if (this.config.autoFitEverything) {
      const appWidth = parseInt(this.html.app.dataset.width);
      const appHeight = parseInt(this.html.app.dataset.height);
      const appFontSize = parseInt(this.html.app.dataset.fontSize)
      
      const bestFit = Math.min(
        window.innerWidth / appWidth,
        window.innerHeight / appHeight
      );
      
      this.html.app.style =
        "width: " + Math.round(bestFit * appWidth) + "px; " +
        "height: " + Math.round(bestFit * appHeight) + "px; ";
      this.html.canvas.style =
        "width: " + Math.round(bestFit * this.canvasWidth) + "px; " +
        "height: " + Math.round(bestFit * this.canvasHeight) + "px; ";
      this.html.controls.style =
        "font-size: " + Math.round(bestFit * appFontSize) + "px";
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
