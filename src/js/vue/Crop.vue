<template>
    <div class="vue-crop">
        <div class="btn-file">
            <button class="btn" type="button">上传</button>
            <input type="file" accept="image/gif,image/jpeg,image/x-png,image/tiff,image/x-ms-bmp" @change="selectImage">
        </div>
        <div class="preview" ref="preview"></div>
        <div class="overlay" v-show="bShowOverlay" @mousemove="dragging" @mouseup="endDrag">
            <div class="block-crop">
                <div ref="boxCrop" class="box-crop">
                    <img id="cropImage" @load="initPosition">
                    <div class="crop-shades">
                        <div class="shade shade-top" :style="`height: ${posY}px;`"></div>
                        <div class="shade shade-left" :style="`top: ${posY}px; width: ${posX}px; height: ${selectionHeight}px;`"></div>
                        <div class="shade shade-right" :style="`top: ${posY}px; width: ${shadeRightWidth}px; height: ${selectionHeight}px;`"></div>
                        <div class="shade shade-bottom" :style="`height: ${shadeBottomHeight}px;`"></div>
                    </div>
                    <div class="crop-selection" @mousedown="startDrag('pan',$event)" :style="`left: ${posX}px; top: ${posY}px; width: ${selectionWidth}px; height: ${selectionHeight}px;`">
                        <!--<div class="crop-drag-point ord-nw" @mousedown.stop="startDrag('nw',$event)"></div>
                        <div class="crop-drag-point ord-ne" @mousedown.stop="startDrag('ne',$event)"></div>
                        <div class="crop-drag-point ord-sw" @mousedown.stop="startDrag('sw',$event)"></div>
                        <div class="crop-drag-point ord-se" @mousedown.stop="startDrag('se',$event)"></div>-->
                    </div>
                </div>
                <button class="btn" type="button" @click="crop">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    var startX, startY, distanceX, distanceY;
    var boxRect = {};
    var isDragging = false;
    var nw, nh;

    export default {
        data () {
            return {
                bShowOverlay: false,
                shadeRightWidth: null,
                shadeBottomHeight: null,
                posX: null,
                posY: null,
                selectionWidth: null,
                selectionHeight: null,
                type: null,
                minWidth: 400,
                minHeight: 300,
            }
        },
        props: {
            cropWidth: Number,
            cropHeight: Number
        },
        methods: {
            selectImage ( ev ) {
                const self = this;
                const bal = this.$root.$refs.alert;
                var input = ev.target;

                if ( input.files && input.files[ 0 ] ) {
                    let reader = new FileReader();
                    reader.onload = function ( ev ) {
                        let img = new Image;
                        img.src = ev.target.result;

                        if ( img.naturalWidth < self.cropWidth || img.naturalHeight < self.cropHeight ) {
                            self.canSubmit = false;
                            input.value = "";
                            bal.show( `图片尺寸小于${self.cropWidth}*${self.cropHeight}` );
                            return;
                        }

                        self.setImage( ev.target.result );
                    };
                    reader.readAsDataURL( input.files[ 0 ] );
                }
            },
            setImage ( src ) {
                cropImage.src = src;
                this.bShowOverlay = true;
                document.body.classList.add( 'overhidden' );
            },
            show () {
                this.bShowOverlay = true;
                document.body.classList.add( 'overhidden' );
            },
            startDrag ( type, ev ) {
                this.type = type;
                isDragging = true;
                startX = ev.clientX;
                startY = ev.clientY;
            },
            dragging ( ev ) {
                if ( !isDragging ) return;

                var canMoveX = true,
                    canMoveY = true,
                    canScaleX = true,
                    canScaleY = true;

                distanceX = ev.clientX - startX;
                distanceY = ev.clientY - startY;

                switch ( this.type ) {
                    case "pan":
                        //水平方向的移动处理
                        if ( this.posX === 0 && (ev.clientX < boxRect.left + 100) ) {
                            canMoveX = false;
                        }
                        if ( this.shadeRightWidth === 0 && (ev.clientX > boxRect.left + boxRect.width - 100) ) {
                            canMoveX = false;
                        }
                        canMoveX && (this.posX += distanceX);
                        if ( this.posX < 0 ) {
                            this.posX = 0;
                        } else if ( this.posX + this.selectionWidth > boxRect.width ) {
                            this.posX = boxRect.width - this.selectionWidth;
                        }

                        //垂直方向的移动处理
                        if ( this.posY === 0 && (ev.clientY < boxRect.top + 100) ) {
                            canMoveY = false;
                        }
                        if ( this.shadeBottomHeight === 0 && (ev.clientY > boxRect.top + boxRect.height - 100) ) {
                            canMoveY = false;
                        }
                        canMoveY && (this.posY += distanceY);
                        if ( this.posY < 0 ) {
                            this.posY = 0;
                        }
                        if ( this.posY + this.selectionHeight > boxRect.height ) {
                            this.posY = boxRect.height - this.selectionHeight;
                        }
                        break;
                    case "nw":
                        if ( this.posX === 0 && (ev.clientX < boxRect.left) ) {
                            canScaleX = false;
                        }
                        if ( canScaleX ) {
                            this.posX += distanceX;
                            this.selectionWidth -= distanceX;
                        }
                        if ( this.posX < 0 ) {
                            this.selectionWidth += this.posX;
                            this.posX = 0;
                        }

                        if ( this.posY === 0 && (ev.clientY < boxRect.top) ) {
                            canScaleY = false;
                        }
                        if ( this.shadeBottomHeight === 0 && (ev.clientY > boxRect.top + this.selectionHeight) ) {
                            canScaleY = false;
                        }
                        if ( canScaleY ) {
                            this.posY += distanceY;
                            this.selectionHeight -= distanceY;
                        }
                        if ( this.posY < 0 ) {
                            this.posY = 0;
                        }
                        break;
                    case "ne":
                        if ( this.shadeRightWidth === 0 && (ev.clientX > boxRect.left + boxRect.width) ) {
                            canScaleX = false;
                        }
                        if ( canScaleX ) {
                            this.selectionWidth += distanceX;
                        }
                        if ( this.posX + this.selectionWidth > boxRect.width ) {
                            this.selectionWidth = boxRect.width - this.posX;
                        }

                        if ( this.posY === 0 && (ev.clientY < boxRect.top) ) {
                            canScaleY = false;
                        }
                        if ( canScaleY ) {
                            this.posY += distanceY;
                            this.selectionHeight -= distanceY;
                        }
                        if ( this.posY < 0 ) {
                            this.selectionHeight += this.posY;
                            this.posY = 0;
                        }
                        break;
                    case "sw":
                        if ( this.posX <= 0 && (ev.clientX < boxRect.left) ) {
                            canScaleX = false;
                        }

                        if ( canScaleX ) {
                            this.posX += distanceX;
                            this.selectionWidth -= distanceX;
                        }
                        if ( this.posX < 0 ) {
                            this.selectionWidth += this.posX;
                            this.posX = 0;
                        }

                        if ( this.shadeBottomHeight === 0 && (ev.clientY > boxRect.top + boxRect.height) ) {
                            canScaleY = false;
                        }
                        if ( canScaleY ) {
                            this.selectionHeight += distanceY;
                        }
                        if ( this.posY + this.selectionHeight > boxRect.height ) {
                            this.selectionHeight = boxRect.height - this.posY;
                        }
                        break;
                    case "se":
                        if ( this.shadeRightWidth === 0 && (ev.clientX > boxRect.left + boxRect.width) ) {
                            canScaleX = false;
                        }
                        if ( this.selectionWidth < this.minWidth ) {
                            canScaleX = false;
                        }
                        if ( canScaleX ) {
                            this.selectionWidth += distanceX;
                        }
                        if ( this.posX + this.selectionWidth > boxRect.width ) {
                            this.selectionWidth = boxRect.width - this.posX;
                        }
                        if ( this.selectionWidth < this.minWidth ) {
                            this.selectionWidth = this.minWidth;
                        }

                        if ( this.shadeBottomHeight === 0 && (ev.clientY > boxRect.top + boxRect.height) ) {
                            canScaleY = false;
                        }
                        if ( this.selectionHeight < this.minHeight ) {
                            canScaleY = false;
                        }
                        if ( canScaleY ) {
                            this.selectionHeight += distanceY;
                        }
                        if ( this.posY + this.selectionHeight > boxRect.height ) {
                            this.selectionHeight = boxRect.height - this.posY;
                        }
                        if ( this.selectionHeight < this.minHeight ) {
                            this.selectionHeight = this.minHeight;
                        }
                        break;
                    default:
                        break;
                }

                startX = ev.clientX;
                startY = ev.clientY;

                this.refreshShades();
            },
            endDrag () {
                isDragging = false;
            },
            refreshShades () {
                this.shadeRightWidth = boxRect.width - this.selectionWidth - this.posX;
                this.shadeRightWidth = this.shadeRightWidth < 0 ? 0 : this.shadeRightWidth;
                this.shadeBottomHeight = boxRect.height - this.selectionHeight - this.posY;
                this.shadeBottomHeight = this.shadeBottomHeight < 0 ? 0 : this.shadeBottomHeight;
            },
            crop () {
                var canvas = document.createElement( 'canvas' ),
                    ctx = canvas.getContext( '2d' );
                canvas.width = this.cropWidth;
                canvas.height = this.cropHeight;

                ctx.drawImage( cropImage,
                    this.posX * nw / cropImage.offsetWidth, this.posY * nh / cropImage.offsetHeight,
//                    0,0,
                    this.cropWidth, this.cropHeight,
                    0, 0,
                    this.cropWidth, this.cropHeight );

                this.$refs.preview.innerHTML = "";
                this.$refs.preview.appendChild( canvas );
                this.bShowOverlay = false;
                document.body.classList.remove( 'overhidden' );
            },
            initPosition () {
                nw = cropImage.naturalWidth;
                nh = cropImage.naturalHeight;
                cropImage.className = nw / nh > 800 / 480 ? "img-w" : "img-h";

                boxRect = this.$refs.boxCrop.getBoundingClientRect();

                this.posX = 0;
                this.posY = 0;
                this.selectionWidth = Math.ceil( this.cropWidth * cropImage.offsetWidth / nw );
                this.selectionHeight = Math.ceil( this.cropHeight * cropImage.offsetHeight / nh );
                this.refreshShades();
            }
        }
    }
</script>
