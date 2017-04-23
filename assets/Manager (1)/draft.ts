module Game {

  export function initialize(){
    Sup.loadScene('Scene');
    Game.showTitleScren();
  
    // let aliveCells = Sup.getActor("GridBehavior").getBehavior(GridBehavior).getAliveCells();
    // aliveCells.forEach(ac => {
    //   ac.spriteRenderer = new Sup.SpriteRenderer(ac, "Grid/EnemySprite", Sup.SpriteRenderer.MaterialType.Shader, "Shaders/JellyShader");
    // });
    
  }
  
  export function showTitleScren() {
    //Sup.appendScene(Sup.get("Menus/MainMenu", Sup.Scene));
    Sup.appendScene(Sup.get("Grid/GridPrefab", Sup.Scene));
    let hud = Sup.appendScene(Sup.get("HUD/HudPrefab", Sup.Scene))[0];
    //hud.getBehavior(HudBehavior).setGeneration(1);
  }

}

Game.initialize();