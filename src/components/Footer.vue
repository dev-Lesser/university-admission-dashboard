
<template>
    <v-footer padless color="blue-grey darken-3" dark>
        <v-col class="text-center" cols="12" style="display:flex;">
            <div>
                <v-btn
                    class="ma-2"
                    dark
                    href="https://github.com/dev-Lesser"
                    icon
                >
                    <v-icon >mdi-github-circle</v-icon>
                </v-btn>
            </div>
            <v-spacer />
            <div style="font-size:13px;display:flex;justify-content:flex-end;align-items:center;">
                &#169; {{ new Date().getFullYear() }}.
                <v-chip outlined x-small class="ma-1" color="red" href="https://github.com/dev-Lesser">dev-Lesser</v-chip> All Rights Reserved.
            </div>
        </v-col>
    </v-footer>
</template>
<style scoped>

</style>