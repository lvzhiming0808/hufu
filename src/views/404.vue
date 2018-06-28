<template>
  <div>
    <div class="box">

    </div>
    <img :src="img_404">
  </div>
</template>

<script>
 import img_404 from '@/assets/404_images/404.png'
 import img_404_cloud from '@/assets/404_images/404_cloud.png'

 export default {
   data() {
     return {
       img_404,
       img_404_cloud
     }
   }
 }

</script>
 <style lang="scss">
.box {
  width: 100px;
  height: 100px;
}
 </style>