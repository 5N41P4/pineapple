<template>
    <div class="card text-light">
        <div class="card-body">
            <h4 class="card-title">Schedules</h4>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">Interface</th>
                        <th scope="col">Cron</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody v-if="schedules.length > 0">
                    <tr v-for="schedule in schedules" :key="schedule.id">
                        <td>{{ schedule.action.identifier }}</td>
                        <td>{{ schedule.cron }}</td>
                        <td>{{ schedule.action.action }}</td>
                        <td class="dropdown-cell">
                            <button type="button" class="btn btn-light btn-sm"
                                @click="toggleDropdown(schedule.id)">...</button>
                            <div v-if="activeDropdown === schedule.id" class="custom-dropdown-menu">
                                <DeleteButton @click="sendDeleteRequest(schedule.id)"/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import DeleteButton from "@/components/atomic/DeleteButton.vue";

export default {
    data() {
        return {
            schedules: [],
            activeDropdown: null,
            apiPath: '/api/schedule',
        };
    },
    async created() {
        try {
            await this.fetchSchedules();
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        toggleDropdown(id) {
            this.activeDropdown = this.activeDropdown === id ? null : id;
        },
        getApiEndpoint() {
            return this.apiPath;
        },
        async fetchSchedules() {
            return fetch(this.apiPath)
                .then((response) => response.json())
                .then((data) => {
                    this.schedules = data;
                });
        },
        sendDeleteRequest(id) {
            fetch(`${this.apiPath}/${id}`, {
                method: "DELETE",
            });
        }
    },
    components: {
        DeleteButton,
    },
};
</script>

<style scoped>
.card {
    background-color: #434d49;
}

.btn-primary {
    background-color: #36bf8d;
    border-color: #36bf8d;
}

.dropdown-cell {
    position: relative;
}

.custom-dropdown-menu {
    position: absolute;
    top: 0%;
    right: 100%;
    background-color: #434d49;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    width: fit-content;
    z-index: 100;
}

.custom-dropdown-menu button {
    margin: 0.5rem;
}
</style>