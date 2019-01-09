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
                        <el-menu-item index="1-2" @click="ShowMessage">test <i>2 cartes réseaux</i></el-menu-item>
                        
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
                <!-- The Modal -->
                <div id="myModal" class="modal">

                <!-- Modal content -->
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                    </div>

                    <div class="modal-body">
                        <form @submit="onSubmit($event)" >
                        <div class="form-group">
                           
                            <select class="form-control" >
                                Choisissez l'adresse mac de reception
                                <option v-for="c of ViWork"  :value="c.value.material.last_recv" :key="c.type"  >
                                  {{c.value.material}}
                                </option>
                             </select>
                               <input type="text" v-model="message" class="form-control" >
                            <button type="submit" class="btn btn-primary">Envoyer</button>

                         </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>

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
            ViWork: null,   
            linking: null, 
            cable: null,  
            previous: null,
            message: null,
            modal: null,
            span: null,
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
            this.modal = document.getElementById("myModal");
            this.span =  document.getElementsByClassName("close")[0]
            this.span.onclick = function() {
                modal.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == this.modal) {
                    current.modal.style.display = "none";
                }
            }
            this.ViWork = [];
            this.linking = false;       
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
            this.stage.interactive = true;
           

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
        },

        CreateCable(){
         this.linking= true;    
        },
        ShowMessage(){
            this.ViWork.forEach(element=> {
                if(element.type === 'computer'){
                console.log(element.value)
                  
                   console.log( element.value.material.last_recv)
                }
            })
        },

        Interaction(){
            this.ViWork.forEach(element => {
                if (element.value.NwCart || element.value.ListPort ){
                    element.value.Move(element.value);

                    if(element.value.NwCart){
                        element.value.NwCart.forEach(NwCart => {
                         
                           this.Connection(NwCart.value, this)
                        })
                    } else{
                        element.value.ListPort.forEach(Port =>{
         
                            this.Connection(Port.value, this)
                        })
                    }

                } else if (element.type === "computer"){
                    this.SendMessage(element.value,this);
                }
                
            });
        },
        SendMessage(computer, current){
            computer.sprite.interactive = true;
            computer.sprite.buttonMode = true;
            computer.sprite.on('click', ShowModal)
            function ShowModal(){
                console.log("hey")
                current.modal.style.display = "block";
                
            }
        },


        Connection (NtC, current){
            NtC.sprite.interactive = true;
            NtC.sprite.buttonMode = true;
            NtC.sprite.on("pointertap",Link)
                    

            function Link(){
                onDragEnd(NtC);
                current.ConnectNetWorkCard(NtC)
            }
           

            function onDragEnd(NtC) {
                console.log(NtC)
                NtC.stage.alpha = 1
                NtC.stage.dragging = false;
                
                NtC.SetPosition( NtC.stage.x, NtC.stage.y)
    
            
                // set the interaction data to null
                
            }
           
    },
     
    ConnectNetWorkCard(NtC){

        if (this.linking === true && this.previous){
        
           this.ConnectOff(NtC)             

        } else if (this.linking === false && this.previous !== NtC ){
            this.ConnectOn(NtC); 
            this.linking = true;       
                   
         }
    },

    ConnectOn(NtC){
        var crosseh
      
        if(NtC.material.port) {crosseh = false} else crosseh = true
        console.log(crosseh)
        NtC.cable = new pixi_Cable(crosseh);                    
        NtC.cable.destinatorX = NtC.stage.position.x;
        NtC.cable.destinatorY = NtC.stage.position.y;
        
        this.cable = NtC.cable
        this.Plug(NtC);
        this.previous = NtC;
      
    },

 

    ConnectOff( NtC){
        if(this.linking === true ){
        
            this.Connect(NtC);      
            NtC.ChangeTexture();
            this.previous.ChangeTexture();

            NtC.cable = this.cable;
            NtC.cable.cross_eh = this.previous.cable.cross_eh
            this.previous.cable = NtC.cable;
            
            this.linking = false  
            this.previous = null    
            this.cable = null;  
            NtC.cable.draw(this.stage, this.renderer);   
         
        } 
    },

    Connect (Ntc){
        if (this.linking === true && this.cable){
            Ntc.cable = this.cable
            this.Plug(Ntc, this.cable)
            this.cable.receptorX = Ntc.stage.position.x;
            this.cable.receptorY = Ntc.stage.position.y;          
            console.log("Connecter"); 
        }
    },

    Plug(NtC,cable){
        if (NtC.material.port){     
            if (this.linking === true){
                console.log("Wesh 2")
                this.cable.material.port_b = NtC.material.port;
                this.cable.material.plug(this.cable.material.port_b);                       
            } else if (this.linking === false ) {
            console.log("wesh")
            console.log(this.cable)
            this.cable.material.port_a = NtC.material.port
            this.cable.material.plug(this.cable.material.port_a)        
            }
                         
        } else{
            if (this.linking === true){
                console.log("wesh 4")
                this.cable.material.port_b = NtC.material;
                this.cable.material.plug(this.cable.material.port_b);               
            } else if (this.linking === false ) {
                console.log("wesh 3")
                this.cable.material.port_a = NtC.material;
                this.cable.material.plug(this.cable.material.port_a);   
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

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  -webkit-animation-name: fadeIn; /* Fade in the background */
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s
}

/* Modal Content */
.modal-content {
  position: fixed;
  bottom: 0;
  background-color: #fefefe;
  width: 100%;
  -webkit-animation-name: slideIn;
  -webkit-animation-duration: 0.4s;
  animation-name: slideIn;
  animation-duration: 0.4s
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

/* Add Animation */
@-webkit-keyframes slideIn {
  from {bottom: -300px; opacity: 0} 
  to {bottom: 0; opacity: 1}
}

@keyframes slideIn {
  from {bottom: -300px; opacity: 0}
  to {bottom: 0; opacity: 1}
}

@-webkit-keyframes fadeIn {
  from {opacity: 0} 
  to {opacity: 1}
}

@keyframes fadeIn {
  from {opacity: 0} 
  to {opacity: 1}
}
</style>

