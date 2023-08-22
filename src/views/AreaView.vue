<template>
    <div class="card">        
        <div class="card-content">
            <h5>Areas</h5>
            <tabs>
                <template v-slot:lista>                
                    <table class="highlight responsive-table ">
                        <thead>
                            <tr>
                                <th>Nombre</th>                            
                                <th>Operaciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in items">
                                <td>{{ item.name }}</td>                            
                                <td>
                                    <router-link :to="'/area/' + item.id"><i class="material-icons">create</i></router-link>
                                    <a href="#" @click="eliminarItem(item.id)"><i class="material-icons" style="color:red">delete_forever</i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </template>
                <template v-slot:nuevo>
                    <div class="card row">
                        <div class="card-content">
                            <h6>Crear Area</h6>
                            <form class="col s12" @submit.prevent="saveArea()">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="name" type="text" class="validate" v-model="payload.name">
                                        <label for="name"> Nombre</label>
                                    </div>
                                </div>                        
                                
                                <div class="row">
                                    <div class="input-field col s12">
                                        <button class="btn waves-effect waves-light red" type="submit" name="action">Crear
                                            <i class="material-icons right">send</i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </template>
            </tabs>
            <!-- <pre>{{ payload }}</pre> -->
        </div>
        
    </div>
</template>
  
<script>
import Tabs from '@/components/Tabs.vue'
import Search from '@/components/Search.vue'

export default {
    name: 'Areas',
    components: {
        Tabs,Search,
    },
    data() {        
        return {            
            items: [],
            payload: {
                name: '',                
            }
        }
    },
    methods: {
        getItems() {
            this.axios.get('/areas?_expand=states')
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
        },
        saveArea() {
            this.axios.post(
                '/areas', 
                this.payload
            )
            .then((response) => {
                this.payload = {
                    name: '',                        
                };
                
                this.getItems();
                alert('Área creada con éxito');
                
                console.log(response);
            });
        },
        eliminarItem(id) {
            if (confirm("Esta seguro de eliminar?")) {
                this.axios.delete('/areas/' + id)
                    .then((response) => {
                        this.getItems();                        
                        console.log(response);
                    });
            }
        },
        
    },
    mounted() {
        this.getItems();        
    },    
    created() {
        
    }
}
</script>

<style></style>