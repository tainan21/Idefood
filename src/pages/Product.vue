<template >
<Toast />
<div  style="background-color: #fff">
<div class="containerclass">
  <div id="btn-app">
        <div class="product">
            <router-link to="/FoodBurguer.vue" class="pi pi-fw pi-arrow-right testesicon"></router-link>
            <h5 class="productdetail">Detalhes do produto</h5>
        </div>
        <div class="product-box">
          <div class="product-img">
            <img :src="'images/product/' + product_[0].payload.image" alt="teste" class="shadow-2 my-3 mx-0 product_image" styleClass="product_image" imageStyle="product_image" containerStyle="width: 640px" width="100" preview/>
          </div>
        </div>
        <div class="flex product_list-info">
          <h5 class="text-black" style="margin-bottom: 10px; display: block; font-size: 16px; line-height: 120%; font-weight: 700;">{{product_[0].payload.name}}</h5>
            <h5 class="mb-3 pr-3 legenda" style="color: rgb(127, 143, 159); margin-bottom: 5px; font-size: 1rem; font-weight: 500; line-height: 150%; word-break: break-word;">{{product_[0].payload.description}}</h5>
            <span class="text-2xl font-semibold mb-2 " style=" color: rgb(48, 51, 60); margin-top: 10px; font-size: 16px; line-height: 120%; font-weight: bold; font: 'Work Sans', sans-serif;">R${{product_[0].payload.price}}</span>
        </div>
        
        <Accordion v-if="product_[0].payload.category == 'Lanches' || product_[0].payload.category == 'Tradicional'"  :activeIndex="1" style="width: 100%">
					<AccordionTab header="Adicionais">
            <div class="product_list" v-for="value in additional" :key="value.id">
                <p class="product_list_desc">{{value.name}}</p>
                <div class="product_list_price">
                <label for="checkOption1">{{formatCurrency(value.price)}}</label>
                        <input type="checkbox" v-model="value.selected" />
                </div>
            </div>
					</AccordionTab>
				</Accordion>
        <div class="grid grid-nogutter">
							<div class="col-12">        
                <div class="grid grid-nogutter">
                    <div class="col-6 md:col-6 sm:col-12 flex">
                      <Button :disabled="disabled_button" label="Adicionar Produto" class="p-button-raised p-button-rounde button-filter mr-2 mt-2"   icon="pi pi-shopping-cart" @click="add_productHome()" />
                    </div>
                    <div class="col-6 md:col-6 sm:col-12 flex">
                      <Button :disabled="disabled_button" label="Finalizar Compra" type="button" class="p-button-raised p-button-rounde button-filter mr-2 mt-2"  icon="pi pi-check" @click="add_product()"  />
                    </div>
                  </div>
             </div>
      </div>
      <div class="footer-separator"></div>
        
      <BottomNavigation
        class="bottom"
        :options="options"
        :badge-color="badgeColor"
        :foreground-color="foregroundColor"
        v-model="selected"
      />
  </div>
</div>
</div>
<Toast />
</template>

<script>
import BottomNavigation from "./../components/BottomNave.vue";
import ProductService from "../service/ProductService";
import PhotoService from "../service/PhotoService";

