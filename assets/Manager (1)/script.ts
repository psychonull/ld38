module Game {

  export function initialize(){
    Sup.loadScene('Scene');
    Game.showTitleScren();
  }
  
  export function showTitleScren() {
    //Sup.appendScene(Sup.get("Menus/MainMenu", Sup.Scene));
    Sup.appendScene(Sup.get("Grid/Grid", Sup.Scene));
  }

}

Game.initialize();