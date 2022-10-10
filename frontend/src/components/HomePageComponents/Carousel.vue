<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <hr with="100%">
    <div class="carouseComponent">
        <div class="row container-fuild">
            <div id="demo" class="carouselQC col-sm-9 carousel slide" data-ride="carousel" data-interval="2500">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" class="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                </ol>

                <!-- The slideshow -->
                <div class="carousel-inner" role="listbox">
                    <div class="carousel-item "> 
                    <img v-for="(slide,i) in khuyenmai" :key="i" :src="`/${slide.KM_HinhAnh}`" >
                     </div>

                    <!-- <div class="carousel-item active">
                        <img src="../../images/TriAnThang10.png" alt="Chicago" class="img-fluid">
                    </div>
                    <div class="carousel-item">
                        <img src="../../images/TriAnThang10.png" alt="New York" class="img-fluid">
                    </div>
                    <div class="carousel-item">
                        <img src="../../images/TriAnThang10.png" alt="Chicago" class="img-fluid">
                    </div> -->
                </div>
                <a class="carousel-control-prev" href="#demo" data-slide="prev">
                    <span class="fas fa-angle-left"></span>
                </a>
                <a class="carousel-control-next" href="#demo" data-slide="next">
                    <span class="fas fa-angle-right"></span>
                </a>

            </div>
            <div class="col-sm-3 carouselImage">
                <img src="../../images/CarouselImage.png" class="img-fluid" alt="Image">
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: `Carousel`,
    props: ["khuyenmai"],
    components: {
    },
};
</script>

<style>
hr {
    margin-top: 2px;
    margin-bottom: 2px;
    color: #D9D9D9;

}
.carouseComponent {
    text-align: center;
    width: 99%;
    display: block;
    margin-top: 1px;
    height: 264px;
    border-radius: 6px;
    background-color: #929292;
    text-align: center;
}
.carouseComponent .row {
    border: 1px red;
    border-radius: 6px;
    height: 264px;
    background-color: #929292;
    padding-right: 0px;
}

.carouseComponent .row img {
    border-radius: 3px;
    height: 256px;
    text-align: center;
}

.carouseComponent .row .carouselQC { 
    height: 256px;
    display: inline;
   padding: 4px;
    float: left;
}

.carouseComponent .row .carouselImage {
    display: inline;
    padding: 4px;
    height: 256px;
}

.fas {
    color: #515151;
    font-size: 30px;
}

</style>