<template>
    <div>
        <el-container>
            <el-aside id="navAside" >
                <el-menu id="test" class="el-menu-vertical-demo" :default-openeds="['1','2','3']" :style="`height: ${goodNavAsideHeight}px`" @select="GetSelectedItem">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-mobile-phone"></i>
                        <span>Machines</span>
                        </template>
                        <el-menu-item index="1-1" @click="CreateComputer">Ordinateur <i>1 carte réseau</i></el-menu-item>
                        <el-menu-item index="1-2">Ordinateur <i>2 cartes réseaux</i></el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>Commutateurs</span>
                        </template>
                        <el-menu-item index="2-1" @click="CreateHub">Hub</el-menu-item>
                        <el-menu-item index="2-2" @click="CreateCommutateur">Switch</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-sort"></i>
                        <span>Câbles</span>
                        </template>
                        <el-menu-item index="3-1" @click="CreateCable">Simple</el-menu-item>
                        <el-menu-item index="3-2" @click="CreateCable">Croisé</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main :style="`height: ${goodNavAsideHeight}px; width: ${divWidth}px; padding: 0;`">
                <el-menu mode="horizontal" id="navTop">
                    <el-menu-item index="1">Processing Center</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">Workspace</template>
                            <el-menu-item index="2-1">item one</el-menu-item>
                            <el-menu-item index="2-2">item two</el-menu-item>
                            <el-menu-item index="2-3">item three</el-menu-item>
                            <el-submenu index="2-4">
                            <template slot="title">item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                    <el-menu-item index="3" disabled>Info</el-menu-item>
                    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
                </el-menu>
                <div :style="`height: ${divHeight}px; width: ${divWidth}px`">
                <canvas id="myCanva">
                    
                </canvas>
                </div>
               
            </el-main>
        </el-container>
    </div>
</template>

 
<!--script >

import Vue  from 'vue'
import * as PIXI from 'pixi.js'
import {Sprite} from 'pixi.js'
import {Renderer} from 'pixi.js'
//import {Computer} from '../../objects/ts/computer'
//import './app.js'
//import Render from './PixiRender.vue'

