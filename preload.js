var choice_pause = 0;
var choice_title = 0;
var title_menu;

var json;
var last_scene;
var perlin = 0;
var perlin_x, perlin_y, perlin_z;

var key_ENTER;
var key_ESC;

var hiscore;

var hud_hiscore;
var hud_lives;
var hud_score;
var hud_time;

var children;
var coins;
var enemies;
var enemies2;
var noise;
var binary = false;
var wobble;
var wobbles;

var layer1;
var layer2;
var layer3;
var layer4;
var layer5;

var globals;
var lives;
var countdown;
var speed = 0;
var tile_height;
var tile_count;
var tilemap;
var tilemap_high;
var score = 0;
var timedEvent = 0;

var sound_click;
var sound_coin;
var sound_damage;
var sound_jump;
var music;

class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload" });
  }

  preload() {

    // ##### MENU ######
    this.load.image("title1", "title/title1.png");
    this.load.image("title2", "title/title2.png");
    this.load.image("title3", "title/title3.png");
    this.load.image("title4", "title/title4.png");
    this.load.image("title5", "title/title5.png");
    this.load.image("title6", "title/title6.png");
    
    this.load.image("layer1-1", "level1/layer1.png");
    this.load.image("layer1-2", "level1/layer2.png");
    this.load.image("layer1-3", "level1/layer3.png");
    this.load.image("layer1-4", "level1/layer4.png");
    this.load.image("layer1-5", "level1/layer5.png");
    
    this.load.image("layer2-1", "level2/layer1.png");
    this.load.image("layer2-2", "level2/layer2.png");
    this.load.image("layer2-3", "level2/layer3.png");
    this.load.image("layer2-4", "level2/layer4.png");
    this.load.image("layer2-5", "level2/layer5.png");
    
    this.load.image("layer3-1", "level3/layer1.png");
    this.load.image("layer3-2", "level3/layer2.png");
    this.load.image("layer3-3", "level3/layer3.png");
    this.load.image("layer3-4", "level3/layer4.png");
    
    this.load.image("layer4-1", "level4/layer1.png");
    this.load.image("layer4-2", "level4/layer2.png");
    this.load.image("layer4-3", "level4/layer3.png");
    this.load.image("layer4-4", "level4/layer4.png");
    
    this.load.image("layer5-1", "level5/layer1.png");
    this.load.image("layer5-2", "level5/layer2.png");
    this.load.image("layer5-3", "level5/layer3.png");
    this.load.image("layer5-4", "level5/layer4.png");
    
    this.load.image("layer6-1", "level6/layer1.png");
    this.load.image("layer6-2", "level6/layer2.png");
    this.load.image("layer6-3", "level6/layer3.png");
    this.load.image("layer6-4", "level6/layer4.png");
   
    this.load.json("Level1", "level1.json");
    this.load.json("Level2", "level2.json");
    this.load.json("Level3", "level3.json");
    this.load.json("Level4", "level4.json");
    this.load.json("Level5", "level5.json");
    this.load.json("Level6", "level6.json");
    this.load.json("Globals", "globals.json");

    this.load.image("coin1", "level1/coin.png");
    this.load.image("coin2", "level2/coin.png");
    this.load.image("coin3", "level3/coin.png");
    this.load.image("coin5", "level4/coin.png");
    this.load.image("coin4", "level5/coin.png");
    this.load.image("coin6", "level6/coin.png");

    // ##### \ASSETS ######
    this.load.image("bubble", "assets/bubble.png");
    this.load.image("ground", "assets/ground.png");
    this.load.image("block", "assets/block.png");
    this.load.image("controls", "assets/controls.png");
    this.load.image("block_high", "assets/block_high.png");
    this.load.image("wobble", "assets/wobble.png");

    // ##### SOUNDS ######
    this.load.audio("snd_click", "assets/click.mp3");
    this.load.audio("snd_jump", "assets/jump.mp3");
    this.load.audio("snd_damage", "assets/damage.mp3");
    this.load.audio("snd_coin", "assets/coin.mp3");

    // ##### PLUGINS ######
    this.load.plugin(
      "rexperlinplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperlinplugin.min.js",
      true
    );

    // ##### LEVEL ######
    this.load.json("level1", "level1.json");

    // ##### GOOGLE FONT ######
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
  }

  create() {
    this.scene.stop("Preload");
    this.scene.launch("Title");
  }

  update() {

}}

var config = {
  type: Phaser.WEBGL,
  width: 960,
  height: 640,
  scene: [Preload, Title, Base, Pause, Score],
  autoCenter: true,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 2000 },
      debug: false,
    },
  },
};

var game = new Phaser.Game(config);
