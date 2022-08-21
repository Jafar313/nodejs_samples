import {mycontainer} from "./inversify.config";
import {Warrior} from "./interfaces";
import {Types} from "./types";

const warrior = mycontainer.get<Warrior>(Types.Warrior);
console.log(warrior.fight());
console.log(warrior.sneak());
