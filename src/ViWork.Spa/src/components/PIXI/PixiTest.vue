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
                        <el-menu-item index="1-1-1" @click="computerDialog = true">Ordinateur</el-menu-item>
                        
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
                    <el-menu-item index="1" @click="Sending = true">Envoyer un message</el-menu-item>
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
                <div :style="`height: ${divHeight}px; width: ${divWidth}px; background-color: 0xE7E7E7 !important`">
                <canvas id="myCanva" style="background-color: 0xE7E7E7 !important">
                    
                </canvas>
                </div>
               
            </el-main>
        </el-container>
            <el-dialog title="Paramètres de l'ordinateur" :visible.sync="computerDialog" width="30%">
                <span>
                    <el-form>
                        <el-form-item label="Nombre de cartes réseaux :">
                        <el-input-number v-model="nbNetCard" :min="1"></el-input-number>
                        </el-form-item>
                        <el-form-item label="Renvois les paquets :">
                            <el-switch v-model="keepPacket" ></el-switch>
                        </el-form-item>
                        <el-form-item label="Inversement des pins du ports :">
                            <el-switch v-model="inversPin"></el-switch>
                        </el-form-item>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="computerDialog = false">Annuler</el-button>
                    <el-button type="primary" @click="CreateComputer(nbNetCard, keepPacket, inversPin)">Créer</el-button>
                </span>
            </el-dialog>

            <el-dialog title="Envoyer un message" :visible.sync="Sending" width="30%">
                <span>
                    <el-form :inline="true">
                            <el-form-item label="De :">
                                <el-select v-model="sourceComputer" placeholder="Source">
                                    <el-option 
                                        v-for="item in ViWork" 
                                        :label="item.type"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="A :">
                                <el-select v-model="destinationComputer" placeholder="Destinataire">
                                    <el-option 
                                        v-for="item in ViWork"
                                        :label="item.type"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                    </el-form>
                    <el-form>
                        <el-form-item label="Votre message :">
                            <el-input type="textarea" :rows="7" placeholder="Ecrivez votre message" v-model="message"></el-input>
                        </el-form-item>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Sending = false">Annuler</el-button>
                    <el-button type="primary" @click="SendMessage(sourceComputer, destinationComputer, message)">Envoyer le message</el-button>
                </span>
            </el-dialog>

    </div>
</template>

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
            ViWork:  [],   
            linking: null, 
            cable: null,  
            previous: null,
            message: null,
            computerDialog: false,
            nbNetCard: 1,
            keepPacket: true,
            inversPin: false,
            Sending: false,
            sourceComputer: '',
            destinationComputer: '',
            message: ''
        }
    },
    mounted() {

        this.GetElement();
        this.RunPixi();

    },

    methods: {
        GetElement() {
            var navWidth = document.getElementById("navAside").offsetWidth;
            this.navTop = document.getElementById("navTop").offsetHeight;
            this.navHeight = document.getElementById("header").offsetHeight;
            this.goodNavAsideHeight = document.documentElement.clientHeight - this.navHeight;
            this.divHeight = document.documentElement.clientHeight - this.navHeight - this.navTop - 6;       
            this.divWidth = document.documentElement.clientWidth - navWidth - 1;
        },
        GetSelectedItem(key){
            this.selectedIndex = key
        },

        RunPixi() {
           
            this.linking = false;       
            let type = "canvas";
            if(!PIXI.utils.isWebGLSupported()){
                 type = "canvas";
            }

            PIXI.utils.sayHello(type); 

            //Create a Pixi Application
            var myView = document.getElementById('myCanva');
            this.renderer = new PIXI.WebGLRenderer(this.divWidth, this.divHeight,{transparent: false, backgroundColor: 0xE7E7E7, view: myView, resolution: 2,});
            console.log(this.renderer);
            this.renderer.backgroundColor = 0xE7E7E7;

            
            this.stage = new PIXI.Container();
            this.stage.width = 1800;
            this.stage.height = 1600;
            this.stage.interactive = true;
        },

        Get(){
            console.log(this.renderer);
        },


        GetAllNetworkCard(computer, current){
            computer.material.network_cards.forEach(NtC => {
            var obj = [];
            obj['key'] = computer;
            obj['value'] = NtC.mac_addr;
           
            if (this.NwCardList.length > 0){
                   
                   this.NwCardList.forEach(element => {
                        console.log(element.key)
                        if ( element.key === computer && element.value !== obj.value){
                           
                            console.log(obj.value)
                           this.NwCardList.push(obj)
                        }          
                    });      
             } else {
                    
                    this.NwCardList.push(obj)
                }
            })
            console.log(this.NwCardList)
        } ,
         
     
     

        CreateComputer(nbCard, packetKeepping, Pin){
            let computer = new pixi_Computer();
            computer.SetMaterial(nbCard, packetKeepping, Pin);
            computer.SetPosition(80,80);
            computer.draw(this.stage,this.renderer);
            var singleObj = {};
            singleObj['type'] = 'computer';
            singleObj['value'] = computer;
            this.ViWork.push(singleObj);
            console.log("Tu recherche ça " + this.ViWork);
            this.Interaction();
            this.computerDialog = false;
        },

        CreateCommutateur(){
            let commutateur = new pixi_Switch();
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
            }
            });
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
                NtC.stage.alpha = 1
                NtC.stage.dragging = false;
                
                NtC.SetPosition( NtC.stage.x, NtC.stage.y)
            
                // set the interaction data to null
                
            }
           
    },
     
    ConnectNetWorkCard(NtC){
      
   
        if (this.linking === true && this.previous !== NtC){
           this.previous = this.GetPrevious();
           this.ConnectOff(NtC);             

        } else if (this.linking === false && !this.previous  ){
            if(NtC.link !== true){
                this.ConnectOn(NtC); 
                this.linking = true;
            }           
         }
    },

    ConnectOn(NtC){
        var crosseh
        console.log(NtC)
        if(!NtC.material.port){
             if(NtC.material.port) {crosseh = false} else crosseh = true                 
        } else {
            if(NtC.material) {crosseh = false} else crosseh = true    
        }
        
        console.log(NtC.material)
        NtC.cable = new pixi_Cable(crosseh);                    
        NtC.cable.SetDestinator(NtC)
        
        
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
            NtC.link = this.linking;
            this.previous.link = this.linking
 
           
            NtC.cable.draw(this.stage, this.renderer);
            this.linking = false;  
            this.SetPrevious(null)
         
           
        } 
    },

    Connect (Ntc){
        if (this.linking === true && this.cable){
            Ntc.cable = this.cable
            this.Plug(Ntc, this.cable)
            this.cable.SetReceptor(Ntc);
        
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
        
        GetPrevious(){
            return this.previous;
        },

        SetPrevious(NtC){
            this.previous = NtC;
        },
    
        
        returnIndex(key) {
            console.log(key)
        },

        GetObjects(){
            this.ViWork.forEach(element => {
                if(element.value === 'computer'){
                    console.log(element);
                }
            // if (element.value.NwCart || element.value.ListPort ){
            //     element.value.Move(element.value);
            //     if(element.value.NwCart){
            //         element.value.NwCart.forEach(NwCart => {
            //             this.Connection(NwCart.value, this)
            //         })
            //     } else{
            //         element.value.ListPort.forEach(Port =>{
            //             this.Connection(Port.value, this)
            //         })
            //     }
            // }
            });
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