export default {
  name: "App",
  components: { BottomNavigation },
  data: () => ({
    disabled_button: false,
    carrinho: null,
    carrinho_recuperado: [],
    loading: [false, false, false],
    product_: null,
    selected: 1 ,
    options: [{id: 1, icon: "pi pi-home", title: "Home", path: '../pages/faça-seu-pedido', badge: null,},
		{ id: 2, icon: "pi pi-shopping-cart", title: "Carrinho", path: '../pages/carrinho', badge: null },
	],

    foregroundColor: "#000",
    badgeColor: "#000",
     productService: null,
     additional: null,
  }),
 
   created () {
      this.productService = new ProductService();
      const carrinho_salvo = window.localStorage.getItem('product')
      this.product_ = JSON.parse(carrinho_salvo);      
      this.photoService = new PhotoService();
  },
  mounted () {
    this.productService.getAdditional()
      .then((data) => (this.additional = data));
    this.photoService.getImages().then((images) => {
            this.images = images;
    });
  },
  
  methods: {
   
    showSuccess() {
      this.$toast.add({severity:'success', summary: 'Produto adicionado', detail:'Fique atento nos adicionais', life: 3000});
    },
    add_product() {
        const carrinho_salvo = window.localStorage.getItem("carrinho");
        if (carrinho_salvo) {
          this.carrinho_recuperado = JSON.parse(carrinho_salvo); 
          this.$router.push({ path: '/carrinho' })
        }
      
      this.carrinho_recuperado.push({ payload: this.add_additional() });
      window.localStorage.setItem("carrinho", JSON.stringify(this.carrinho_recuperado));
      
      
    },
      add_productHome() {
        this.showSuccess()
        this.disabled_button = true
        setTimeout(() => {
          const carrinho_salvo = window.localStorage.getItem("carrinho");
          if (carrinho_salvo) {
            this.carrinho_recuperado = JSON.parse(carrinho_salvo); 
            this.$router.push({ path: '/foodburguer' })         
          }           
          this.carrinho_recuperado.push({ payload: this.add_additional() });
          window.localStorage.setItem("carrinho", JSON.stringify(this.carrinho_recuperado));
          this.disabled_button = false
        }, 1500);
       
      
    },
    add_additional() {
		for (let index = 0; index < this.product_.length; index++) {			
				this.product_[index].additional = [];
       
				this.additional.forEach(element => {
					if(element.selected && this.product_[index].payload.additional)
						this.product_[index].payload.additional.push(element);          
				});                       
        return this.product_[0].payload
		} 
    },
   
    formatCurrency(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    
  },
};
</script>

<style scoped>
.footer-separator{
    margin-bottom: 100px;
}
.product_list-info{
  width: 100%;
  flex-direction: column;
}
.containerclass{
  margin: auto; 
  padding: 0 20px;
  max-width: 1000px;
  width: 100%;
}
#btn-app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
}
.product_image{
    width: 100% !important;
    height: 300px !important;
    background-size: cover;
    fill: cover;
}
img {
    cursor: pointer;
    width: 100% !important;
    height: 300px !important;
    background-size: cover;
    fill: cover;
}
.p-image-preview-container > img {
    cursor: pointer;
    width: 100% !important;
    height: 300px !important;
    background-size: cover;
    fill: cover;
}
.product-img{
  width: 100%;
  height: 368px;
}
.product-box{
  margin-right: 0px;
  -webkit-justify-content: center;
  justify-content: center;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  height: 100%;
  width: 100%;
}
.product_image{
  width: 100% !important;
    height: 300px !important;
    padding: 15px;
    object-fit: contain;
    -o-object-position: center;
    padding: 16px;
    object-position: center;
    width: 500px;
    aspect-ratio: auto 500 / 500;
    height: 500px
}
.product_image img{
  width: 100% !important; 
  border-radius: 4px; 
  margin-bottom: 20px;
  object-fit: contain;
  height: 200px;
}

@media only screen and (max-width: 600px) {
  .product_image{
    width: 90%;
  }

}

.product{
    height: 50px;
    width: 100%;
    margin: 0px;
    padding: 0px 16px;
    max-width: 1000px;
    border-bottom: 1px solid rgb(232, 234, 237);
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.productdetail{
    width: 100%;
    height: 90%;
    margin-left: 6px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.testesicon{
    transform: rotate(180deg);
    width: 40px;
    height: 35px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
    cursor: pointer;
}
.product_list{
    position: relative;
    margin: 0px 16px;
    padding: 10px 4px 10px 0px;
    border-bottom: 1px solid rgb(232, 234, 237);
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between
}
.product_list_desc{
    font-size: 14px;
    line-height: 150%;
    font-weight: 500;
    color: rgb(72, 84, 96);
}
.product_list_price{
    margin-right: 12px;
    font-size: 14px;
    line-height: 150%;
    font-weight: 600;
    text-align: right;
    white-space: nowrap;
    color: rgb(72, 84, 96);
}
.product_list_check{
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    pointer-events: none;
}
.button-filter{
  width: 100%;
}
</style>
