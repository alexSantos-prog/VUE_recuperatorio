<template>
  <main>
    <div class="navbar-fixed">  
      <nav class="red">
        <div class="nav-wrapper">
          <a href="/" class="brand-logo">VueJs - Proyecto</a> 
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li>      
              <router-link to="/">Inicio</router-link>
            </li>

            <li>      
              <router-link to="/areas">Areas</router-link>
            </li>
            <li>      
              <router-link to="/tipos">Tipos</router-link>
            </li>
            <li>      
              <router-link to="/empleados">Empleados</router-link>
            </li>        
          </ul>               
        </div>
      </nav>
    </div>
  
  
  
    <div class="container-fluid">
      <router-view/>
    </div>    
  </main>
  
</template>
<script>
  export default {
    name: 'AppView',
    data(){
      return {
        
      }
    },
    methods:{
      
    },
    created() {
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});

      });
    }
  }
</script>
<style>
  nav{
    padding-left: 10px;
    padding-right: 10px;
  }

  .container-fluid{
    padding: 0px 10px;
  }
</style>
