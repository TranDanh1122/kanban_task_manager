import api from "./api";
export const TaskAPI = {
    fetchData: () => api.get("./data.json")
}