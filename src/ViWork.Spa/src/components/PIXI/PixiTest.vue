<template>
    <div>
        <el-container>
            <el-aside id="navAside" >
                <el-menu id="test" class="el-menu-vertical-demo" :default-openeds="['1','2','3']" :style="`height: ${goodNavAsideHeight}px`" @select="returnIndex">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-mobile-phone"></i>
                        <span>Machines</span>
                        </template>
                        <el-menu-item index="1-1">Ordinateur <i>1 carte réseau</i></el-menu-item>
                        <el-menu-item index="1-2">Ordinateur <i>2 cartes réseaux</i></el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>Commutateurs</span>
                        </template>
                        <el-menu-item index="2-1">Hub</el-menu-item>
                        <el-menu-item index="2-2">Switch</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-sort"></i>
                        <span>Câbles</span>
                        </template>
                        <el-menu-item index="3-1">Simple</el-menu-item>
                        <el-menu-item index="3-2">Croisé</el-menu-item>
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

<script type="text/javascript">
import * as PIXI from 'pixi.js';

export default {
    data() {
        return {
            divHeight: null,
            divWidth: null,
            navWidth: null,
            navHeight: null,
            navTop: null,
            goodNavAsideHeight: null
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

        RunPixi() {
            let type = "WebGL"
            if(!PIXI.utils.isWebGLSupported()){
            type = "canvas"
            }

            PIXI.utils.sayHello(type); 

            //Create a Pixi Application
            var myView = document.getElementById('myCanva');
            console.log(myView);
            let app = new PIXI.Application({width: 10000, height: 10000, backgroundColor: 0xF8F8F8, view: myView,});

        },
        
        returnIndex(key) {
            console.log(key);
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

