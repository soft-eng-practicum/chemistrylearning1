var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, "gameDiv");

    game.state.add("Boot",bootState);
    game.state.add("Preload",preloadState);
    game.state.add("GameIntro",gameIntroState);
    game.state.add("GameTitle",gameTitleState);
    game.state.add("Settings", settingsState);
    game.state.add("Level1",level1);
    game.state.add("Level2",level2);
    game.state.add("Level3",level3);
    game.state.add("Level4",level4);

   // game.state.add("GameOver",gameOverState);


    game.state.start("Boot");