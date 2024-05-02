<template>
    <div class="card mb-3 text-light">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ text }}</p>
            <template v-if="link">
                <a :href="link" class="btn btn-primary">
                    {{ buttonText || "Go somewhere" }}
                </a>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
        text: {
            type: String,
            default: "",
        },
        link: {
            type: String,
            default: "",
        },
        buttonText: {
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped>
    .card {
        background-color: #434D49;
    }
    .btn-primary {
        background-color: #36BF8D;
        border-color: #36BF8D;
    }
</style>