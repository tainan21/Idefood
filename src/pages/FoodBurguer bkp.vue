<template>
    <div class="surface-card overflow-hidden">
        <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:relative">
            <a class="flex align-items-center">
                <img :src="'layout/images/logo-' + logoColor + '.svg'" alt="Sakai Logo" height="50" class="mr-0 lg-5 :mr-2"><span class="text-900 font-medium line-height-5 mr-8">GalaxyBurguer</span>
            </a>
            <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple
                v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                <i class="pi pi-bars text-4xl"></i>
            </a>
            <div class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full surface-overlay left-0 px-6 lg:px-0 z-2" style="top:92%">
                <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                </ul>
                <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                    <Button label="Login" class="p-button-text p-button-rounded border-none font-light line-height-2 text-blue-500"></Button>
                    <Button label="Register" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 bg-blue-500"></Button>
                </div>
            </div>
        </div>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Cardápio</h5>
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-6 text-left">
								<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
							</div>
							<div class="col-6 text-right">
								<DataViewLayoutOptions v-model="layout" />
							</div>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full">
								<img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.name}}</div>
									<div class="mb-3">{{slotProps.data.description}}</div>
									<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" class="mb-2"></Rating>
									<div class="flex align-items-center">
										<i class="pi pi-tag mr-2"></i>
										<span class="font-semibold">{{slotProps.data.category}}</span>
									</div>

								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
									<span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${{slotProps.data.price}}</span>
									<Button @click="add_product(slotProps.data)" icon="pi pi-shopping-cart" label="Add to Cart" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'" class="mb-2"></Button>
									<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
								</div>
							</div>
						</div>
					</template>

					<template #grid="slotProps">
						<div class="col-12 md:col-4">
							<div class="card m-3 border-1 surface-border">
								<div class="flex align-items-center justify-content-between">
									<div class="flex align-items-center">
										<i class="pi pi-tag mr-2"></i>
										<span class="font-semibold">{{slotProps.data.category}}</span>
									</div>
									<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
								</div>
								<div class="text-center">
									<img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-9 shadow-2 my-3 mx-0"/>
									<div class="text-2xl font-bold">{{slotProps.data.name}}</div>
									<div class="mb-3">{{slotProps.data.description}}</div>
									<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
								</div>
								<div class="flex align-items-center justify-content-between">
                                    <Toast />
                                    <span class="text-2xl font-semibold">${{slotProps.data.price}}</span>
                                    <Button  icon="pi pi-shopping-cart" @click="save" ></Button>
                                    <Button @click="add_product(slotProps.data)"   icon="pi pi-shopping-cart" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
								</div>
							</div>
						</div>
					</template>
				</DataView>
                <div>
                    <Toast />
                        <Button type="button" icon="pi pi-search" :label="selectedProduct ? selectedProduct.name : 'Select a Product'" @click="toggle" aria:haspopup="true" aria-controls="overlay_panel" />

                        <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 400px" :breakpoints="{'600px': '60vw'}">
                            <DataTable :value="products" v-model:selection="selectedProduct" selectionMode="single" :paginator="true" :rows="5" @rowSelect="onProductSelect" responsiveLayout="scroll" >
                                <Column field="name" header="Name" sortable style="width: 50%"></Column>
                                <Column header="Image" style="width: 10%">
                                    <template #body="slotProps">
                                        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image" class="product-image" />
                                    </template>
                                </Column>
                                <Column field="price" header="Price" sortable style="width: 10%">
                                    <template #body="slotProps">
                                        {{formatCurrency(slotProps.data.price)}}
                                    </template>
                                </Column>
                            </DataTable>
                        </OverlayPanel>
                </div>
			</div>
		</div>	
	</div>

        <div class="py-4 px-4 mx-0 mt-8 lg:mx-8">
            <div class="col-12 md:col-7">
                <div class="grid text-center md:text-left">
                    <div class="col-12 md:col-3">
                        <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">teste</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-4 px-4 mx-0 mt-8 lg:mx-8">
            <div class="grid justify-content-between">
                <div class="col-12 md:col-2" style="margin-top:-1.5rem;">
                    <div class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3">
                        <img :src="'layout/images/logo-' + logoColor + '.svg'" alt="footer sections" width="50" height="50" class="mr-2">
                        <h4 class="font-medium text-3xl text-900">Food Burguer</h4>
                    </div>
                </div>

                <div class="col-12 md:col-7">
                    <div class="grid text-center md:text-left">
                        <div class="col-12 md:col-3">
                            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">teste fundo</h4>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">About Us</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">News</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Investor Relations</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Careers</a>
                            <a class="line-height-3 text-xl block cursor-pointer text-700">Media Kit</a>
                        </div>
                        
                        <div class="col-12 md:col-3 mt-4 md:mt-0">
                            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Resources</h4>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Get Started</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Learn</a>
                            <a class="line-height-3 text-xl block cursor-pointer text-700">Case Studies</a>
                        </div>
        
                        <div class="col-12 md:col-3 mt-4 md:mt-0">
                            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Community</h4>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Discord</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Events<img src="layout/images/new-badge.svg" class="ml-2"/></a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">FAQ</a>
                            <a class="line-height-3 text-xl block cursor-pointer text-700">Blog</a>
                        </div>
        
                        <div class="col-12 md:col-3 mt-4 md:mt-0">
                            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Legal</h4>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Brand Policy</a>
                            <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Privacy Policy</a>
                            <a class="line-height-3 text-xl block cursor-pointer text-700">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ProductService from "../service/ProductService";
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';

	export default {
		data() {
			return {
				car:[],
				picklistValue: [[
					{name: 'San Francisco', code: 'SF'},
					{name: 'London', code: 'LDN'},
					{name: 'Paris', code: 'PRS'},
					{name: 'Istanbul', code: 'IST'},
					{name: 'Berlin', code: 'BRL'},
					{name: 'Barcelona', code: 'BRC'},
					{name: 'Rome', code: 'RM'},
				],[]],
				orderlistValue: [
					{name: 'San Francisco', code: 'SF'},
					{name: 'London', code: 'LDN'},
					{name: 'Paris', code: 'PRS'},
					{name: 'Istanbul', code: 'IST'},
					{name: 'Berlin', code: 'BRL'},
					{name: 'Barcelona', code: 'BRC'},
					{name: 'Rome', code: 'RM'},
				],
				dataviewValue: null,
				layout: 'grid',
				sortKey: null,
				sortOrder: null,
				sortField: null,
				sortOptions: [
					{label: 'Price High to Low', value: '!price'},
					{label: 'Price Low to High', value: 'price'},
				],
                items: [
                    {
                        label: 'Update',
                        icon: 'pi pi-refresh',
                        command: () => {
                            this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
                        }
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times',
                        command: () => {
                            this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                        }
                    },
                    {
                        label: 'Vue Website',
                        icon: 'pi pi-external-link',
                        command: () => {
                            window.location.href = 'https://vuejs.org/'
                        }
                    },
                    {   label: 'Upload',
                        icon: 'pi pi-upload',
                        command: () => {
                            window.location.hash = "/fileupload"
                        }
                    }
                ]
			}
		},
		productService: null,
		created() {
			this.productService = new ProductService();
		},
		mounted() {
			this.productService.getProducts().then(data => this.dataviewValue = data);
		},
		methods: {
            save() {
                this.$toast.add({severity: 'success', summary: 'Produto adcionado!', detail: 'Data Saved', life: 3000});
            },
			onSortChange(event){
				const value = event.value.value;
				const sortValue = event.value;

				if (value.indexOf('!') === 0) {
					this.sortOrder = -1;
					this.sortField = value.substring(1, value.length);
					this.sortKey = sortValue;
				}
				else {
					this.sortOrder = 1;
					this.sortField = value;
					this.sortKey = sortValue;
				}
			},
			add_product(data){
				this.car.push(data)
				let total = 0
				this.car.forEach(element => {
					total += element.price
				});
				console.log(total)
			},
		},
        emits: ['change-theme'],
        computed: {
            logoColor() {
                if (this.$appState.darkTheme) return 'white';
                return 'dark';
            },
        },
        setup() {
            onMounted(() => {
                productService.value.getProductsSmall().then(data => products.value = data);
            })
            const toast = useToast();
            const op = ref();
            const productService = ref(new ProductService());
            const products = ref();
            const selectedProduct = ref();
            const toggle = (event) => {
                op.value.toggle(event);
            };
            const formatCurrency = (value) => {
                return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
            };
            const onProductSelect = (event) => {
                op.value.hide();
                toast.add({severity:'info', summary: 'Product Selected', detail: event.data.name, life: 3000});
            };

            return { op, productService, products, selectedProduct, toggle, formatCurrency, onProductSelect}
        }
	}
</script>


<style scoped lang="scss">
@import '../assets/demo/badges.scss';
</style>

<style>
#hero{
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%);
    height:700px;
    overflow:hidden;
}

@media screen and (min-width: 768px) {
    #hero{
        -webkit-clip-path: ellipse(150% 87% at 93% 13%);
        clip-path: ellipse(150% 87% at 93% 13%);
        height: 430px;
    }
}

@media screen and (min-width: 1300px){
    #hero > img {
        position: absolute;
    }

    #hero > div > p { 
        max-width: 450px;
    }
}

@media screen and (max-width: 1300px){
    #hero {
        height: 600px;
    }

    #hero > img {
        position:static;
        transform: scale(1);
        margin-left: auto;
    }

    #hero > div {
        width: 100%;
    }

    #hero > div > p {
        width: 100%;
        max-width: 100%;
    }
}

</style>