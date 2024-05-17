<template>
    <div id="schedule" class="container">
        <div class="row">
            <div class="col-lg-6">
                <CronCard />
            </div>
            <div class="col-lg-6">
                <ScheduleList />
            </div>
        </div>
    </div>
</template>

<script>
import CronCard from "@/components/ScheduleCards/CronCard.vue"
import ScheduleList from "@/components/ScheduleCards/ScheduleList.vue"

export default {
    components: {
        CronCard,
        ScheduleList,
    },
};
</script>