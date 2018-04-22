/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/*\r\nConstant Values\r\n---------------\r\n\r\n(Shaun A. Noordin || shaunanoordin.com || 20160901)\r\n--------------------------------------------------------------------------------\r\n */\n\nvar FRAMES_PER_SECOND = exports.FRAMES_PER_SECOND = 50;\nvar INPUT_IDLE = exports.INPUT_IDLE = 0;\nvar INPUT_ACTIVE = exports.INPUT_ACTIVE = 1;\nvar INPUT_ENDED = exports.INPUT_ENDED = 2;\nvar INPUT_DISTANCE_SENSITIVITY = exports.INPUT_DISTANCE_SENSITIVITY = 16;\nvar MAX_KEYS = exports.MAX_KEYS = 128;\n\nvar STATE_START = exports.STATE_START = 0; //AvO App states\nvar STATE_ACTION = exports.STATE_ACTION = 1;\nvar STATE_COMIC = exports.STATE_COMIC = 2;\nvar STATE_END = exports.STATE_END = 3;\n\nvar ACTOR_IDLE = exports.ACTOR_IDLE = 0; //Actor states\nvar ACTOR_MOVING = exports.ACTOR_MOVING = 1;\nvar ACTOR_ACTING = exports.ACTOR_ACTING = 2;\nvar ACTOR_REACTING = exports.ACTOR_REACTING = 3;\n\nvar MIN_Z_INDEX = exports.MIN_Z_INDEX = 0;\nvar DEFAULT_Z_INDEX = exports.DEFAULT_Z_INDEX = 1;\nvar MAX_Z_INDEX = exports.MAX_Z_INDEX = 2;\n\n//export const REF = {  //Standard References\n//  PLAYER: \"player\",  //DEPRECATED. Use AvO.playerActor instead.\n//};\n\nvar ACTION = exports.ACTION = { //Standard Actions\n  IDLE: \"idle\",\n  MOVING: \"moving\",\n  PRIMARY: \"primary\"\n};\n\nvar ATTR = exports.ATTR = { //Standard Attributes\n  SPEED: \"speed\"\n};\n\nvar ANIMATION_RULE_BASIC = exports.ANIMATION_RULE_BASIC = \"basic\";\nvar ANIMATION_RULE_DIRECTIONAL = exports.ANIMATION_RULE_DIRECTIONAL = \"directional\";\n\nvar SHAPE_NONE = exports.SHAPE_NONE = 0; //No shape = no collision\nvar SHAPE_SQUARE = exports.SHAPE_SQUARE = 1;\nvar SHAPE_CIRCLE = exports.SHAPE_CIRCLE = 2;\nvar SHAPE_POLYGON = exports.SHAPE_POLYGON = 3;\n\nvar ROTATION_EAST = exports.ROTATION_EAST = 0;\nvar ROTATION_SOUTH = exports.ROTATION_SOUTH = Math.PI * 0.5;\nvar ROTATION_WEST = exports.ROTATION_WEST = Math.PI;\nvar ROTATION_NORTH = exports.ROTATION_NORTH = Math.PI * -0.5;\n\nvar ROTATION_SOUTHEAST = exports.ROTATION_SOUTHEAST = Math.PI * 0.25;\nvar ROTATION_SOUTHWEST = exports.ROTATION_SOUTHWEST = Math.PI * 0.75;\nvar ROTATION_NORTHWEST = exports.ROTATION_NORTHWEST = Math.PI * -0.75;\nvar ROTATION_NORTHEAST = exports.ROTATION_NORTHEAST = Math.PI * -0.25;\n\nvar DIRECTION_EAST = exports.DIRECTION_EAST = 0;\nvar DIRECTION_SOUTH = exports.DIRECTION_SOUTH = 1;\nvar DIRECTION_WEST = exports.DIRECTION_WEST = 2;\nvar DIRECTION_NORTH = exports.DIRECTION_NORTH = 3;\n\nvar DURATION_INFINITE = exports.DURATION_INFINITE = 0;\n\nvar COMIC_STRIP_STATE_TRANSITIONING = exports.COMIC_STRIP_STATE_TRANSITIONING = 0;\nvar COMIC_STRIP_STATE_WAIT_BEFORE_INPUT = exports.COMIC_STRIP_STATE_WAIT_BEFORE_INPUT = 1;\nvar COMIC_STRIP_STATE_IDLE = exports.COMIC_STRIP_STATE_IDLE = 2;\n\nvar DEFAULT_FONT = exports.DEFAULT_FONT = \"32px monospace\";\nvar DEFAULT_COMIC_STRIP_WAIT_TIME_BEFORE_INPUT = exports.DEFAULT_COMIC_STRIP_WAIT_TIME_BEFORE_INPUT = 10;\nvar DEFAULT_COMIC_STRIP_TRANSITION_TIME = exports.DEFAULT_COMIC_STRIP_TRANSITION_TIME = 20;\n\nvar STACKING_RULE_ADD = exports.STACKING_RULE_ADD = 0;\nvar STACKING_RULE_REPLACE = exports.STACKING_RULE_REPLACE = 1;\n\nvar SHADOW_COLOUR = exports.SHADOW_COLOUR = \"rgba(0,0,0,0.5)\";\n\nvar KEY_CODES = exports.KEY_CODES = {\n  LEFT: 37,\n  UP: 38,\n  RIGHT: 39,\n  DOWN: 40,\n  ENTER: 13,\n  SPACE: 32,\n  ESCAPE: 27,\n  TAB: 9,\n  SHIFT: 16,\n\n  A: 65,\n  B: 66,\n  C: 67,\n  D: 68,\n  E: 69,\n  F: 70,\n  G: 71,\n  H: 72,\n  I: 73,\n  J: 74,\n  K: 75,\n  L: 76,\n  M: 77,\n  N: 78,\n  O: 79,\n  P: 80,\n  Q: 81,\n  R: 82,\n  S: 83,\n  T: 84,\n  U: 85,\n  V: 86,\n  W: 87,\n  X: 88,\n  Y: 89,\n  Z: 90,\n\n  NUM0: 48,\n  NUM1: 49,\n  NUM2: 50,\n  NUM3: 51,\n  NUM4: 52,\n  NUM5: 53,\n  NUM6: 54,\n  NUM7: 55,\n  NUM8: 56,\n  NUM9: 57\n};\n\nvar KEY_VALUES = exports.KEY_VALUES = {\n  \"ArrowLeft\": KEY_CODES.LEFT,\n  \"Left\": KEY_CODES.LEFT,\n  \"ArrowUp\": KEY_CODES.UP,\n  \"Up\": KEY_CODES.UP,\n  \"ArrowDown\": KEY_CODES.DOWN,\n  \"Down\": KEY_CODES.DOWN,\n  \"ArrowRight\": KEY_CODES.RIGHT,\n  \"Right\": KEY_CODES.RIGHT,\n  \"Enter\": KEY_CODES.ENTER,\n  \"Space\": KEY_CODES.SPACE,\n  \" \": KEY_CODES.SPACE,\n  \"Esc\": KEY_CODES.ESCAPE,\n  \"Escape\": KEY_CODES.ESCAPE,\n  \"Tab\": KEY_CODES.TAB,\n  \"Shift\": KEY_CODES.SHIFT,\n  \"ShiftLeft\": KEY_CODES.SHIFT,\n  \"ShiftRight\": KEY_CODES.SHIFT,\n\n  \"A\": KEY_CODES.A,\n  \"KeyA\": KEY_CODES.A,\n  \"B\": KEY_CODES.B,\n  \"KeyB\": KEY_CODES.B,\n  \"C\": KEY_CODES.C,\n  \"KeyC\": KEY_CODES.C,\n  \"D\": KEY_CODES.D,\n  \"KeyD\": KEY_CODES.D,\n  \"E\": KEY_CODES.E,\n  \"KeyE\": KEY_CODES.E,\n  \"F\": KEY_CODES.F,\n  \"KeyF\": KEY_CODES.F,\n  \"G\": KEY_CODES.G,\n  \"KeyG\": KEY_CODES.G,\n  \"H\": KEY_CODES.H,\n  \"KeyH\": KEY_CODES.H,\n  \"I\": KEY_CODES.I,\n  \"KeyI\": KEY_CODES.I,\n  \"J\": KEY_CODES.J,\n  \"KeyJ\": KEY_CODES.J,\n  \"K\": KEY_CODES.K,\n  \"KeyK\": KEY_CODES.K,\n  \"L\": KEY_CODES.L,\n  \"KeyL\": KEY_CODES.L,\n  \"M\": KEY_CODES.M,\n  \"KeyM\": KEY_CODES.M,\n  \"N\": KEY_CODES.N,\n  \"KeyN\": KEY_CODES.N,\n  \"O\": KEY_CODES.O,\n  \"KeyO\": KEY_CODES.O,\n  \"P\": KEY_CODES.P,\n  \"KeyP\": KEY_CODES.P,\n  \"Q\": KEY_CODES.Q,\n  \"KeyQ\": KEY_CODES.Q,\n  \"R\": KEY_CODES.R,\n  \"KeyR\": KEY_CODES.R,\n  \"S\": KEY_CODES.S,\n  \"KeyS\": KEY_CODES.S,\n  \"T\": KEY_CODES.T,\n  \"KeyT\": KEY_CODES.T,\n  \"U\": KEY_CODES.U,\n  \"KeyU\": KEY_CODES.U,\n  \"V\": KEY_CODES.V,\n  \"KeyV\": KEY_CODES.V,\n  \"W\": KEY_CODES.W,\n  \"KeyW\": KEY_CODES.W,\n  \"X\": KEY_CODES.X,\n  \"KeyX\": KEY_CODES.X,\n  \"Y\": KEY_CODES.Y,\n  \"KeyY\": KEY_CODES.Y,\n  \"Z\": KEY_CODES.Z,\n  \"KeyZ\": KEY_CODES.Z,\n\n  \"0\": KEY_CODES.NUM0,\n  \"Digit0\": KEY_CODES.NUM0,\n  \"1\": KEY_CODES.NUM1,\n  \"Digit1\": KEY_CODES.NUM1,\n  \"2\": KEY_CODES.NUM2,\n  \"Digit2\": KEY_CODES.NUM2,\n  \"3\": KEY_CODES.NUM3,\n  \"Digit3\": KEY_CODES.NUM3,\n  \"4\": KEY_CODES.NUM4,\n  \"Digit4\": KEY_CODES.NUM4,\n  \"5\": KEY_CODES.NUM5,\n  \"Digit5\": KEY_CODES.NUM5,\n  \"6\": KEY_CODES.NUM6,\n  \"Digit6\": KEY_CODES.NUM6,\n  \"7\": KEY_CODES.NUM7,\n  \"Digit7\": KEY_CODES.NUM7,\n  \"8\": KEY_CODES.NUM8,\n  \"Digit8\": KEY_CODES.NUM8,\n  \"9\": KEY_CODES.NUM9,\n  \"Digit9\": KEY_CODES.NUM9\n};\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Ludum Dare 41\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     -------------\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     \r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Game jam project for Ludum Dare 41, built on the theme of Combine 2 Incompatible\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Genres.\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     \r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     (Shaun A. Noordin | shaunanoordin.com | 20180421)\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     \r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     --------------------------------------------------------------------------------\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\n//Naming note: all caps.\n\n\nvar _constants = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n\nvar APP = _interopRequireWildcard(_constants);\n\nvar _utility = __webpack_require__(/*! ./utility.js */ \"./src/utility.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar GAME_STATE = {\n  READY: 'ready_and_waiting_for_user_input',\n  ACTIVE: 'active_and_receiving_user_input',\n  BUSY: 'processing_events_and_not_receiving_user_input'\n};\n\n/*  Primary App Class\r\n */\n//==============================================================================\n\nvar App = function () {\n  function App() {\n    _classCallCheck(this, App);\n\n    //Initialise properties\n    //--------------------------------\n    this.config = {\n      framesPerSecond: APP.FRAMES_PER_SECOND,\n      debugMode: false,\n      autoFitCanvas: true\n    };\n    this.html = {\n      app: document.getElementById(\"app\"),\n      canvas: document.getElementById(\"canvas\")\n    };\n    this.context2d = this.html.canvas.getContext(\"2d\");\n    this.boundingBox = null; //To be defined by this.updateSize().\n    this.canvasSizeRatio = 1;\n    this.canvasWidth = this.html.canvas.width; //The intended width/height of the canvas.\n    this.canvasHeight = this.html.canvas.height;\n    this.state = GAME_STATE.READY;\n    //--------------------------------\n\n    //Account for graphical settings\n    //--------------------------------\n    this.context2d.mozImageSmoothingEnabled = false;\n    this.context2d.msImageSmoothingEnabled = false;\n    this.context2d.imageSmoothingEnabled = false;\n    //--------------------------------\n\n    //Game Constants\n    //--------------------------------\n    this.MINIMUM_LINE_LENGTH = 3;\n    //--------------------------------\n\n    //Game Objects\n    //--------------------------------\n    this.assets = {\n      images: {}\n    };\n    this.assetsLoaded = 0;\n    this.assetsTotal = 0;\n\n    this.TILES = {\n      EMPTY: 0,\n      RED: 1,\n      BLUE: 2,\n      YELLOW: 3,\n      GREEN: 4,\n      PINK: 5,\n      ORANGE: 6,\n      random: function random() {\n        return Math.floor(Math.random() * 6 + 1);\n      }\n    };\n    this.TILE_SIZE = 64; //Pixel width and height\n    this.GRID_ROWS = 6;\n    this.GRID_COLS = 6;\n    this.GRID_OFFSET_X = 128;\n    this.GRID_OFFSET_Y = 64;\n\n    this.grid = [];\n    for (var row = -1; row < this.GRID_ROWS; row++) {\n      for (var col = 0; col < this.GRID_COLS; col++) {\n        this.grid.push({\n          row: row, col: col,\n          value: this.TILES.random(),\n          isDropping: false\n        });\n      }\n    }\n\n    this.lineOfTouchedTiles = [];\n\n    //Tracks when tiles drop.\n    this.dropTilesNow = false;\n    this.dropDistance = 0;\n    this.dropSpeed = 4;\n    //--------------------------------\n\n    //Prepare Input\n    //--------------------------------\n    this.keys = new Array(APP.MAX_KEYS);\n    for (var i = 0; i < this.keys.length; i++) {\n      this.keys[i] = {\n        state: APP.INPUT_IDLE,\n        duration: 0\n      };\n    }\n    this.pointer = {\n      start: { x: 0, y: 0 },\n      now: { x: 0, y: 0 },\n      state: APP.INPUT_IDLE,\n      duration: 0\n    };\n    //--------------------------------\n\n    //Bind Events\n    //--------------------------------\n    if (\"onmousedown\" in this.html.canvas && \"onmousemove\" in this.html.canvas && \"onmouseup\" in this.html.canvas) {\n      this.html.canvas.onmousedown = this.onPointerStart.bind(this);\n      this.html.canvas.onmousemove = this.onPointerMove.bind(this);\n      this.html.canvas.onmouseup = this.onPointerEnd.bind(this);\n    }\n    if (\"ontouchstart\" in this.html.canvas && \"ontouchmove\" in this.html.canvas && \"ontouchend\" in this.html.canvas && \"ontouchcancel\" in this.html.canvas) {\n      this.html.canvas.ontouchstart = this.onPointerStart.bind(this);\n      this.html.canvas.ontouchmove = this.onPointerMove.bind(this);\n      this.html.canvas.ontouchend = this.onPointerEnd.bind(this);\n      this.html.canvas.ontouchcancel = this.onPointerEnd.bind(this);\n    }\n    if (\"onkeydown\" in window && \"onkeyup\" in window) {\n      window.onkeydown = this.onKeyDown.bind(this);\n      window.onkeyup = this.onKeyUp.bind(this);\n    }\n    if (\"onresize\" in window) {\n      window.onresize = this.updateSize.bind(this);\n    }\n    this.updateSize();\n    //--------------------------------\n\n    //Start!\n    //--------------------------------\n    this.runCycle = setInterval(this.run.bind(this), 1000 / this.config.framesPerSecond);\n    //--------------------------------\n  }\n\n  //----------------------------------------------------------------\n\n  _createClass(App, [{\n    key: \"run\",\n    value: function run() {\n      var _this = this;\n\n      //--------------------------------\n      var lineOfTouchedTiles = this.lineOfTouchedTiles;\n\n      //Check if user has touched a tile and is starting to draw a line.\n      if (this.state === GAME_STATE.READY) {\n\n        //If a tile is touched, start the line drawing!\n        var touchedTile = this.getTouchedTile();\n        if (touchedTile) {\n          //If there's a touched tile, it implies this.pointer.state === APP.INPUT_ACTIVE.\n          this.state = GAME_STATE.ACTIVE;\n          lineOfTouchedTiles.push(touchedTile);\n        }\n      } else if (this.state === GAME_STATE.ACTIVE) {\n\n        var _touchedTile = this.getTouchedTile();\n\n        //If a tile is touched, checked if it's a \"valid\" tile to add to the line of tiles.\n        //A tile is valid only if it's not already in the line of tiles, and it's adjacent to the \"head\" of the line.\n        if (_touchedTile && lineOfTouchedTiles.length > 0) {\n          var headTile = lineOfTouchedTiles[lineOfTouchedTiles.length - 1];\n          var prevHeadTile = lineOfTouchedTiles.length > 1 ? lineOfTouchedTiles[lineOfTouchedTiles.length - 2] : null;\n          var tileIsValid = !this.lineOfTouchedTiles.find(function (tile) {\n            return tile.row === _touchedTile.row && tile.col === _touchedTile.col;\n          });\n\n          tileIsValid = tileIsValid && (headTile.row === _touchedTile.row + 1 && headTile.col === _touchedTile.col || headTile.row === _touchedTile.row - 1 && headTile.col === _touchedTile.col || headTile.row === _touchedTile.row && headTile.col === _touchedTile.col + 1 || headTile.row === _touchedTile.row && headTile.col === _touchedTile.col - 1);\n\n          //If the tile is valid it, add it to the line \n          if (tileIsValid) {\n            lineOfTouchedTiles.push(_touchedTile);\n          }\n\n          //Alternatively, the user might be trying to \"walk back\" the line.\n          if (prevHeadTile && _touchedTile.row === prevHeadTile.row && _touchedTile.col === prevHeadTile.col) {\n            lineOfTouchedTiles.pop();\n          }\n        }\n\n        //If user has stopped drawing a line of tiles, let's process it.      \n        if (this.pointer.state === APP.INPUT_ENDED || this.pointer.state === APP.INPUT_IDLE) {\n          if (lineOfTouchedTiles.length >= this.MINIMUM_LINE_LENGTH) {\n            //OK, there's a valid line. Pass it to the \"busy state\" logic to process it.\n            this.state = GAME_STATE.BUSY;\n          } else {\n            //If there's no valid line, just reset the input.\n            this.lineOfTouchedTiles = [];\n            this.state = GAME_STATE.READY;\n          }\n        }\n      } else if (this.state === GAME_STATE.BUSY) {\n\n        //If user has just finished drawing a valid line - process it now.\n        if (this.lineOfTouchedTiles.length > 0) {\n          //TODO\n          console.log(this.lineOfTouchedTiles);\n\n          //Clear the line of touched tiles.\n          this.lineOfTouchedTiles.map(function (touchedTile) {\n            _this.grid.map(function (tile) {\n              if (tile.row === touchedTile.row && tile.col === touchedTile.col) {\n                tile.value = _this.TILES.EMPTY;\n              }\n            });\n          });\n          this.lineOfTouchedTiles = [];\n        }\n\n        //If there are any empty tiles, drop the tiles down!\n        var doneDropping = this.dropTiles();\n\n        //Otherwise, it's all good, now let users continue playing.\n        if (doneDropping) {\n          this.state = GAME_STATE.READY;\n        }\n      }\n      //--------------------------------\n\n      this.paint();\n    }\n\n    /*  Drops all tiles.\r\n        Returns true if there's nothign else to drop, false otherwise.\r\n     */\n\n  }, {\n    key: \"dropTiles\",\n    value: function dropTiles() {\n      var _this2 = this;\n\n      //If we're in drop mode, drop every falling tile by the drop speed.\n      //Once the drop distance reaches (or exceeds) the point where the falling\n      //tiles reach the next row below it (where the empty tiles are), overwrite\n      //the empty tiles with the falling tiles. Copy a new grid, to be safe.\n      //Also, don't forget to refresh the buffer above the grid.\n\n      if (this.dropTilesNow) {\n        this.dropDistance += this.dropSpeed;\n\n        if (this.dropDistance > this.TILE_SIZE) {\n          var newGrid = this.grid.map(function (tile) {\n            var tileAbove = _this2.grid.find(function (ta) {\n              return ta.row === tile.row - 1 && ta.col === tile.col;\n            });\n\n            if (tileAbove && tileAbove.isDropping) {\n              //If it's an empty tile receiving a falling tile, overwrite it.\n              return {\n                row: tile.row,\n                col: tile.col,\n                value: tileAbove.value,\n                isDropping: false\n              };\n            } else if (!tileAbove) {\n              //If it's a tile in the buffer row, refresh it.\n              return {\n                row: tile.row,\n                col: tile.col,\n                value: _this2.TILES.random(),\n                isDropping: false\n              };\n            } else {\n              //Otherwise, keep the tile.\n              return {\n                row: tile.row,\n                col: tile.col,\n                value: tile.value,\n                isDropping: false\n              };\n            }\n          });\n          this.grid = newGrid;\n\n          this.dropDistance = 0;\n          this.dropTilesNow = false; //OK, stop dropping.\n        }\n      }\n\n      //Now check if we need to continue dropping.\n      //For each tile, check if there's an empty tile below it. If there is, mark\n      //the tile as a falling tile.\n\n      var doneDropping = true;\n      this.grid.map(function (tile) {\n        var tileBelow = _this2.grid.find(function (tb) {\n          return tb.row === tile.row + 1 && tb.col === tile.col;\n        });\n        if (tileBelow && (tileBelow.value === _this2.TILES.EMPTY || tileBelow.isDropping)) {\n          tile.isDropping = true;\n          _this2.dropTilesNow = true;\n          doneDropping = false; //Gotta keep dropping!\n        }\n      });\n\n      return doneDropping;\n    }\n\n    //----------------------------------------------------------------\n\n  }, {\n    key: \"paint\",\n    value: function paint() {\n      var _this3 = this;\n\n      var c2d = this.context2d;\n\n      //Clear\n      c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);\n\n      //Paint the grid\n      //--------------------------------\n      c2d.beginPath();\n      c2d.rect(0, 0, this.canvasWidth, this.canvasHeight);\n      for (var row = 0; row < this.GRID_ROWS; row++) {\n        for (var col = 0; col < this.GRID_COLS; col++) {\n          c2d.rect(this.GRID_OFFSET_X + col * this.TILE_SIZE, this.GRID_OFFSET_Y + row * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);\n        }\n      }\n      c2d.closePath();\n      c2d.lineWidth = \"2\";\n      switch (this.state) {\n        case GAME_STATE.READY:\n          c2d.strokeStyle = \"#ccc\";break;\n        case GAME_STATE.ACTIVE:\n          c2d.strokeStyle = this.lineOfTouchedTiles.length < this.MINIMUM_LINE_LENGTH ? \"#ccc\" : \"#fff\";\n          break;\n        case GAME_STATE.BUSY:\n          c2d.strokeStyle = \"#333\";break;\n        default:\n          c2d.strokeStyle = \"#999\";\n      }\n      c2d.stroke();\n      //--------------------------------\n\n      //Paint the line of touched tiles (background)\n      //--------------------------------\n      c2d.beginPath();\n      this.lineOfTouchedTiles.map(function (tile) {\n        c2d.rect(_this3.GRID_OFFSET_X + tile.col * _this3.TILE_SIZE, _this3.GRID_OFFSET_Y + tile.row * _this3.TILE_SIZE, _this3.TILE_SIZE, _this3.TILE_SIZE);\n      });\n      c2d.closePath();\n      c2d.fillStyle = this.lineOfTouchedTiles.length < this.MINIMUM_LINE_LENGTH ? \"#ccc\" : \"#fff\";\n      c2d.fill();\n      //--------------------------------\n\n      //Paint the tiles\n      //--------------------------------\n      this.paint_tiles(this.grid);\n      //--------------------------------\n\n      //Paint the line of touched tiles (overlay line)\n      //--------------------------------\n      c2d.beginPath();\n      this.lineOfTouchedTiles.map(function (tile, index) {\n        if (index === 0) {\n          c2d.moveTo(_this3.GRID_OFFSET_X + tile.col * _this3.TILE_SIZE + _this3.TILE_SIZE / 2, _this3.GRID_OFFSET_Y + tile.row * _this3.TILE_SIZE + _this3.TILE_SIZE / 2);\n        } else {\n          c2d.lineTo(_this3.GRID_OFFSET_X + tile.col * _this3.TILE_SIZE + _this3.TILE_SIZE / 2, _this3.GRID_OFFSET_Y + tile.row * _this3.TILE_SIZE + _this3.TILE_SIZE / 2);\n        }\n      });\n      c2d.lineWidth = \"8\";\n      c2d.lineCap = \"round\";\n      c2d.lineJoin = \"round\";\n      c2d.strokeStyle = this.lineOfTouchedTiles.length < this.MINIMUM_LINE_LENGTH ? \"#999\" : \"#333\";\n      c2d.stroke();\n      //--------------------------------\n    }\n  }, {\n    key: \"paint_tiles\",\n    value: function paint_tiles() {\n      var _this4 = this;\n\n      var grid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n      var c2d = this.context2d;\n\n      grid.map(function (tile) {\n        if (tile.value === _this4.TILES.EMPTY) return; //Don't draw empty tiles.\n        if (tile.row === -1 && !tile.isDropping) return; //Don't draw the buffer row if it isn't dropping.\n\n        //If the tile is dropping, it has a y-offset.\n        var offsetY = tile.isDropping ? _this4.dropDistance : 0;\n\n        c2d.beginPath();\n        c2d.arc(tile.col * _this4.TILE_SIZE + _this4.TILE_SIZE / 2 + _this4.GRID_OFFSET_X, tile.row * _this4.TILE_SIZE + _this4.TILE_SIZE / 2 + _this4.GRID_OFFSET_Y + offsetY, _this4.TILE_SIZE * 0.4, 0, 2 * Math.PI);\n        c2d.closePath();\n        switch (tile.value) {\n          case _this4.TILES.RED:\n            c2d.fillStyle = \"#c33\";break;\n          case _this4.TILES.BLUE:\n            c2d.fillStyle = \"#39c\";break;\n          case _this4.TILES.YELLOW:\n            c2d.fillStyle = \"#fc3\";break;\n          case _this4.TILES.GREEN:\n            c2d.fillStyle = \"#396\";break;\n          case _this4.TILES.PINK:\n            c2d.fillStyle = \"#f9c\";break;\n          case _this4.TILES.ORANGE:\n            c2d.fillStyle = \"#c93\";break;\n          default:\n            c2d.fillStyle = \"#333\";\n        }\n        c2d.fill();\n      });\n    }\n\n    //----------------------------------------------------------------\n\n  }, {\n    key: \"onPointerStart\",\n    value: function onPointerStart(e) {\n      this.pointer.state = APP.INPUT_ACTIVE;\n      this.pointer.duration = 1;\n      this.pointer.start = this.getPointerXY(e);\n      this.pointer.now = this.pointer.start;\n      return _utility.Utility.stopEvent(e);\n    }\n  }, {\n    key: \"onPointerMove\",\n    value: function onPointerMove(e) {\n      if (this.pointer.state === APP.INPUT_ACTIVE) {\n        this.pointer.now = this.getPointerXY(e);\n      }\n      return _utility.Utility.stopEvent(e);\n    }\n  }, {\n    key: \"onPointerEnd\",\n    value: function onPointerEnd(e) {\n      this.pointer.state = APP.INPUT_ENDED;\n      //this.pointer.now = this.getPointerXY(e);\n      return _utility.Utility.stopEvent(e);\n    }\n  }, {\n    key: \"getPointerXY\",\n    value: function getPointerXY(e) {\n      var clientX = 0;\n      var clientY = 0;\n      if (e.clientX && e.clientY) {\n        clientX = e.clientX;\n        clientY = e.clientY;\n      } else if (e.touches && e.touches.length > 0 && e.touches[0].clientX && e.touches[0].clientY) {\n        clientX = e.touches[0].clientX;\n        clientY = e.touches[0].clientY;\n      }\n      var inputX = (clientX - this.boundingBox.left) * this.canvasSizeRatio;\n      var inputY = (clientY - this.boundingBox.top) * this.canvasSizeRatio;\n      return { x: inputX, y: inputY };\n    }\n\n    //----------------------------------------------------------------\n\n  }, {\n    key: \"getTouchedTile\",\n    value: function getTouchedTile() {\n      //Sanity check: can't get the touched tile if nothing is touched.\n      if (this.pointer.state !== APP.INPUT_ACTIVE) return null;\n\n      var col = Math.floor((this.pointer.now.x - this.GRID_OFFSET_X) / this.TILE_SIZE);\n      var row = Math.floor((this.pointer.now.y - this.GRID_OFFSET_Y) / this.TILE_SIZE);\n\n      //Sanity check: make sure we're within bounds.\n      if (col < 0 || col >= this.GRID_COLS || row < 0 || row >= this.GRID_ROWS) {\n        return null;\n      }\n\n      var touchedTile = this.grid.find(function (tile) {\n        return tile.col === col && tile.row === row;\n      });\n\n      //return { col, row, value };\n      return touchedTile;\n    }\n\n    //----------------------------------------------------------------\n\n  }, {\n    key: \"onKeyDown\",\n    value: function onKeyDown(e) {\n      var keyCode = _utility.Utility.getKeyCode(e);\n      if (keyCode > 0 && keyCode < APP.MAX_KEYS && this.keys[keyCode].state != APP.INPUT_ACTIVE) {\n        this.keys[keyCode].state = APP.INPUT_ACTIVE;\n        this.keys[keyCode].duration = 1;\n      } //if keyCode == 0, there's an error.\n    }\n  }, {\n    key: \"onKeyUp\",\n    value: function onKeyUp(e) {\n      var keyCode = _utility.Utility.getKeyCode(e);\n      if (keyCode > 0 && keyCode < APP.MAX_KEYS) {\n        this.keys[keyCode].state = APP.INPUT_ENDED;\n      } //if keyCode == 0, there's an error.\n    }\n\n    //----------------------------------------------------------------\n\n  }, {\n    key: \"updateSize\",\n    value: function updateSize() {\n      if (this.config.autoFitCanvas) {\n        var bestFit = Math.min(this.html.app.offsetWidth / this.canvasWidth, this.html.app.offsetHeight / this.canvasHeight);\n\n        this.html.canvas.style = \"width: \" + Math.round(bestFit * this.canvasWidth) + \"px; \" + \"height: \" + Math.round(bestFit * this.canvasHeight) + \"px; \";\n      }\n\n      var boundingBox = this.html.canvas.getBoundingClientRect ? this.html.canvas.getBoundingClientRect() : { left: 0, top: 0 };\n      this.boundingBox = boundingBox;\n      this.canvasSizeRatio = Math.min(this.canvasWidth / this.boundingBox.width, this.canvasHeight / this.boundingBox.height);\n    }\n  }]);\n\n  return App;\n}();\n//==============================================================================\n\n/*  Initialisations\r\n */\n//==============================================================================\n\n\nvar app;\nwindow.onload = function () {\n  window.app = new App();\n};\n//==============================================================================\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Utility = undefined;\nexports.ImageAsset = ImageAsset;\n\nvar _constants = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n\nvar Utility = exports.Utility = {\n  randomInt: function randomInt(min, max) {\n    var a = min < max ? min : max;\n    var b = min < max ? max : min;\n    return Math.floor(a + Math.random() * (b - a + 1));\n  },\n\n  stopEvent: function stopEvent(e) {\n    //var eve = e || window.event;\n    e.preventDefault && e.preventDefault();\n    e.stopPropagation && e.stopPropagation();\n    e.returnValue = false;\n    e.cancelBubble = true;\n    return false;\n  },\n\n  getKeyCode: function getKeyCode(e) {\n    //KeyboardEvent.keyCode is the most reliable identifier for a keyboard event\n    //at the moment, but unfortunately it's being deprecated.\n    if (e.keyCode) {\n      return e.keyCode;\n    }\n\n    //KeyboardEvent.code and KeyboardEvent.key are the 'new' standards, but it's\n    //far from being standardised between browsers.\n    if (e.code && _constants.KEY_VALUES[e.code]) {\n      return _constants.KEY_VALUES[e.code];\n    } else if (e.key && _constants.KEY_VALUES[e.key]) {\n      return _constants.KEY_VALUES[e.key];\n    }\n\n    return 0;\n  }\n}; /*\r\n   Utility Classes\r\n   ---------------\r\n   \r\n   (Shaun A. Noordin || shaunanoordin.com || 20160901)\r\n   --------------------------------------------------------------------------------\r\n    */\n\nfunction ImageAsset(url) {\n  this.url = url;\n  this.img = null;\n  this.loaded = false;\n  this.img = new Image();\n  this.img.onload = function () {\n    this.loaded = true;\n  }.bind(this);\n  this.img.src = this.url;\n}\n\n//# sourceURL=webpack:///./src/utility.js?");

/***/ })

/******/ });