module.exports = {

  /**
   * Tests that Phaser, and your Phaser.Game instance can be loaded ok,
   * and that the expected state is reached by Phaser.StateManager
   *
   * @test
   * @param client
   */
  'Phaser Game Level 1 Test': function (client) {
    client
	  .url('http://xe1.duckdns.org/')
      //.url('http://192.168.0.1:8888/xenon/')
	  //.url('https://soft-eng-practicum.github.io/xenon/')
      .waitForState('Level1', 5000)
      .assert.currentState('Level1')
      .page.moveRocket();
  }
};


