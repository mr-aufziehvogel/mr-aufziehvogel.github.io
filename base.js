class Base extends Phaser.Scene {
  constructor() {
    super({ key: "Base" });
  }

  L1() {
    hiscore = localStorage.getItem("hiscore1");
    layer1 = this.add.tileSprite(0, -50, 960, 640, "layer1-1");
    layer1.setOrigin(0, 0);
    layer2 = this.add.tileSprite(0, -10, 960, 640, "layer1-2");
    layer2.setOrigin(0, 0);
    layer2.alpha = 0.3;
    layer3 = this.add.tileSprite(0, 50, 960, 640, "layer1-3");
    layer3.setOrigin(0, 0);
    layer4 = this.add.tileSprite(0, 50, 960, 640, "layer1-4");
    layer4.setOrigin(0, 0);
  }

  L2() {
    hiscore = localStorage.getItem("hiscore2");
    layer1 = this.add.tileSprite(0, 0, 960, 640, "layer2-1");
    layer1.setOrigin(0, 0);
    layer2 = this.add.tileSprite(0, -10, 960, 640, "layer2-2");
    layer2.setOrigin(0, 0);
    layer3 = this.add.tileSprite(0, 90, 960, 640, "layer2-3");
    layer3.setOrigin(0, 0);
    layer4 = this.add.tileSprite(0, 50, 960, 640, "layer2-4");
    layer4.setOrigin(0, 0);
    // load.image("coin2", "level2/coin.png");
  }

  L3() {
    hiscore = localStorage.getItem("hiscore3");
    layer1 = this.add.tileSprite(0, 0, 960, 640, "layer3-1");
    layer1.setOrigin(0, 0);
    layer2 = this.add.tileSprite(0, 30, 960, 640, "layer3-2");
    layer2.setOrigin(0, 0);
    layer2.alpha = 1;
    layer3 = this.add.tileSprite(0, 50, 960, 640, "layer3-3");
    layer3.setOrigin(0, 0);
    layer4 = this.add.tileSprite(0, 20, 960, 640, "layer3-4");
    layer4.setOrigin(0, 0);
    // load.image("coin2", "level2/coin.png");
  }

  L4() {
    hiscore = localStorage.getItem("hiscore4");
    layer1 = this.add.tileSprite(0, 0, 960, 640, "layer5-1");
    layer1.setOrigin(0, 0);
    layer2 = this.add.tileSprite(0, -10, 960, 640, "layer5-2");
    layer2.setOrigin(0, 0);
    layer2.alpha = 0.7;
    layer3 = this.add.tileSprite(0, 90, 960, 640, "layer5-3");
    layer3.setOrigin(0, 0);
    layer4 = this.add.tileSprite(0, 90, 960, 640, "layer5-4");
    layer4.setOrigin(0, 0);
  }

  L5() {
    hiscore = localStorage.getItem("hiscore5");
    layer1 = this.add.tileSprite(0, -50, 960, 640, "layer4-1");
    layer1.setOrigin(0, 0);
    layer2 = this.add.tileSprite(0, -10, 960, 640, "layer4-2");
    layer2.setOrigin(0, 0);
    layer2.alpha = 0.3;
    layer3 = this.add.tileSprite(0, 50, 960, 640, "layer4-3");
    layer3.setOrigin(0, 0);
    layer4 = this.add.tileSprite(0, 50, 960, 640, "layer4-4");
    layer4.setOrigin(0, 0);
  }

  L6() {
    hiscore = localStorage.getItem("hiscore6");
    layer1 = this.add.tileSprite(0, 0, 960, 640, "layer6-1");
    layer1.setOrigin(0, 0);
    layer2 = this.add.tileSprite(0, -10, 960, 640, "layer6-2");
    layer2.setOrigin(0, 0);
    layer3 = this.add.tileSprite(0, 90, 960, 640, "layer6-3");
    layer3.setOrigin(0, 0);
    layer4 = this.add.tileSprite(0, 90, 960, 640, "layer6-4");
    layer4.setOrigin(0, 0);
  }

  init() {
    choice_pause = 0;
    score = 0;
    seconds = 0;
    tile_count = 0;
  }

  preload() {}

  create() {
    switch (last_scene) {
      case "1":
        this.L1();
        json = this.cache.json.get("Level1");
        break;
      case "2":
        this.L2();
        json = this.cache.json.get("Level2");
        break;
      case "3":
        this.L3();
        json = this.cache.json.get("Level3");
        break;
      case "4":
        this.L4();
        json = this.cache.json.get("Level4");
        break;
      case "5":
        this.L5();
        json = this.cache.json.get("Level5");
        break;
      case "6":
        this.L6();
        json = this.cache.json.get("Level6");
        break;
    }

    // ##### LOAD JSON ######
    lives = json.lives;
    speed = json.godspeed;
    tilemap = json.tilemap_flr.split("");
    tilemap_high = json.tilemap_air.split("");
    this.setGravity = json.gravity;

    // ##### GROUPS ######
    enemies = this.physics.add.group();
    enemies2 = this.physics.add.group();
    wobbles = this.physics.add.group();
    coins = this.physics.add.group();

    this.ground = this.add.image(0, 520, "ground");
    this.ground.setOrigin(0, 0);
    this.physics.add.existing(this.ground, true);

    this.player = this.physics.add.sprite(200, 400, "bubble");
    this.player.body.setCollideWorldBounds(true);
    this.player.body.onWorldBounds = true;
    this.player.imMovable;
    if (json.player_bounce) {
      this.player.setBounce(1);
    }

    this.physics.add.collider(this.player, this.ground);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on(
      "keydown-ESC",
      function (event) {
        sound_click.play();
        this.scene.pause();
        timedEvent.paused = true;
        this.scene.launch("Pause");
      },
      this
    );

    // ##### GROUPS ######
    enemies = this.physics.add.group();
    enemies2 = this.physics.add.group();
    wobbles = this.physics.add.group();
    coins = this.physics.add.group();

    var add = this.add;
    WebFont.load({
      google: {
        families: ["Urbanist:600"],
      },
    });

    hud_score = add.text(20, 12, "Score: 0 (" + hiscore + ")", {
      fontFamily: "Urbanist",
      fontSize: "20px",
    });
    hud_score.setAlign("right");

    hud_lives = add.text(855, 12, "Lives: " + lives, {
      fontFamily: "Urbanist",
      fontSize: "20px",
    });
    hud_lives.setAlign("right");

    function onEvent() {
      if (tilemap[tile_count] === "1") {
        if (binary === false) {
          enemies.create(960, 505, "block");
          var children = enemies.getChildren();
          var last = children[children.length - 1];
          last.setImmovable(true);
          binary = true;
        } else {
          enemies2.create(960, 505, "block");
          var children = enemies2.getChildren();
          var last = children[children.length - 1];
          last.setImmovable(true);
          binary = false;
        }
        last.body.allowGravity = false;
      } else if (tilemap[tile_count] === "2") {
        coins.create(960, 507, "coin" + last_scene);
        var children = coins.getChildren();
        var last = children[children.length - 1];
        last.setImmovable(true);
        last.body.allowGravity = false;
      } else if (tilemap[tile_count] === "3") {
        enemies.create(960, 492, "block_high");
        var children = enemies.getChildren();
        var last = children[children.length - 1];
        last.setImmovable(true);
        last.body.allowGravity = false;
      }
      if (tilemap_high[tile_count] === "2") {
        coins.create(960, 507 - json.tile_height, "coin" + last_scene);
        var children = coins.getChildren();
        var last = children[children.length - 1];
        last.setImmovable(true);
        last.body.allowGravity = false;
      } else if (tilemap_high[tile_count] === "4") {
        wobbles.create(960, 507 - json.tile_height, "wobble");
        var children = wobbles.getChildren();
        var last = children[children.length - 1];
        last.setImmovable(true);
        last.body.allowGravity = false;
      }
      coins.setVelocityX(json.enemy_velocity);
      enemies.setVelocityX(json.enemy_velocity);
      enemies2.setVelocityX(json.enemy_velocity);
      wobbles.setVelocityX(json.enemy_velocity);
      tile_count += 1;
      seconds += 0.2;
      if (tile_count > tilemap.length) {
        tile_count = 0;
      }
    }

    var tintTween = this.tweens.add({
      targets: this.player,
      duration: 600,
      alpha: 0.2,
      ease: "Stepped",
      easeParams: [1],
      paused: true,
      callbackScope: this,
      onComplete: function (tween, sprites) {
        // Return to original color
        this.player.alpha = 1;
      },
    });

    var tintTween2 = this.tweens.add({
      targets: this.player,
      duration: 600,
      alpha: 0.2,
      ease: "Stepped",
      easeParams: [1],
      paused: true,
      callbackScope: this,
      onComplete: function (tween, sprites) {
        // Return to original color
        this.player.alpha = 1;
      },
    });

    this.physics.add.overlap(enemies, this.player, function (player, enemy) {
      if (tintTween.isPlaying() === false) {
        tintTween.resume();
        enemy.destroy();
        lives -= 1;
        if (sound_damage.isPlaying === false) {
          sound_damage.play();
        }
      }
    });

    this.physics.add.overlap(enemies2, this.player, function (player, enemy) {
      if (tintTween.isPlaying() === false) {
        tintTween2.resume();
        enemy.destroy();
        lives -= 1;
        if (sound_damage.isPlaying === false) {
          sound_damage.play();
        }
      }
    });

    this.physics.add.overlap(wobbles, this.player, function (player, wobble) {
      if (tintTween.isPlaying() === false) {
        tintTween.resume();
        lives -= 1;
        wobble.destroy();
        if (sound_damage.isPlaying === false) {
          sound_damage.play();
        }
      }
    });

    this.physics.add.overlap(coins, this.player, function (player, coin) {
      if (tintTween.isPlaying() === false) {
        coin.destroy();
        score += 1;
        if (sound_coin.isPlaying === false) {
          sound_coin.play();
        }
        localStorage.setItem("hiscore" + last_scene, score);
        hiscore = score;
      }
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    timedEvent = this.time.addEvent(
      {
        delay: 200 * speed,
        callback: onEvent,
        callbackScope: this,
        loop: true,
      },
      this
    );
  }

  update() {
    // ##### PERLIN MOVEMENT ######
    perlin += 0.1;
    children = wobbles.getChildren();
    for (let i = 0; i < children.length; i++) {
      noise = this.plugins
        .get("rexperlinplugin")
        .add(Math.floor(Math.random() * 30));
      perlin_x = noise.perlin3(perlin, 0, 0);
      perlin_y = noise.perlin3(0, perlin, 0);
      perlin_z = noise.perlin3(0, 0, perlin);
      children[i].setX(children[i].x + perlin_x * 2);
      children[i].setAngle(0 + perlin_z * 180);
      children[i].setY(children[i].y + perlin_y * 2);
      if (children[i].x < -10) {
        children[i].destroy();
      }
    }

    // ##### DISPLAY ######
    // hud_hiscore.setText("Hiscore: " + hiscore2);
    if (lives >= 0) {
      hud_lives.setText("Lives: " + lives);
    }
    hud_score.setText("Score: " + score + " (" + hiscore + ")");
    // hud_time.setText("Time: " + Math.floor(seconds) + "s");

    // ##### DEATH ######
    if (lives < 0) {
      this.scene.pause();
      timedEvent.paused = true;
      this.scene.launch("Score");
    }

    layer1.tilePositionX += json.parallax_layer1 * json.parallax_multiplier;
    layer2.tilePositionX += json.parallax_layer2 * json.parallax_multiplier;
    layer3.tilePositionX += json.parallax_layer3 * json.parallax_multiplier;
    layer4.tilePositionX += json.parallax_layer4 * json.parallax_multiplier;

    // ##### INPUT ######
    if (this.cursors.up.isDown) {
      if (this.player.body.onFloor() === true) {
        sound_jump.play();
        this.player.setVelocityY(-1 * json.player_yvelocity);
      }
    }

    if (this.cursors.left.isDown) {
      this.player.setX(this.player.x - json.player_xvelocity);
    }

    if (this.cursors.right.isDown) {
      this.player.setX(this.player.x + json.player_xvelocity);
    }
  }
}
