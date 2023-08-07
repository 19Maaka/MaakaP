import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from 'gsap';
import convert from "./Utils/covertDivsToSpans.js";

export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device)=>{
            this.device = device;
        });

        this.world.on("worldready", ()=>{
            this.setAssets();
            this.playIntro();
        });
    }

    async playIntro(){
        await this.Intro();
        this.emit("enablecontrols");
    }
    
    setAssets(){
        //convert(document.querySelector(".header"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));;
        this.room = this.experience.world.room.desk.scene;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    Intro(){
        return new Promise((resolve)=>{
            this.Timeline = new GSAP.timeline();
            this.Timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.Timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            }).to(this.room.scale, {
                x: 0.5,
                y: 0.5,
                z: 0.5,
                ease: "back.out(2.2)",
                duration: 1,
            }).to(".hero-main-title .animatedis",{
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },"introtext").to(".hero-main-description .animatedis",{
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
                onComplete: resolve,
            })
        });
    }

    update(){}
}