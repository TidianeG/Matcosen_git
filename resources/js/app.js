/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('@fortawesome/fontawesome-free/scss/brands.scss');
require('@fortawesome/fontawesome-free/scss/fontawesome.scss');
require('@fortawesome/fontawesome-free/scss/regular.scss');
require('@fortawesome/fontawesome-free/scss/solid.scss');
require('sweetalert2');
window.Vue = require('vue');
import Swal from 'sweetalert2';
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});

//Fonctionalite qui permet d'ajouter des produit dans un panier de commande

let form = document.getElementById("panier_form");
let indice_cart = document.getElementById('indice_cart');
let indice = document.getElementById('indice');
let indiceH = document.getElementById('indiceH');
$('form.add-to-cart').submit(function (e) {
    e.preventDefault();
    let form_data = $(this).serialize();
    
    //alert(form_data);
    $.ajax({
        type: "POST",
        url: '/ajout_panier',
        data: form_data,
        success: function (data) {
            if(data.success){
                indice_cart.innerHTML=parseInt(indice.value)+1;

                indice.value=parseInt(indice.value)+1;
              //  $('.indice').innerHTML=indice.value;
                indiceH.value=indice.value;
               // var valeur = document.forms['ID_FORMULAIRE'].elements['inputStoreID'].value;
                $(`form#${data.id} button`).html('produit ajouter au panier');
                console.log("Tout va bien");
                Swal.fire({
                    title: 'Produit Ajout?? dans le panier!',
                    text: 'Do you want to continue',
                    icon: 'success',
                    html:'<a href="/panier" class="btn btn-success" style="color:white;">Ouvrir le panier</a>',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Ajouter d\'autres produits!',
                    confirmButtonAriaLabel: 'Ajouter d\'autres produits!'
                });
            }else{
                console.log("il y une erreur");
            }
        }
    })
})
/*form.addEventListener('submit', function (e) {
    e.preventDefault();
    let donnees_formulaire = $(this).serialize();
    $.ajax({
        type: "POST",
        url: '/admin/edit_category',
        data: donnees_formulaire,
        success: function(data){
            window.location.href = '{{url('/admin/categories')}}'
        }
    });
})*/;
function minusqty(e) {
//update when press button -
e.preventDefault()

let quantity = qty.val();
let quaty=quantity-1;
let prix=price.val();



$.ajax({
   url: '/panier.php',
    method: 'GET',
    data: {qty: quaty, price: prix },
    cache: false,
    dataType: 'html',
    success: function(data) {

    },
});
}
function plusqty(e) {
//update when press button -
e.preventDefault()

let quantity1 = qty.val();
let quaty1=quantity-(-1);
let prix1=price.val();



$.ajax({
   url: '/panier.php',
    method: 'GET',
    data: {qty: qty1, price: prix1 },
    cache: false,
    dataType: 'html',
    success: function(data) {

    },
});

}