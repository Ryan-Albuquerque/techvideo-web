import { ApiStatus } from "@/utils/enum/ApiStatis";
import { api } from "./api";
const delay = 1000 * 10; //10s

const watchTask = async (id: string) => {
  let response, error;
  while (true) {
    try {
      const statusResponse = await api.get(`/task-status/${id}`);
      const status = statusResponse.data.task.status;

      if (status === ApiStatus.DONE || status === ApiStatus.ERROR) {
        response =
          status === ApiStatus.DONE ? statusResponse.data.task.data : null;
        error =
          status === ApiStatus.ERROR ? statusResponse.data.task.errors : null;
        break;
      }

      // Delay
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (e) {
      error = e;
    }
  }

  return { response, error };
};

export const startTask = async (urlPath: string, body: object) => {
  const { data } = await api.post(urlPath, body);

  const { response, error } = await watchTask(
    data.taskId ?? data.result.taskId
  );

  if (error) {
    new Error(
      error?.response?.data?.error || error?.message || "Error in process task"
    );
  }

  return response;
};
