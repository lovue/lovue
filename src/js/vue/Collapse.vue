<template>
    <div class="vue-collapse">
        <ul class="list">
            <li :class="classes[0]">
                <div class="clp-header" @click="setIndex(0)">First</div>
                <div class="clp-body">
                    <div class="clp-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </li>
            <li :class="classes[1]" @click="setIndex(1)">
                <div class="clp-header">Second</div>
                <div class="clp-body">
                    <div class="clp-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </li>
            <li :class="classes[2]" @click="setIndex(2)">
                <div class="clp-header">Third</div>
                <div class="clp-body">
                    <div class="clp-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                classes: [],
                index: 0
            }
        },
        methods: {
            setIndex (i) {
                this.classes = [];
                this.classes[i] = "focus";
            }
        },
        mounted () {
            this.classes[0] = "focus";
        }
    }
</script>