<template>
    <div>
        <div class="mb-4">
            <h1>Assigner une classe à un élève</h1>
        </div>

        <form @submit="onSubmit($event)" v-if="model">
            <div class="form-group">
                <label class="required">Classe assignée : </label>
                <select class="form-control" v-model="model.classId">
                    <option :value="0">Aucune classe</option>
                    
                    <option v-for="c of Classes" :value="c.classId" >
                        {{ c.name }}
                    </option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Assigner</button>
        </form>
    </div>
</template>

<script>
    import { getStudentAssignedClassAsync, assignStudentToclassAsync } from '../../api/studentApi'
    import { getClassListAsync } from '../../api/classApi'

    export default {
        data () {
            return {
                model: null,
                studentId: null,
                Classes: []
            }
        },

        async mounted() {
            this.studentId = this.$route.params.id;

            try {
                this.model = await getStudentAssignedClassAsync(this.studentId);
                this.Classes = await getClassListAsync();
                

                if(this.model.classId > 0) this.Classes.push(this.model);
            }
            catch(e) {
                console.error(e);
                return this.redirectToList();
            }
        },

        methods: {
            redirectToList() {
                this.$router.replace('/students');
            },

            async onSubmit(event) {
                event.preventDefault();

                try {
                    await assignStudentToclassAsync(this.studentId, this.model.classId);
                    this.redirectToList();
                }
                catch(e) {
                    console.error(e);
                }
            }
        }
    }
</script>

<style lang="scss">

</style>