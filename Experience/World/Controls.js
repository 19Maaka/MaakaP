import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll';

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.desk.scene;

        GSAP.registerPlugin(ScrollTrigger);
        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();

        //this.progress = 0;

        // this.lerp = {
        //     current: 0,
        //     target: 0,
        //     ease: 0.1
        // }

        // this.position = new THREE.Vector3(0,0,0);
        // this.lookAtPosition = new THREE.Vector3(0,0,0);

        // this.directionalVector = new THREE.Vector3(0,0,0);
        // this.staticVector = new THREE.Vector3(0,1,0);
        // this.crossVector = new THREE.Vector3(0,0,0); 

        // this.setPath();
        // this.onWheel();
    }

    setupASScroll() {
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true
        });
    
        GSAP.ticker.add(asscroll.update);
    
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });
    
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            fixedMarkers: true
        });
    
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        
        requestAnimationFrame(() => {
           asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            }); 
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": () => {
                console.log("desktop");
                //First section---------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.camera.orthographicCamera, {
                    zoom: 6,
                },"firstScreen").to(this.camera.orthographicCamera.rotation, {
                    x: -Math.PI/7,
                },"firstScreen");

                //second section---------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(this.camera.orthographicCamera.rotation, {
                    x: -Math.PI/6.5,
                    y: Math.PI/31,
                }).to(this.camera.orthographicCamera, {
                    zoom: 12,
                });
            },

            //Mobile
            "(max-width: 968px)": () => {
                console.log("mobile");
                //First section---------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.camera.orthographicCamera, {
                    zoom: 2,
                },"firstScreen").to(this.camera.orthographicCamera.rotation, {
                    x: -Math.PI/7,
                },"firstScreen");

                //second section---------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(this.camera.orthographicCamera.rotation, {
                    x: -Math.PI/6.5,
                    y: Math.PI/31,
                }).to(this.camera.orthographicCamera, {
                    zoom: 8,
                });
            }, 
              
          }); 
    }

    //custom movement
    // setPath(){
    //     //Create a closed wavey loop
    //     this.curve = new THREE.CatmullRomCurve3( [
	//         new THREE.Vector3( -5, 0, 0 ),
	//         new THREE.Vector3( 0, 0, -5 ),
	//         new THREE.Vector3( 5, 12, 0 ),
	//         new THREE.Vector3( 0, 5, 5 ),
    //         new THREE.Vector3( 15, 0, 5 ),
	//         new THREE.Vector3( 0, 5, 5 ),
	//         new THREE.Vector3( -12, 6, 5 )
    //         ],
    //         true
    //     );

    //     const points = this.curve.getPoints( 50 );
    //     const geometry = new THREE.BufferGeometry().setFromPoints( points );

    //     const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

    //     // Create the final object to add to the scene
    //     const curveObject = new THREE.Line( geometry, material );
    //     this.scene.add(curveObject);
    // }

    // onWheel(){
    //     window.addEventListener("wheel", (e)=>{
    //         console.log(e);
    //         if(e.deltaY > 0){
    //             this.lerp.target += 0.01;
    //         }else{
    //             this.lerp.target -= 0.01;
    //         }
    //     })
    // }

    resize(){
    }

    update(){
        // this.lerp.current = GSAP.utils.interpolate(
        //     this.lerp.current,
        //     this.lerp.target,
        //     this.lerp.ease
        // );

        // this.curve.getPoint(this.lerp.current % 1, this.position);
        // this.camera.orthographicCamera.position.copy(this.position);

        // this.directionalVector.subVectors(this.curve.getPointAt((this.lerp.current%1)+0.0000001), this.position);
        // this.directionalVector.normalize();
        // this.crossVector.crossVectors(this.directionalVector, this.staticVector);
        // this.crossVector.multiplyScalar(1000000000);
        // this.camera.orthographicCamera.lookAt(this.crossVector);



        // this.lerp.target = GSAP.utils.clamp(0,1,this.lerp.target);
        // this.lerp.current = GSAP.utils.clamp(0,1,this.lerp.current);
        // this.curve.getPointAt(this.lerp.current%1, this.position);
        // this.curve.getPointAt((this.lerp.current+0.0001)%1, this.lookAtPosition);
        // console.log(this.lerp.current);
        // this.camera.orthographicCamera.position.copy(this.position);
        // this.camera.orthographicCamera.lookAt(this.lookAtPosition);
    }
}