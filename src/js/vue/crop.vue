<template>
    <div class="vue-crop">
        <div class="overlay" v-show="bShowOverlay" @mousemove="dragging" @mouseup="endDrag">
            <div class="block-crop">
                <div class="box-crop">
                    <img :src="src" @load="initPosition">
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
                <button class="btn btn-login" type="button" @click="crop">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    var startX, startY, distanceX, distanceY;
    var domSelection, domBoxCrop;
    var boxWidth = 0, boxHeight = 0;
    var boxRect;
    var isDragging = false;
    var nw, nh;

    export default {
        data () {
            return {
                src: "",
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
                posterWidth: 1080,
                posterHeight: 764,
                img: null
            }
        },
        methods: {
            setImage ( src ) {
                if ( this.src === src ) {
                    return this;
                }

                this.src = src;
                this.posX = null;
                this.posY = null;
                this.shadeRightWidth = null;
                this.shadeBottomHeight = null;
                this.selectionWidth = null;
                this.selectionHeight = null;
                this.type = null;
                this.img = null;
                return this;
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

                var rect = domSelection.getBoundingClientRect();
                var canMoveX = true,
                    canMoveY = true,
                    canScaleX = true,
                    canScaleY = true;

                distanceX = ev.clientX - startX;
                distanceY = ev.clientY - startY;

                switch ( this.type ) {
                    case "pan":
                        if ( this.posX === 0 && (ev.clientX < boxRect.left + 100) ) {
                            canMoveX = false;
                        }
                        if ( this.shadeRightWidth === 0 && (ev.clientX > boxRect.left + boxWidth - 100) ) {
                            canMoveX = false;
                        }
                        canMoveX && (this.posX += distanceX);
                        if ( this.posX < 0 ) {
                            this.posX = 0;
                        } else if ( this.posX + rect.width > boxWidth ) {
                            this.posX = boxWidth - rect.width;
                        }

                        if ( this.posY === 0 && (ev.clientY < boxRect.top + 100) ) {
                            canMoveY = false;
                        }
                        if ( this.shadeBottomHeight === 0 && (ev.clientY > boxRect.top + boxHeight - 100) ) {
                            canMoveY = false;
                        }
                        canMoveY && (this.posY += distanceY);
                        if ( this.posY < 0 ) {
                            this.posY = 0;
                        }
                        if ( this.posY + rect.height > boxHeight ) {
                            this.posY = boxHeight - rect.height;
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
                        if ( this.shadeBottomHeight === 0 && (ev.clientY > boxRect.top + rect.height) ) {
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
                        if ( this.shadeRightWidth === 0 && (ev.clientX > boxRect.left + boxWidth) ) {
                            canScaleX = false;
                        }
                        if ( canScaleX ) {
                            this.selectionWidth += distanceX;
                        }
                        if ( this.posX + this.selectionWidth > boxWidth ) {
                            this.selectionWidth = boxWidth - this.posX;
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

                        if ( this.shadeBottomHeight === 0 && (ev.clientY > boxRect.top + boxHeight) ) {
                            canScaleY = false;
                        }
                        if ( canScaleY ) {
                            this.selectionHeight += distanceY;
                        }
                        if ( this.posY + this.selectionHeight > boxHeight ) {
                            this.selectionHeight = boxHeight - this.posY;
                        }
                        break;
                    case "se":
                        if ( this.shadeRightWidth === 0 && (ev.clientX > boxRect.left + boxWidth) ) {
                            canScaleX = false;
                        }
                        if ( rect.width < this.minWidth ) {
                            canScaleX = false;
                        }
                        if ( canScaleX ) {
                            this.selectionWidth += distanceX;
                        }
                        if ( this.posX + this.selectionWidth > boxWidth ) {
                            this.selectionWidth = boxWidth - this.posX;
                        }
                        if ( this.selectionWidth < this.minWidth ) {
                            this.selectionWidth = this.minWidth;
                        }

                        if ( this.shadeBottomHeight === 0 && (ev.clientY > boxRect.top + boxHeight) ) {
                            canScaleY = false;
                        }
                        if ( rect.height < this.minHeight ) {
                            canScaleY = false;
                        }
                        if ( canScaleY ) {
                            this.selectionHeight += distanceY;
                        }
                        if ( this.posY + this.selectionHeight > boxHeight ) {
                            this.selectionHeight = boxHeight - this.posY;
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
                this.shadeRightWidth = boxWidth - this.selectionWidth - this.posX;
                this.shadeRightWidth = this.shadeRightWidth < 0 ? 0 : this.shadeRightWidth;
                this.shadeBottomHeight = boxHeight - this.selectionHeight - this.posY;
                this.shadeBottomHeight = this.shadeBottomHeight < 0 ? 0 : this.shadeBottomHeight;
            },
            crop () {
                var canvas = document.createElement( 'canvas' ),
                    ctx = canvas.getContext( '2d' );
                canvas.width = this.posterWidth;
                canvas.height = this.posterHeight;

                ctx.drawImage( this.img,
                    this.posX * nw / boxWidth, this.posY * nh / boxHeight,
//                    0,0,
                    this.posterWidth, this.posterHeight,
                    0, 0,
                    this.posterWidth, this.posterHeight );
                this.$emit( 'crop', canvas );
                this.bShowOverlay = false;
                document.body.classList.remove( 'overhidden' );
            },
            initPosition ( ev ) {
                domBoxCrop = this.$el.querySelector( '.box-crop' );
                domSelection = this.$el.querySelector( '.crop-selection' );

                boxRect = domBoxCrop.getBoundingClientRect();
                boxWidth = domBoxCrop.offsetWidth;
                boxHeight = domBoxCrop.offsetHeight;

                this.posX = 0;
                this.posY = 0;
                this.img = ev.target;
                nw = this.img.naturalWidth;
                nh = this.img.naturalHeight;
                this.selectionWidth = this.posterWidth * boxWidth / nw;
                this.selectionHeight = this.posterHeight * boxHeight / nh;
                this.refreshShades();
            }
        }
    }
</script>
