// Vue router setup
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import requireAuth from './helpers/requireAuth';

// Components
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'

import Test from './components/Test.vue'
import About from './components/About.vue'

import ViWork from './components/app/ViWork.vue'
import SchemaList from './components/app/components/SchemaList.vue'
import ShareGroup from './components/app/components/ShareGroup.vue'
import ShareUser from './components/app/components/ShareUser.vue'

import Alert from './components/Alert.vue'

import ClassList from './components/classes/ClassList.vue'
import ClassEdit from './components/classes/ClassEdit.vue'

import StudentList from './components/students/StudentList.vue'
import StudentEdit from './components/students/StudentEdit.vue'

import TeacherList from './components/teachers/TeacherList.vue'
import TeacherEdit from './components/teachers/TeacherEdit.vue'
import TeacherAssign from './components/teachers/TeacherAssign.vue'

import FollowingList from './components/github/FollowingList.vue'
import PixiTest from './components/PixiTest.vue'

const routes = [
    { path: '', component: Home, },
    { path: '/test', component: Test},
    { path: '/about', component: About},

    { path: '/app/viwork', component: ViWork, beforeEnter: requireAuth,
        children: 
        [
            {
            path: 'schemalist',
            component: SchemaList
            },
            {
            path: 'sharegroup',
            component: ShareGroup
            },
            {
            path: 'shareuser',
            component: ShareUser
            },
        ] 
    },
    //{ path: '/app/viwork/schemalist', component: SchemaList, beforeEnter: requireAuth },

    { path: '/alert', component: Alert},
    
    { path: '/login', component: Login },
    { path: '/logout', component: Logout, beforeEnter: requireAuth },

    { path: '/classes', component: ClassList, beforeEnter: requireAuth },
    { path: '/classes/:mode([create|edit]+)/:id?', component: ClassEdit, beforeEnter: requireAuth },

    { path: '/students', component: StudentList, beforeEnter: requireAuth },
    { path: '/students/:mode([create|edit]+)/:id?', component: StudentEdit, beforeEnter: requireAuth },

    { path: '/teachers', component: TeacherList, beforeEnter: requireAuth },
    { path: '/teachers/:mode([create|edit]+)/:id?', component: TeacherEdit, beforeEnter: requireAuth },
    { path: '/teachers/assign/:id', component: TeacherAssign, beforeEnter: requireAuth },

    { path: '/github/following', component: FollowingList, beforeEnter: requireAuth, meta: { requiredProviders: ['GitHub'] } }
];

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});