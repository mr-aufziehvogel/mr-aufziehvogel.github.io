class Title extends Phaser.Scene {
  constructor() {
    super({ key: "Title" });
  }

  preload() {
    // ##### PLUGINS ######
    this.load.plugin(
      "rexperlinplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperlinplugin.min.js",
      true
    );

    // ##### GOOGLE FONT ######
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
  }

  create() {
    // ##### INIT TILEMAP ######
    json = this.cache.json.get("level1");

    // ##### SHOW BACKGROUND SCENE ######
    this.layer1 = this.add.tileSprite(0, 0, 960, 640, "layer3-1");
    this.layer1.setOrigin(0, 0);
    this.layer4 = this.add.tileSprite(0, 0, 960, 640, "layer3-2");
    this.layer4.setOrigin(0, 0);
    this.layer3 = this.add.tileSprite(0, 90, 960, 640, "layer3-3");
    this.layer3.setOrigin(0, 0);

    this.ground = this.add.image(0, 520, "ground");
    this.ground.setOrigin(0, 0);
    this.physics.add.existing(this.ground, true);
    this.player = this.physics.add.sprite(200, 480, "bubble");

    this.player.body.setCollideWorldBounds(true);
    this.player.body.onWorldBounds = true;
    this.player.imMovable;
    this.physics.add.collider(this.player, this.ground);

    // ##### INIT SOUNDS ######
    sound_click = this.sound.add("snd_click");
    sound_jump = this.sound.add("snd_jump");
    sound_damage = this.sound.add("snd_damage");
    sound_coin = this.sound.add("snd_coin");

    // ##### SHOW MENU ######
    switch (choice_title) {
      case 0:
        title_menu = this.add.image(480, 320, "title1");
        break;
      case 1:
        title_menu = this.add.image(480, 320, "title2");
        break;
      case 2:
        title_menu = this.add.image(480, 320, "title3");
        break;
      case 3:
        title_menu = this.add.image(480, 320, "title4");
        break;
      case 4:
        title_menu = this.add.image(480, 320, "title5");
        break;
      case 5:
        title_menu = this.add.image(480, 320, "title6");
        break;
    }

    // this.controls = this.add.image(0, 0, "controls");
    // this.controls.setScale(0.2);
    // this.controls.setOrigin(0, 0);

    // ##### INIT KEYBOARD INPUT ######
    this.cursors = this.input.keyboard.createCursorKeys();

    key_ENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    // ##### DELETE HIGHSCORES ######

    this.input.keyboard.on(
      "keydown-DELETE",
      function (event) {
        localStorage.setItem("hiscore1", 0);
        localStorage.setItem("hiscore2", 0);
        localStorage.setItem("hiscore3", 0);
        localStorage.setItem("hiscore4", 0);
        localStorage.setItem("hiscore5", 0);
        localStorage.setItem("hiscore6", 0);
      },
      this
    );

    // ##### FADE IN ######
    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  update() {
    // ##### KEYBOARD INPUT ######

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      switch (choice_title) {
        case 0:
          choice_title = 5;
          title_menu.setTexture("title6");
          sound_click.play();
          break;
        case 1:
          choice_title = 0;
          title_menu.setTexture("title1");
          sound_click.play();
          break;
        case 2:
          choice_title = 1;
          title_menu.setTexture("title2");
          sound_click.play();
          break;
        case 3:
          choice_title = 2;
          title_menu.setTexture("title3");
          sound_click.play();
          break;
        case 4:
          choice_title = 3;
          title_menu.setTexture("title4");
          sound_click.play();
          break;
        case 5:
          choice_title = 4;
          title_menu.setTexture("title5");
          sound_click.play();
          break;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      switch (choice_title) {
        case 0:
          choice_title = 1;
          title_menu.setTexture("title2");
          sound_click.play();
          break;
        case 1:
          choice_title = 2;
          title_menu.setTexture("title3");
          sound_click.play();
          break;
        case 2:
          choice_title = 3;
          title_menu.setTexture("title4");
          sound_click.play();
          break;
        case 3:
          choice_title = 4;
          title_menu.setTexture("title5");
          sound_click.play();
          break;
        case 4:
          choice_title = 5;
          title_menu.setTexture("title6");
          sound_click.play();
          break;
        case 5:
          choice_title = 0;
          title_menu.setTexture("title1");
          sound_click.play();
          break;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(key_ENTER)) {
      if (choice_title === 0) {
        last_scene = "1";
        this.scene.start("Base");
        this.scene.stop();
        sound_click.play();
      }
      if (choice_title === 1) {
        last_scene = "2";
        this.scene.start("Base");
        this.scene.sleep();
        sound_click.play();
      }
      if (choice_title === 2) {
        last_scene = "3";
        this.scene.start("Base");
        this.scene.sleep();
        sound_click.play();
      }
      if (choice_title === 3) {
        last_scene = "4";
        this.scene.start("Base");
        this.scene.sleep();
        sound_click.play();
      }
      if (choice_title === 4) {
        last_scene = "5";
        this.scene.start("Base");
        this.scene.sleep();
        sound_click.play();
      }
      if (choice_title === 5) {
        last_scene = "6";
        this.scene.start("Base");
        this.scene.sleep();
        sound_click.play();
      }
    }

    // ##### PARALLAX ######
    this.layer1.tilePositionX +=
      json.parallax_layer1 * json.parallax_multiplier * 0.03;
    this.layer3.tilePositionX +=
      json.parallax_layer3 * json.parallax_multiplier;
    this.layer4.tilePositionX +=
      json.parallax_layer4 * json.parallax_multiplier;
  }
}
