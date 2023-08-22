<template>
    <div class="card">        
        <div class="card-content">
            <h5>Empleados</h5>
            <tabs>
                <template v-slot:lista>
                    <search placeholder="Buscar empleado" @searchtext="searchFx($event)"></search>
                    <filter-group>
                        <filter-item :items="types" label="Filtro por Tipo de vehiculo"
                            @onfilter="onFilterFx('typesId', $event)">
                        </filter-item>
                    </filter-group>                    
                    <table class="highlight responsive-table ">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Area</th>
                                <th>Tipo</th>
                                <th>Color</th>
                                <th>Placa</th>                            
                                <th>Operaciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in items">
                                <td>{{ item.name }}</td>
                                <td>{{ item.areas.name }}</td>
                                <td>{{ item.types.name }}</td>
                                <td>{{ item.color }}</td>
                                <td>{{ item.placa }}</td>
                                <td>
                                    <router-link :to="'/empleado/' + item.id"><i class="material-icons">create</i></router-link>
                                    <a href="#" @click="eliminarItem(item.id)"><i class="material-icons" style="color:red">delete_forever</i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </template>
                <template v-slot:nuevo>
                    <div class="card row">
                        <div class="card-content">
                            <h6>Crear Empleado</h6>
                            <form class="col s12" @submit.prevent="saveEmpleado()">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="name" type="text" class="validate" v-model="payload.name">
                                        <label for="name"> Nombre</label>
                                    </div>
                                </div>                        
                                <div class="row" v-if="areas.length > 0">
                                    <div class="input-field col s12">
                                        <select v-model="payload.areasId">
                                            <option value="0" disabled selected>Elija un Area</option>
                                            <option v-for="(value, key) in areas" :key="key" :value="value.id">{{ value.name }}
                                            </option>
                                        </select>
                                        <label>Area</label>
                                    </div>
                                </div>
                                <div class="row" v-if="types.length > 0">
                                    <div class="input-field col s12">
                                        <select v-model="payload.typesId">
                                            <option value="0" disabled selected>Elija un Tipo</option>
                                            <option v-for="(value, key) in types" :key="key" :value="value.id">{{ value.name }}
                                            </option>
                                        </select>
                                        <label>Tipos</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="color" type="text" class="validate" v-model="payload.color">
                                        <label for="color"> Color</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="placa" type="text" class="validate" v-model="payload.placa">
                                        <label for="placa"> Placa</label>
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
import FilterGroup from '@/components/FilterGroup.vue';
import FilterItem from '@/components/FilterItem.vue';

export default {
    name: 'Empleados',
    components: {
        Tabs,Search,FilterGroup,FilterItem
    },
    data() {        
        return {            
            items: [],
            types: [],
            areas: [],
            toSearch: '',
            toFilter: '',
            payload: {
                name: '',
                areasId: 0,
                typesId: 0,
                color: '',
                placa: ''                
            }
        }
    },
    methods: {
        onFilterFx(field, event) {
            if (event === '') {
                this.toFilter = '';
            } else {
                this.toFilter = '&' + field + '=' + event;
            }
            this.getItems();
        },
        searchFx(event) {
            if (event === "") {
                this.toSearch = '';
            } else {
                this.toSearch = '&q=' + event;
            }
            this.getItems();
            console.log('search', event);
        },
        getItems() {
            this.axios.get('/employees?_expand=areas&_expand=types' + this.toSearch + this.toFilter)
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
        },
        getAreas() {
            this.axios.get('/areas')
                .then((response) => {
                    this.areas = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        getTipos() {
            this.axios.get('/types')
                .then((response) => {
                    this.types = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        saveEmpleado() {
            this.axios.post(
                '/employees', 
                this.payload
            )
            .then((response) => {
                this.payload = {
                    name: '',                        
                    areasId: 0,
                    typesId: 0,
                    color: '',
                    placa: ''
                };
                setTimeout(function () {
                    var elems = document.querySelectorAll('select');
                    var select = M.FormSelect.init(elems);
                });
                this.getItems();
                alert('Empleado creado con éxito');
                
                console.log(response);
            });
        },
        eliminarItem(id) {
            if (confirm("Esta seguro de eliminar?")) {
                this.axios.delete('/employees/' + id)
                    .then((response) => {
                        this.getItems();                        
                        console.log(response);
                    });
            }
        },
        
    },
    mounted() {
        this.getItems();      
        this.getAreas();
        this.getTipos();  
    },    
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style></style>