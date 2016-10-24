<template>
    <transition name="fade">
        <div class="overlay vue-beauty-alert" v-show="bShowOverlay">
            <div class="box box-normal hvcenter">
                <div class="text">{{text}}</div>
                <input class="input" type="text" v-if="bShowInput" v-model="inputs">
                <button class="btn btn-hover" type="button" @click.stop="confirm">确认</button>
                <button class="btn" v-if="type === 'confirm'" type="button" @click.stop="cancel">取消</button>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data () {
            return {
                bShowOverlay: false,
                text: null,
                callback: null,
                type: null,
                inputs: null
            }
        },
        computed: {
            bShowInput () {
                return this.type === "input";
            }
        },
        methods: {
            show ( option, callback ) {
                this.bShowOverlay = true;
                this.callback = callback;

                if ( typeof option === "string" ) {
                    this.text = option;
                    return;
                }

                this.text = option.text;
                this.type = option.type;
                this.inputs = option.inputs;
            },
            confirm () {
                this.bShowOverlay = false;
                if ( this.callback ) {
                    this.callback( this.inputs );
                }
            },
            cancel () {
                this.bShowOverlay = false;
            }
        }
    }
</script>
