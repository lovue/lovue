<template>
    <transition name="fade">
        <div class="overlay vue-beauty-alert" v-show="bShowOverlay">
            <div class="box">
                <div class="text">{{text}}</div>
                <input class="input" type="text" v-if="bShowInput" v-model="inputs">
                <div class="bottom">
                    <button class="btn" type="button" @click.stop="confirm">确认</button>
                    <button class="btn btn-ghost" v-if="type === 'confirm'" type="button" @click.stop="cancel">取消</button>
                </div>
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
                this.reset();
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
                if ( this.callback ) {
                    this.callback( this.inputs );
                }
                this.bShowOverlay = false;
            },
            cancel () {
                this.bShowOverlay = false;
            },
            reset () {
                this.text = null;
                this.callback = null;
                this.type = null;
                this.inputs = null;
            }
        }
    }
</script>
