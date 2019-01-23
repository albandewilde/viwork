<template>
    <div>
        <el-container>
            <el-aside id="navAside" style="height: 100%">
                <el-menu id="test" class="el-menu-vertical-demo" :default-openeds="['1','2','3']" default-active="3-1" :style="`height: ${goodNavAsideHeight}px`">
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
                        <span>Matériels</span>
                        </template>
                        <el-menu-item index="2-1" @click="CreateHub">Hub</el-menu-item>
                        <el-menu-item index="2-2" @click="CreateCommutateur">Switch</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-sort"></i>
                        <span>Câbles</span>
                        </template>
                        <el-menu-item index="3-1" @click="simpleCableChoosen = true">Simple</el-menu-item>
                        <el-menu-item index="3-2" @click="simpleCableChoosen = false">Croisé</el-menu-item>
                    </el-submenu>
                      <el-button @click="ShowMessage()">TEST</el-button>
                </el-menu>
            </el-aside>
            <el-main :style="`height: 100%; width: 100%; padding: 0;`">
                <el-menu mode="horizontal" id="navTop">
                    <el-menu-item index="1" @click="Sending = true">Envoyer un message</el-menu-item>
                </el-menu>
                
                <div class="thisCanva" style="height: 100%; width: 100%;">
                    <canvas id="myCanva" style="width: 100%; height: 100%"></canvas>
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
            <el-dialog title="Boite de réception" :visible.sync="DisplayMessage" with="30%"> 
                <span> {{message}} </span>
                  <span slot="footer" class="dialog-footer">
                <el-button @click="CloseMessage">Quitter </el-button> 
                  </span>
            </el-dialog>

            <el-dialog title="Envoyer un message" :visible.sync="Sending" width="30%">
                <span>
                    <el-form :inline="true">
                            <el-form-item label="De :">
                                <el-select v-model="sourceComputer" placeholder="Adresse Source">
                                    <el-option 
                                        v-for="item in NwCardList" 
                                        :label="item.value"
                                        :key="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="A :">
                                <el-select v-model="destinationComputer" placeholder="Adresse Destinataire">
                                    <el-option 
                                        v-for="item in NwCardList"
                                        :label="item.value"
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
            message: '',
            simpleCableChoosen: true,
            NwCardList: [],
            DisplayMessage: false
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

            this.CreateComputer();
        },

        GetAllNetworkCard(computer){
            var mac_addr = []
            computer.material.network_cards.forEach(NtC => { mac_addr.push(NtC.mac_addr) });      
            for(var i = 0; i < mac_addr.length ;i++){
                 var obj = [];
                obj['key'] = computer;
                obj['value'] = mac_addr[i];

                this.NwCardList.push(obj)
            }
        },     
        GetComputerWithMacAdress(MacAddr){
            this.ViWork.forEach(element => {
            
                if(element.type === "computer"){
                    var mac_addr = []
                    
                    element.value.material.network_cards.forEach(NtC => { mac_addr.push(NtC.mac_addr) });
                    for(var i = 0; i < mac_addr.length; i++){
                        if(MacAddr === mac_addr[i]){
                        
                            return element.value;
                        }
                    }
                }
            })

        },

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
            this.GetAllNetworkCard(computer )
            this.Interaction();
            this.computerDialog = false;
            this.nbNetCard = 1;
            this.keepPacket = true;
            this.inversPin = false;
        },

        CreateCommutateur(){
            let commutateur = new pixi_Switch();
            commutateur.SetPosition(100,100);
            commutateur.draw(this.stage, this.renderer);
            var singleObj = {};
            singleObj['type'] = 'switch';
            singleObj['value'] = commutateur;
            this.ViWork.push(singleObj);
            this.Interaction();

        },

        CreateRouter(){
            let router = new pixi_Router;
            router.SetPosition(100,100);
            router.draw(this.stage, this.renderer);
            var singleObj = {};
            singleObj['type'] = 'router';
            singleObj['value'] = router;
            this.ViWork.push(singleObj);
            this.Interaction();
    
        },
        
        CreateHub(){
            let hub = new pixi_Hub;
            hub.SetPosition(100,100);
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

        ShowMessage(computer, current){
            computer.Mail.interactive = true;
            computer.Mail.buttonMode = true;
            computer.Mail.on("click", Message)

            function Message (){
                current.DisplayMessageBox(computer)
            }
            
        },

        CloseMessage(){
            this.ViWork.forEach(element => {
                if (element.type === "computer"){
                    element.value.previousMessage = null;
                    element.value.CheckLastRecv()

                }
            })
            this.DisplayMessage = false
        },

        DisplayMessageBox(computer){
            console.log("hey")
            this.message = computer.material.last_recv;
            this.DisplayMessage = true;

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

            if (element.type === "computer"){
                this.ShowMessage(element.value, this);
            }
           
            });
        },

        SendMessage(sourceComputer, destinationAddress, message){
           try {
               sourceComputer.material.send_thing(message,destinationAddress,0);
               var computer 
               this.ViWork.forEach(element => {
            
                    if(element.type === "computer"){
                        var mac_addr = []
                        
                        element.value.material.network_cards.forEach(NtC => { mac_addr.push(NtC.mac_addr) });
                        for(var i = 0; i < mac_addr.length; i++){
                            if(destinationAddress === mac_addr[i]){
                            
                                computer = element.value;
                            }
                        }
                    }
                })
               computer.previousMessage = message
               computer.CheckLastRecv();
               this.Sending = false
           } catch (error) {
               console.log(error)
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
        if(!NtC.material.port){
             if(NtC.material.port) {crosseh = false} else crosseh = true                 
        } else {
            if(NtC.material) {crosseh = false} else crosseh = true    
        }
        NtC.cable = new pixi_Cable(crosseh);                    
        NtC.cable.SetDestinator(NtC);   
        this.cable = NtC.cable;
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
                this.cable.material.port_b = NtC.material.port;
                this.cable.material.plug(this.cable.material.port_b);                       
            } else if (this.linking === false ) {
            this.cable.material.port_a = NtC.material.port
            this.cable.material.plug(this.cable.material.port_a)        
            }
                         
        } else{
            if (this.linking === true){
                this.cable.material.port_b = NtC.material;
                this.cable.material.plug(this.cable.material.port_b);               
            } else if (this.linking === false ) {
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

