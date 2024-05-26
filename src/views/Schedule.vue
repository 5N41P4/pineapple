<template>
    <div id="schedule" class="container">
        <Target />
        <br />
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
import Target from "@/components/TargetCard.vue"

export default {
    components: {
        Target,
        CronCard,
        ScheduleList,
    },
};
</script>