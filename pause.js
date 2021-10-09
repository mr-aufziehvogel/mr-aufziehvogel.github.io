var menu_pause;
var click;
var key_DOWN;
var sound_click2;
var sound_click3;

class Pause extends Phaser.Scene {
  constructor() {
    super({ key: "Pause" });
  }

  preload() {
    this.load.image("menu1", "pause/menu1.png");
    this.load.image("menu2", "pause/menu2.png");
    this.load.image("menu3", "pause/menu3.png");
  }

  create() {
    if (typeof music !== "undefined") {
      music.pause();
    }

    // ADD TILES
    choice_pause = 0;
    menu_pause = this.add.image(480, 320, "menu1");
    menu_pause.alpha = 1;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on(
      "keydown-ESC",
      function (event) {
        timedEvent.paused = false;
        this.scene.resume("Base");
        this.scene.stop();
        sound_click.play();
        if (typeof music !== "undefined") {
          music.resume();
        }
      },
      this
    );

    sound_click2 = this.sound.add("snd_click");
    sound_click3 = this.sound.add("snd_click");

    key_ENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    hud_score.setText("");
    // hud_hiscore.setText("");
    hud_lives.setText("");
    // hud_time.setText("");
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      sound_click3.play();
      switch (choice_pause) {
        case 0:
          choice_pause = 2;
          menu_pause.setTexture("menu3");
          break;
        case 1:
          choice_pause = 0;
          menu_pause.setTexture("menu1");
          break;
        case 2:
          choice_pause = 1;
          menu_pause.setTexture("menu2");
          break;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(key_DOWN)) {
      sound_click3.play();
      switch (choice_pause) {
        case 0:
          choice_pause = 1;
          menu_pause.setTexture("menu2");
          break;
        case 1:
          choice_pause = 2;
          menu_pause.setTexture("menu3");
          break;
        case 2:
          choice_pause = 0;
          menu_pause.setTexture("menu1");
          break;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(key_ENTER)) {
      if (choice_pause === 0) {
        timedEvent.paused = false;
        this.scene.stop();
        this.scene.resume("Base");
        if (typeof music !== "undefined") {
          music.resume();
        }
        sound_click2.play();
      }
      if (choice_pause === 1) {
        this.scene.stop("Base");
        this.scene.stop(last_scene);
        this.scene.start("Base");
      }
      if (choice_pause === 2) {
        choice_pause = 0;
        tile_count = 0;
        countdown = 0;
        score = 0;
        this.scene.stop("Base");
        this.scene.start("Title");
        this.scene.stop();
      }
    }
    sound_click2.play();
  }
}
