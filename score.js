var menu_score;
var choice_score;
var click;
var key_DOWN;
var sound_click2;
var sound_click3;

class Score extends Phaser.Scene {
  constructor() {
    super({ key: "Score" });
  }

  preload() {
    this.load.image("score1", "score/score1.png");
    this.load.image("score2", "score/score2.png");
  }

  create() {
    var add = this.add;
    WebFont.load({
      google: {
        families: ["Urbanist:600"],
      },
    });

    if (typeof music !== "undefined") {
      music.pause();
    }

    // ADD TILES
    choice_score = 0;
    menu_score = this.add.image(480, 320, "score1");
    menu_score.alpha = 1;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on(
      "keydown-ESC",
      function (event) {
        timedEvent.paused = false;
        this.scene.resume(last_scene);
        this.scene.stop();
        sound_click.play();
        if (typeof music !== "undefined") {
          music.resume();
        }
      },
      this
    );

    var screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    var screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    // var loadingText = this.add.text(screenCenterX, screenCenterY, 'Loading: 0%').setOrigin(0.5);

    var bla = add
      .text(
        screenCenterX,
        screenCenterY - 140,
        "Score: " + score + " (" + hiscore + ")",
        {
          fontFamily: "Urbanist",
          fontSize: "76px",
        }
      )
      .setOrigin(0.5);
    bla.setAlign("center");

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
      switch (choice_score) {
        case 1:
          choice_score = 0;
          menu_score.setTexture("score1");
          break;
        case 0:
          choice_score = 1;
          menu_score.setTexture("score2");
          break;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(key_DOWN)) {
      sound_click3.play();
      switch (choice_score) {
        case 0:
          choice_score = 1;
          menu_score.setTexture("score2");
          break;
        case 1:
          choice_score = 0;
          menu_score.setTexture("score1");
          break;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(key_ENTER)) {
      if (choice_score === 0) {
        this.scene.stop("Base");
        this.scene.start("Base");
      }
      if (choice_score === 1) {
        choice_score = 0;
        tile_count = 0;
        countdown = 0;
        score = 0;
        this.scene.stop("Base");
        this.scene.stop(last_scene);
        this.scene.start("Title");
      }
    }
    sound_click2.play();
  }
}
