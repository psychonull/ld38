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
        
  export let lastStats = {generation: 0, population: 0, kills: 0};
        
  export function initialize(){
    Game.reset();
  
    // let aliveCells = Sup.getActor("GridBehavior").getBehavior(GridBehavior).getAliveCells();
    // aliveCells.forEach(ac => {
    //   ac.spriteRenderer = new Sup.SpriteRenderer(ac, "Grid/EnemySprite", Sup.SpriteRenderer.MaterialType.Shader, "Shaders/JellyShader");
    // });
   
    Game.playerActor = Sup.getActor("Player");
  }
  
  export function showTitleScren() {
    //Sup.appendScene(Sup.get("Menus/MainMenu", Sup.Scene));
    Sup.loadScene("Menus/MainMenu");
  }
  
  export function reset(gameMode = GameModes.normal) {
    Game.mode = gameMode;
    this.lastStats = {};
    
    Sup.loadScene('Scene');
    
    let hud = Sup.appendScene(Sup.get("HUD/HudPrefab", Sup.Scene))[0];
    let grid = Sup.appendScene(Sup.get("Grid/GridPrefab", Sup.Scene))[0];
    
    hud.getBehavior(HubBehavior).initialize(grid);
    this.firstGame = false;
    
    if (Game.music) Game.music.stop();
    Game.music = Sup.Audio.playSound("MusicInGame", 0.1, { loop: true });
  }
  
}


Game.showTitleScren(); //Descomentar para tener menu inicial
//Game.initialize(); //Comentar para tener menu inicial