export default  {
    data() {
        return {
            divHeight: document.documentElement.clientHeight - 58,
            divWidth: document.documentElement.clientWidth
        }
    },
  mounted(){
      console.log(this.divWidth);
      this.Screen()
  },
  
methods: {

    Screen(){
        // GET the size of the current page
        var delWidth = document.getElementById("aside").offsetWidth;
        var divWidth = document.documentElement.clientWidth - delWidth;
        var divHeight = document.documentElement.clientHeight;
        var canva = document.getElementById('myCanva');
        var info = document.getElementById("test");
        let app = PIXI.Application({width: 3000, height: 3000, view: canva, backgroundColor: 0xE7E7E7, antialias: true, resolution: 1});
        console.log(renderer);
        document.body.appendChild(app.view);


        var link = new Object();
        var FromLink;
        var linking;

        // Create the main stage for your display objects
        var stage = new PIXI.Container();
        var cables = new PIXI.Container();

        // Initialize the pixi Graphics class
        var graphics = new PIXI.Graphics();
        var hub = new PIXI.Graphics();

        // Set a new fill color
        graphics.beginFill(0x3498db); // Blue



        // Draw a rectangle
        graphics.drawRect(10, 10, 75, 75); // drawRect(x, y, width, height)
        graphics.interactive = true;
        graphics.buttonMode = true;

        // Add a hit area..
        graphics.on('click', onCreateRect)

        stage.addChild(graphics);
        hub.beginFill(0x3498aa);
        hub.drawRect(10, 100 ,120, 30);
        hub.interactive = true;
        hub.buttonMode = true;

        hub.on('click',onCreateHub); 
        // Add the graphics to the stage

        stage.addChild(hub);

        // Add sprite to the stage
        // var superSquare = PIXI.Texture.fromImage('../../assets/BLAC.png');

        // 	superSquar e.x = 75;
        //   superSquare.y = 50;


        // Start animating
        animate();
        function animate() {
            //Render the stage
            renderer.render(stage);
            
            requestAnimationFrame(animate);
    }

function onCreateRect(){
    var computerContainer = new PIXI.Container();
    var computer = new PIXI.Graphics();
    var networkCard = new PIXI.Graphics();

    computer.beginFill(0x3498db); //orange

    // Draw rectangle
    computer.drawRect(240, 10, 120, 120); // drawRect(x, y, width, height)
    computer.endFill();
    
   
        // Mouse & touch 
        // drag and drop events
    
    networkCard.beginFill(0xFF700B);
    networkCard.drawRect((250),(computer.y + 20), 40, 40);
    networkCard.endFill();
    networkCard.interactive = true;
    networkCard.buttonMode = true;
    networkCard
                .on('click', onLinkStart); 
    link[networkCard] = networkCard; 
    
    computerContainer.addChild(computer);
    computerContainer.addChild(networkCard);
    computerContainer.interactive = true;
    computerContainer.buttonMode = true;
    computerContainer 
            .on('mousedown', onDragStart)
		    .on('touchstart', onDragStart)
		    .on('mouseup', onDragEnd)
		    .on('mouseupoutside', onDragEnd)
		    .on('touchend', onDragEnd)
		    .on('touchendoutside', onDragEnd)
		    .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);
    stage.addChild(computerContainer);
}

function onCreateHub(){
    var hubContainer = new PIXI.Container();
    var hub = new PIXI.Graphics();
    

    hub.beginFill(0x1238db); // Blue

    // Draw rectangle
    hub.drawRect(0, 40, 240, 60); // drawRect(x, y, width, height)
    hub.endFill();
    hubContainer.addChild(hub);

    for (var i = 0; i < 4; i++)
    {
        var port = new PIXI.Graphics()  
        port.beginFill(0xFF700B);
        port.drawRect((40+(40 * i)) ,50, 20,20 )
        port.endFill();
        port.interactive = true;
        port.buttonMode = true;
        port.on('click', onLinkStart);
        hubContainer.addChild(port);
    }
   



    hubContainer.interactive = true;
    hubContainer.buttonMode = true;  
    hubContainer
        // Mouse & touch 
        // drag and drop events

        .on('mousedown', onDragStart)
		.on('touchstart', onDragStart)
		.on('mouseup', onDragEnd)
		.on('mouseupoutside', onDragEnd)
		.on('touchend', onDragEnd)
	    .on('touchendoutside', onDragEnd)
		.on('mousemove', onDragMove)
        .on('touchmove', onDragMove)
        
    stage.addChild(hubContainer);
}


function onLink(destinator,receptor){  
    if (linking){
        console.log(destinator.x, destinator.y);
        console.log (receptor.x , receptor.y)
       var cable = new PIXI.Graphics()
      cable.beginFill(0x32CD32);
      cable
            .lineStyle(7,0x32CD32)
            .moveTo(receptor.x,desinator.y )
            .lineTo(destinator.x ,destinator.y )
                
        
        stage.addChild(cable)
        onLinkEnd();
    }
}
function onLinkStart(event){

    console.log(mousePosition);
  
    if (linking)
    {
        
        var toLink = mousePosition
        onLink(FromLink, toLink);
    } else{

          FromLink = mousePosition
         
          linking = true;
    }
}
function onLinkEnd(){
    linking = false;
}



</script-->


<script >
import * as PIXI from 'pixi.js';
import{Renderer} from 'pixi.js';
import {pixi_Computer} from'../../pixi_objects/ts/computer';
import { pixi_Hub } from '@/pixi_objects/ts/hub';
import { pixi_NetWorkCard } from '@/pixi_objects/ts/networkcard';
import { pixi_Router } from '@/pixi_objects/ts/routeur';
import { pixi_Switch } from '@/pixi_objects/ts/commutateur';
import { pixi_Cable } from '@/pixi_objects/ts/cable';
import { pixi_Port} from '@/pixi_objects/ts/port';

export default {
    data() {
        return {
            divHeight: null,
            divWidth: null,
            navWidth: null,
            navHeight: null,
            navTop: null,
            goodNavAsideHeight: null,
            stage: null,
            renderer: null,
            selectedIndex: null,
            firstObj: null,
            secondObj: null,
            ViWork: null,   
            linking: boolean, 
            cable: null,  
        }
    },
    mounted() {
        this.GetElement();
        this.RunPixi();
    },

    methods: {
        GetElement() {
            var navWidth = document.getElementById("navAside").offsetWidth;
            console.log("Largeur de barre latérale " + navWidth);

            this.navTop = document.getElementById("navTop").offsetHeight;
            console.log("Hauteur de la petite navBar " + this.navTop);

            this.navHeight = document.getElementById("header").offsetHeight;
            console.log("Hauteur de barre nav " + this.navHeight);

            this.goodNavAsideHeight = document.documentElement.clientHeight - this.navHeight;
            console.log("Hauteur de la barre latérale : " + this.goodNavAsideHeight);

            this.divHeight = document.documentElement.clientHeight - this.navHeight - this.navTop - 6;
            console.log("Hauteur après calcul " + this.divHeight);
            
            this.divWidth = document.documentElement.clientWidth - navWidth - 1;
            console.log("Largeur après calcul " + this.divWidth);
        },
        GetSelectedItem(key){
            this.selectedIndex = key
        },

        RunPixi() {
            this.ViWork = [];
            let type = "canvas";
            if(!PIXI.utils.isWebGLSupported()){
                 type = "canvas";
            }

            PIXI.utils.sayHello(type); 

            //Create a Pixi Application
            var myView = document.getElementById('myCanva');
            console.log(myView);
            this.renderer = new PIXI.WebGLRenderer(this.divWidth, this.divHeight ,{backgroundColor: 0xE7E7E7, view: myView,});
            
            this.stage = new PIXI.Container();
            this.stage.width = 1800;
            this.stage.height = 1600;
           

        },

        CreateComputer(){
            let computer = new pixi_Computer(this.linking);    
            computer.SetPosition(0,0);
            computer.draw(this.stage,this.renderer);
            var singleObj = {};
            singleObj['type'] = 'computer';
            singleObj['value'] = computer;
            this.ViWork.push(singleObj)
            this.Interaction();
            console.log(this.ViWork);
        },

        CreateCommutateur(){
            let commutateur = new pixi_Switch(this.linking);
            commutateur.SetPosition(0,0);
            commutateur.draw(this.stage, this.renderer);
            var singleObj = {};
            singleObj['type'] = 'switch';
            singleObj['value'] = commutateur;
            this.ViWork.push(singleObj);
            this.Interaction();
            console.log(this.ViWork);
        },

        CreateRouter(){
            let router = new pixi_Router;
            router.SetPosition(0,0);
            router.draw(this.stage, this.renderer);
            var singleObj = {};
            singleObj['type'] = 'router';
            singleObj['value'] = router;
            this.ViWork.push(singleObj);
            this.Interaction();
            console.log(this.ViWork);
        },
        

        CreateHub(){
            let hub = new pixi_Hub;
            hub.SetPosition(0,0);
            hub.draw(this.stage, this.renderer);
            var singleObj = {};
            singleObj['type'] = 'hub';
            singleObj['value'] = hub;
            this.ViWork.push(singleObj);
            this.Interaction();
            console.log(this.ViWork);
        },

        CreateCable(){
         this.linking= true;    
        },

        Interaction(){
            this.ViWork.forEach(element => {
                if (element.type !== "NetWorkCard" || "Port" ){
                    element.value.Move(element.value);

                    if(element.value.NwCart){
                        element.value.NwCart.forEach(NwCart => {
                           this.Connection(NwCart.value)
                        })
                    } else{
                        element.value.ListPort.forEach(Port =>{
                            this.Connection(Port.value)
                        })
                    }

                } 
                
            });
        },
        
        Connection (NtC){
            NtC.sprite.interactive = true;
            NtC.sprite.buttonMode = true;
            NtC.sprite.on("click",ConnectNetWorkCard)

            function ConnectNetWorkCard(event){
            
                var mousePosition = event.data.position
                var linking = this.linking
            
                    if (!this.linking && !NtC.cable ){
                  
                        NtC.cable = new pixi_Cable(true);
                        console.log(NtC.cable)
                        Plug(NtC.cable.material)
                        NtC.cable.destinatorX = NtC.stage.position.x;
                        NtC.cable.destinatorY = NtC.stage.position.y;
                        console.log('bg', NtC)
                        this.cable = NtC.cable;
                        this.linking = true;
                        console.log()
                    } else if(this.linking)
                    {
                        console.log("wow", NtC)
                        Connect(this.cable);
                    } else {
                       console.log('Man there is a problem: you already plug a cable...');
                    }       

            function Connect (cable){
                if (linking && cable){
                    Plug(cable.material)
                
                    cable.receptorX = NtC.stage.position.x;
                    cable.receptorY = NtC.stage.position.y;
                    console.log("he ho")
                    cable.draw(this.container,this.renderer);
                    console.log("ca a marcher"); 
                    this.linking = false;
                }
            }

            function Plug(cable){

                if (NtC.material.port){          
                    NtC.material.port.on_plug(cable); 
                    NtC.ChangeTexture();  
                } else {
                    NtC.material.on_plug(cable);
                    NtC.ChangeTexture();
                }
               
        }   
    }
                    
},

    
        
        returnIndex(key) {
            console.log(key)
        }
    }
}

    
  </script>

<style lang="scss">
#myCanva {
    height: 100%;
    width: 100%;
};
</style>

