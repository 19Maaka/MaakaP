import * as THREE from "three";
import Experience from "../Experience.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.desk = this.resources.items.desk;
        this.roomChildren = {};

        this.setModel();
    }

    setModel(){
        console.log(this.desk.scene);
        this.desk.scene.children.forEach((child) => {
            child.castShadow = true;
            child.recieveShadow = true;
            //making sure the mesh and group also cast shadow
            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            /*if(child.name === "sideMonitor"){
                child.children[1].material = new THREE.MeshBasicMaterial({map: this.resources.items.screen});
            }*/
            
            child.scale.set(1,1,1);

            this.roomChildren[child.name] = child;
        });
        this.desk.scene.scale.set(0,0,0);
        this.desk.scene.rotation.set(0,-Math.PI/2,0);
        this.scene.add(this.desk.scene);
    }

    resize(){}

    update(){}
}