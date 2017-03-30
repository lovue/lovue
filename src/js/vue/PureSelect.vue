<template>
    <dl class="vue-pure-select">
        <dt>
            <template v-for="(elem, key) of elems">
                <input :id="key" type="radio" :name="name" :value="key" v-model="value">
                <span>{{elem}}</span>
            </template>
        </dt>
        <dd>
            <label :for="key" v-for="(elem, key) of elems">{{elem}}</label>
        </dd>
    </dl>
</template>

<script>
    export default {
        data () {
            return {
                value: "benke"
            }
        },
        props: {
            name: String,
            elems: Object
        }
    }
</script>