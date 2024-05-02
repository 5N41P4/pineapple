<template>
    <div id="dashboard" class="row row-cols-2 row-cols-md-4 g-2">
        <div class="col">
            <Card title="Card Title 1" text="Card subtitle 1" link="#" />
        </div>
        <div class="col">
            <Card title="Card Title 2" text="Card subtitle 2" link="#" />
        </div>
        <div class="col">
            <Card title="Card Title 3" text="Card subtitle 3" link="#" />
        </div>
    </div>
</template>

<script>
import Card from "../components/TextCard.vue";

export default {
    components: {
        Card,
    },
};
</script>
