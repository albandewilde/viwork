<template>
    <div>
        <div class="mb-4">
            <h1>Classe : {{detail.className}}</h1>
        </div>
        {{detail}}
        {{teacher}}
    </div>
</template>

<script>
import { getClassDetailAsync } from '../../api/classApi'

export default {
    data() {
        return {
            detail: [],
            id: null,
            teacher: null,
            student: null
        }
    },

    async mounted() {
        this.id = this.$route.params.id;
        await this.refresh();
    },

    methods: {
        async refresh() {
            try{
                this.detail = await getClassDetailAsync(this.id)
                if(detail.teacherFirstName !== null){
                    teacher = detail.teacherFirstName
                }
            }
            catch(e){
                console.error(e);
            }
        }
    }
}
</script>

<style lang="scss">

</style>