import { ApiStatus } from "@/utils/enum/ApiStatus";
import { api } from "./api";

const delay20s = 1000 * 20; //20s
const delay10s = 1000 * 10; //10s

const watchTask = async (
  id: string
): Promise<{ response?: any; error?: any }> => {
  let response, error;
  let counter = 0;

  await new Promise((resolve) => setTimeout(resolve, delay10s));

  const maxAttempt = 6;

  while (counter <= maxAttempt) {
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
      await new Promise((resolve) => setTimeout(resolve, delay20s));
      counter++;
    } catch (e) {
      error = e;
      break;
    }
  }

  if (counter > maxAttempt)
    error = {
      message:
        "Result could not be created. Max retry process exceeded; try again soon",
    };

  return { response, error };
};

export const startTask = async (urlPath: string, body: object) => {
  const { data } = await api.post(urlPath, body);

  const { response, error } = await watchTask(
    data.taskId ?? data.result.taskId
  );

  if (error) {
    throw new Error(
      error?.response?.data?.error || error?.message || "Error in process task"
    );
  }

  return response;
};
