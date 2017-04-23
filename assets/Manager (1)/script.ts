enum GameModes {
  zen,
  normal,
  frenzy,
}

module Game {

  export let playerActor: Sup.Actor;
  export let music: Sup.Audio.SoundPlayer;
  export let firstGame: boolean = true;
  export let mode = GameModes.normal;
        
  export function initialize(){
    
    Game.reset();
  
    // let aliveCells = Sup.getActor("GridBehavior").getBehavior(GridBehavior).getAliveCells();
    // aliveCells.forEach(ac => {
    //   ac.spriteRenderer = new Sup.SpriteRenderer(ac, "Grid/EnemySprite", Sup.SpriteRenderer.MaterialType.Shader, "Shaders/JellyShader");
    // });
    
    //Game.music = Sup.Audio.playSound("Music", 0.2, { loop: true });
    Game.playerActor = Sup.getActor("Player");
  }
  
  export function showTitleScren() {
    //Sup.appendScene(Sup.get("Menus/MainMenu", Sup.Scene));
    Sup.loadScene("Menus/MainMenu");
  }
  
  export function reset(gameMode = GameModes.normal) {
    Game.mode = gameMode;
    Sup.loadScene('Scene');
    let grid = Sup.appendScene(Sup.get("Grid/GridPrefab", Sup.Scene))[0];
    let hud = Sup.appendScene(Sup.get("HUD/HudPrefab", Sup.Scene))[0];
    hud.getBehavior(HubBehavior).initialize(grid);
    this.firstGame = false;
  }
  
}


Game.initialize();