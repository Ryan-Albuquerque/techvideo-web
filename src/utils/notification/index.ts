import { toast } from "react-toastify";
import { NotificationTypeEnum } from "../enum/NotificationTypeEnum";

const Notification = (
  type: NotificationTypeEnum,
  text: string,
  options?: object
) => {
  let notification;

  options = options
    ? options
    : {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      };

  switch (type) {
    case NotificationTypeEnum.success:
      notification = () => toast.success(text, options);
      break;

    case NotificationTypeEnum.error:
      notification = () => toast.error(text, options);
      break;
    case NotificationTypeEnum.warning:
      notification = () => toast.warning(text, options);
      break;

    default:
      notification = () => toast(text, options);
      break;
  }

  return notification();
};

export default Notification;
