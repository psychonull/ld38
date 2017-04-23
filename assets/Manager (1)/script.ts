module Game {

  export function initialize(){
    Sup.loadScene('Scene');
    Game.showTitleScren();
  
    
  }
  
  export function showTitleScren() {
    //Sup.appendScene(Sup.get("Menus/MainMenu", Sup.Scene));
    Sup.appendScene(Sup.get("Grid/GridPrefab", Sup.Scene));
    let hud = Sup.appendScene(Sup.get("HUD/HudPrefab", Sup.Scene))[0];
  }

}

Game.initialize();