<template>
    <div class="containerclass" style="background-color: #fff">
        <div class="product">
            <router-link to="/faça-seu-pedido" class="pi pi-fw pi-arrow-right testesicon"></router-link>
            <h5 class="productdetail">{{nomeEmpresa}}</h5>
            <Button label="" icon="pi pi-trash" class="p-button p-component p-button-danger m-2"  @click="esvaziar_carrinho()"/>
        </div>
            <Fieldset legend="Meus Pedidos" :toggleable="true">
                  <div v-if="pedidos.length > 0">
                    <div class="md:card lg:card">
                    <div v-for="(pedido, index) in pedidos" :key="pedido.id" class="grid card_product">
                        <div class="col-12 flex align-items-center justify-content-between mb-0 border-title">
                            <div class="font-bold text-2xl text-black">{{pedido.payload.name}}</div>
                            <Button style="padding: 0" class="p-button-danger p-button-text " icon="pi pi-times"  @click="excluir_pedido(index)"/>
                        </div>
                        <!-- <img :src="'images/product/' + pedido.payload.image" :alt="pedido.payload.image" class="my-1 w-7 w-7rem shadow-2 mr-3 img-car" /> -->
                        <div class="flex-1 border-product">
                            <div class="mb-3 legenda ">{{pedido.payload.description}}</div>
                             <div class="text-left">
                                <div v-if="pedido.payload.additional.length > 0" class="mb-3 legenda">Adicionais:</div>
                            </div>
                            <div v-for=" (value) in pedido.payload.additional" :key="value.id" class="mb-1 legenda">
                                <div class="grid grid-nogutter">
                                    <div class="col-12 spacearound">
                                        <div class="">
                                            <span style="display: flex" class="flex-row">{{value.name}}</span> 
                                        </div>
                                        <div class="">
                                            <span class="">{{formatCurrency(value.price)}}</span>
                                            <Button  @click="excluir_additional(value.codigo, index)" style="padding: 0" class="p-button-danger p-button-text " icon="pi pi-times" />
                                        </div>
                                    </div>
                                </div>                             
                            </div>               
                            <div class="text-right">
                                <div class="mb-3 legenda">Total: R${{pedido.payload.total}}</div>
                            </div>    
                        </div>
                    </div> 
                </div>
                </div>	 
            </Fieldset>
          
     <!--
    
         <div class="field col-12 md:col-12 margin_border">
                <span class="p-float-label p-input-icon-left">
                    <i class="pi pi-user" />
                    <InputText class="input_formT" :class="{error: v$.nome.$error, success: !v$.nome.$error}" v-model="nome" @change="v$.nome.$touch()" id="nome" type="text"/>                                                      
                    <label for="nome" class="form_text">Primeiro nome</label>
                </span>
            </div>
            <div class="field col-12 md:col-8">
                <span class="p-float-label p-input-icon-left">
                    <i class="pi pi-map-marker" />
                    <InputText class="input_formT"  :class="{error: v$.address.$error, success: !v$.address.$error}" v-model="v$.address.$model" id="address"  type="text"/>
                    <label for="address" class="form_text">Endereço</label>
                </span>
            </div>
            <div class="field col-12 md:col-4">
                <span class="p-float-label p-input-icon-left">
                    <i class="pi pi-map-marker" />
                    <InputText class="input_formT"  :class="{error: v$.number.$error, success: !v$.number.$error}" v-model="v$.number.$model" id="number"  type="text"/>
                    <label for="number" class="form_text">Número</label>
                </span>
            </div>
                <div class="field col-12 md:col-6">
                <span class="p-float-label p-input-icon-left mt-5">
                    <i class="pi pi-map" />
                    <InputText class="input_formT"  :class="{error: v$.city.$error, success: !v$.city.$error}" v-model="v$.city.$model" id="city" type="text" />
                    <label for="city" class="form_text">Cidade</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <label for="state">Bairro</label>
                <Dropdown class="form_text" :class="{error: v$.bairro.$error, success: !v$.bairro.$error}" id="bairro" v-model="bairro" @change="v$.payMoney.$touch()" :options="dropdownItems" optionLabel="name" placeholder="Bairro"></Dropdown>
                <h6><span class="mr-1 mt-1 legenda" v-if="bairro" >Valor do Frete R$: {{bairro.price}}</span></h6>
            </div>
            <div class="field col-12 md:col-12 margin_border">
                <span class="p-float-label p-input-icon-left">
                    <i class="pi pi-user" />
                    <Textarea  class="" v-model="obsText" id="obsText" rows="3" type="text"/>                                                      
                    <label for="obsText" class="form_text">Deseja colocar alguma observação??</label>
                </span>
            </div>
            <div class="col-12 lg:col-12 md:col-12 sm:col-12 flex justify-content-around p-1">
                <SelectButton @click="event(payMoney)" :class="{error: v$.payMoney.$error, success: !v$.payMoney.$error}" id="payMoney" v-model="payMoney" @change="v$.payMoney.$touch()" :options="dropdownItemsMoney" optionLabel="name" class="p-1" />
            </div>
            <div class="text-center legenda col-12">Selecione para finalizar a compra!</div>
            <div class="text-center col-12">                          
                <div  v-if="payMoney &&  payMoney.name == 'Dinheiro'">
                    <span class="p-float-label p-input-icon-left">
                        <i class="pi pi-user" />
                        <h5 class="text-center legenda">De quanto será o troco?</h5>
                        <InputText :class="{error: v$.troco.$error, success: !v$.troco.$error}"  class="input_formT"  @change="v$.troco.$touch()"  v-model="troco" id="troco" type="text"/>    
                    </span>
                </div>
            </div>
            <div class="text-center col-12">                          
                <h5 class="text-center legenda">Deseja colocar sache de catchup Heinz?</h5>
                <ToggleButton v-model="toggleValue" onLabel="Sim" offLabel="Não" :style="{width: '10em'}"/>                    
            </div>
      -->
                <div class="grid grid-nogutter card">
                    <h5 class="text-center col-12">Informações</h5>
                    <div class="col-12 lg:col-12 md:col-12 sm:col-12 p-1">
                        <div class="p-fluid grid">
                            <div class="field col-12 md:col-12 margin_border">
                                <span class="p-float-label p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText class="input_formT" v-model="nome"  id="nome" type="text"/>                                                      
                                    <label for="nome" class="form_text">Primeiro nome</label>
                                </span>
                            </div>
                            <div class="field col-12 md:col-8">
                                <span class="p-float-label p-input-icon-left">
                                    <i class="pi pi-map-marker" />
                                    <InputText class="input_formT"  v-model="address" id="address"  type="text"/>
                                    <label for="address" class="form_text">Endereço</label>
                                </span>
                            </div>
                            <div class="field col-12 md:col-4">
                                <span class="p-float-label p-input-icon-left">
                                    <i class="pi pi-map-marker" />
                                    <InputText class="input_formT"  v-model="number" id="number"  type="text"/>
                                    <label for="number" class="form_text">Número</label>
                                </span>
                            </div>
                             <div class="field col-12 md:col-6">
                                <span class="p-float-label p-input-icon-left mt-5">
                                    <i class="pi pi-map" />
                                    <InputText class="input_formT"  v-model="city" id="city" type="text" />
                                    <label for="city" class="form_text">Cidade</label>
                                </span>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="state">Bairro</label>
                                <Dropdown class="form_text" id="bairro" v-model="bairro" :options="dropdownItems" optionLabel="name" placeholder="Bairro"></Dropdown>
                                <h6><span class="mr-1 mt-1 legenda" v-if="bairro" >Valor do Frete R$: {{bairro.price}}</span></h6>
                            </div>
                            <div class="field col-12 md:col-12 margin_border">
                                <span class="p-float-label p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <Textarea  class="" v-model="obsText" id="obsText" rows="3" type="text"/>                                                      
                                    <label for="obsText" class="form_text">Deseja colocar alguma observação??</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 lg:col-12 md:col-12 sm:col-12 p-3">
                        <div class="grid">
                            <div class="text-center col-12">Forma de Pagamento</div>
                            <div class="col-12 lg:col-12 md:col-12 sm:col-12 flex justify-content-around p-1">
                                <SelectButton @click="event(payMoney)" id="payMoney" v-model="payMoney" :options="dropdownItemsMoney" optionLabel="name" class="p-1" />
                            </div>
                            <div class="text-center legenda col-12">Selecione para finalizar a compra!</div>
                            <div class="text-center col-12">                          
                                <div  v-if="payMoney &&  payMoney.name == 'Dinheiro'">
                                    <span class="p-float-label p-input-icon-left">
                                        <i class="pi pi-user" />
                                        <h5 class="text-center legenda">De quanto será o troco?</h5>
                                        <InputText  class="input_formT" v-model="troco" id="troco" type="text"/>    
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center col-12">                          
                    <h6><span class="mr-1 mt-1 legenda">Valor Total R${{totalAdd}}</span></h6>
                    <Button icon="pi pi-whatsapp" label="Finalizar Pedido" name="buttonwpp" class="p-button p-component p-button-rounded p-button-success mr-2 mb-2 text-center" @click="format_text()"/>
                </div>
            </div>
            <div class="footer-separator"></div>
            <div id="btn-app"> 
                <BottomNavigation /> </div>
    </template>
    
    <script>
    import BottomNavigation from "../components/BottomNave.vue";
    
    
        export default {
            name: "App",
            components: { BottomNavigation },
            data() {
                return {
                    total: null,
                    nomeEmpresa: "Filtros Nobre",
                    selected: 1,
                    payMoney: "", 
                    troco: 0,              
                    carrinho: [],
                    bairro: "",
                    address: "",
                    city: "",
                    obsText: "",
                    number: "",
                    nome: "Preencher informações",
                    payment: "",
                    pedidos: [],
                    pedido_txt: '',
                    texto: '',
                    selectButtonValue2: null,
                    inputGroupValue: false,
                    knobValue: 20,
                    treeSelectNodes: null,
                    selectedNode: null,
                    selectButtonValue1: null,
                    url: 'https://api.whatsapp.com/send?phone=++5511947673377&text=',
                    toggleValue: null,
                    toggleValue2: null,
                    dropdownItem: null,
                    dropdownItems: [
                        {name: ' Meu Bairro ',  code: '', price: "Free"  },                     
                    ],
                    dropdownItemsMoney: [
                        {name: 'Dinheiro',  code: 'Option 1'},
                        {name: 'Cartão de crédito', code: 'Option 2'},
                        {name: 'Cartão de Débito', code: 'Option 3'},
                        {name: 'Pix', code: 'Option 4'},
                    ],
                }
            },
            created () {},
            computed: {
                totalnoAdd(){
                    let totalPedidos = 0
                    this.pedidos.forEach(element =>{
                        totalPedidos += element.payload.total                    
                    })
                    return  totalPedidos                               
                },
                totalAdd() { 
                                   
                    let total = 0
                    this.pedidos.forEach(element =>{
                        total += element.payload.total                    
                    })
                    this.bairro? total += this.bairro.price: null
                    return  total                                
                }
            },
            methods: {
                total_pedido(){
                    this.total = 0
                    this.pedidos.forEach(element =>{
                        this.total += element.payload.total                    
                    })
                    this.bairro? this.total += this.bairro.price: null
                    return  this.total 
    
                },
                testvalue(toggleValue){
                    console.log('AQUI EMM>', toggleValue);
                },
                excluir_pedido(index){
                    this.pedidos.splice(index, 1)                    
                    window.localStorage.setItem("carrinho", JSON.stringify(this.pedidos));                                                         
                    this.total_product() 
                },
              
             excluir_additional( code, index){                
                    let filteredAdditional  =  this.pedidos[index].payload.additional.filter(value => value.codigo != code);
                    this.pedidos[index].payload.additional = filteredAdditional      
                    window.localStorage.setItem("carrinho", JSON.stringify(this.pedidos));                                                         
                    this.total_product()                                          
                },
                
                formatCurrency(value){
                  return value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  });
                },
                format_text() {
                        if ( this.toggleValue  ) this.toggleValue2 = "sim"
                        else this.toggleValue2 = "não" 
                        this.pedido_txt += "Olá, me chamo " + this.nome + " \n Gostaria de fazer o seguinte pedido: \n"
                        this.pedidos.forEach(element => {
                        
                            this.pedido_txt += element.payload.name + " - Valor:  R$ " + element.payload.total +"\n"  
                            element.payload.additional.length > 0?  this.pedido_txt += "Adicional(is): \n"  : null
                            element.payload.additional.forEach(add =>{
                                 this.pedido_txt += add.name + "\n"
                            })
                            
                            this.pedido_txt += "\n ----------------------- \n\n"  
                        });
                        this.pedido_txt += "\n" + this.toggleValue2 + "\n"
                        this.pedido_txt += "Observações: " + this.obsText + ",\n"
                        this.pedido_txt += "frete: R$ " + this.bairro.price + "\n"                               
                        this.pedido_txt += "O pedido irá para o seguinte endereço: " + this.address +  ",\n"
                        this.pedido_txt += "Nº " + this.number +  ",\n"
                        this.pedido_txt += "Cidade: " + this.city + ",\n"
                        this.pedido_txt += "bairro: "+ this.bairro.name + "\n"
                        this.pedido_txt += "O metodo de pagamento será: " + this.payMoney.name + ": \n"     
                        this.payMoney.name == 'Dinheiro'?  this.pedido_txt +="Total a pagar: "+ this.total_pedido() + " Com troco para: " + this.troco + "\n" : null
                        this.pedido_txt += "total a ser pago: " + this.total_pedido()
                        this.pedido_txt =  window.encodeURIComponent(this.pedido_txt);
                        window.location.href= this.url + this.pedido_txt;
                },
                event(value){
                    if(value.name != 'Dinheiro'){
                        this.troco = 0
                    }
                },
                teste_getLocalStorage(){
                    const carrinho_salvo = window.localStorage.getItem('carrinho')
                    if(carrinho_salvo){
                        this.carrinho_recuperado = JSON.parse(carrinho_salvo)	                                      
                        for (let index = 0; index < this.carrinho_recuperado.length; index++) {
                           this.pedidos.push(this.carrinho_recuperado[index]);                        
                        }                    										
                    }		
                            
                },
                teste_localStorage_set() {
                   this.carrinho.push({ payload: this.pedidos });
                    window.localStorage.setItem("carrinho", JSON.stringify(this.carrinho));  
                },
                esvaziar_carrinho(){				
                    this.pedidos = []
                    window.localStorage.setItem('carrinho', JSON.stringify(this.pedidos))
                    //this.showRemove()
                },
                atualizar_carrinho(){				
                    let pedidos = []
                    window.localStorage.setItem('carrinho', JSON.stringify(pedidos))
                    this.teste_localStorage_set()
                    this.teste_getLocalStorage()
                    this.total_product()
                },
                total_product(){
                    let total = 0
                    for(let i = 0; i < this.pedidos.length; i++){   
                       
                        if(this.pedidos[i].payload.additional){
                            
                             for (let index = 0; index <  this.pedidos[i].payload.additional.length; index++) {
                                 
                            total +=  this.pedidos[i].payload.additional[index].price;
                            
                        }   
                        }      
                                                            
                        this.pedidos[i].payload.total = total + this.pedidos[i].payload.price
                        total = 0                    
                         
                }
                    
                },
                remove_product(index){
                    this.pedidos.splice(index, 1);
                    window.localStorage.setItem("carrinho", JSON.stringify(this.pedidos));
                },
            },
            mounted () {
                console.log(this.pedidos)
                this.teste_getLocalStorage()
                this.total_product()
                },
            }
    </script>
    
    <style scoped>
    .error{
        border-color: red!important;
    }
    .border-title{
        border-color: #e8eaed;
        padding: 10px 0;
        border-width: 1px;
        border-bottom-style: dashed;
    }
    .border-product{
        border-color: #e8eaed;
        padding: 5px 0 20px 0;
        margin-bottom: 20px;
        border-width: 1px;
        border-bottom-style: solid;
    }
    .spacearound{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .img-car{
        border-radius: 5px;
    }
    .card_product{
        cursor: pointer;
        margin-bottom: 2px;
        display: flex;
        flex-direction: row;;
        align-items: center;
    }
    .card_product::before{
        margin-bottom: 5px;
        border-bottom: 1px solid black;
    }
    .button-remove{
        position: absolute;
        top: 15px;
        right: 19px;
        transform: translate(50%,-50%);
        transform-origin: 100% 0;
        margin: 0;
    }
    .button-fechar{
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%,-50%);
        transform-origin: 100% 0;
        margin: 0;
    }
    .text-price{
        font: 14px "Work Sans", sans-serif;
        font-size: 24px;
        font-weight: bold;
        line-height: 120%;
        color: rgb(72, 84, 96);
    }
    .form_text{
        display: block;
        font-size: 14px;
        font-weight: bold;
        line-height: 150%;
        letter-spacing: 0.01em;
        color: rgb(72, 84, 96);
    }
    ::v-deep(b) {
        display: block;
    }
    ::v-deep(.p-card-body) {
        padding: 2rem;
    }
    .bartop{
        height: 28px;
        margin-bottom: 10px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        opacity: 1;
        color: rgb(255, 255, 255);
        background-color: rgba(48, 51, 60, 0.3);
    }
    .footer-separator{
        margin-bottom: 100px !important;
    }
    .rapidin{
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
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
        width: 100%;
        height: 300px;
        background-size: cover;
        fill: cover;
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
    .buttonadd{
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid rgb(0, 0, 0);
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        line-height: 150%;
        text-align: center;
        background: transparent;
        justify-content: center;
        color: rgb(0, 0, 0) !important;
    }
    .input_formT{
        outline: none;
        border: none;
        background: transparent;
        border-bottom: 1px solid rgba(5,5,5, 0.5);
        color: rgba(5,5,5, 0.5);;
    }
    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
        -webkit-text-fill-color: #000;
        -webkit-box-shadow: 0 0 0px 1000px #FFF inset;
    }
    input:-internal-autofill-selected {
        appearance: menulist-button;
        background-image: none !important;
        background-color:  rgba(5,5,5, 0.5) !important;
        color: #fefdf9 !important;
    }
    </style>
    
    