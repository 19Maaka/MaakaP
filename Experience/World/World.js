import * as THREE from "three";
import Experience from "../Experience.js";

import Room from "./Room.js";
import Floor from "./Floor.js";
import Envirnoment from "./Envirnoment.js";
import { EventEmitter } from "events";


export default class World extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", ()=>{
            this.envirnoment = new Envirnoment();
            this.floor = new Floor();
            this.room = new Room();
            this.emit("worldready");
        });
    }
    resize(){}

    update(){
}
}