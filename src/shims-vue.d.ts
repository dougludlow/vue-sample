
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module 'vue-datetime' {
    import Vue from 'vue';
    export class Datetime extends Vue {}
}
