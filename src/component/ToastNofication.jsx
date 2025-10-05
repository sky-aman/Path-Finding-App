import { AlertCircle, CheckCircle, X, XCircle } from "lucide-react";
import useNotificationStore from "../store/useNotificationStore";

const ToastNofication = () => {
	const notifications = useNotificationStore((state) => state.notifications);
	const removeNotification = useNotificationStore(
		(state) => state.removeNotification
	);

	return (
		<div className="fixed top-4 right-4 z-50 space-y-2">
			{notifications.map((notification) => (
				<div
					key={notification.id}
					className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-md animate-slide-in ${
						notification.type === "error"
							? "bg-red-50 border-l-4 border-red-500 text-red-800"
							: notification.type === "success"
							? "bg-green-50 border-l-4 border-green-500 text-green-800"
							: "bg-blue-50 border-l-4 border-blue-500 text-blue-800"
					}`}
				>
					{notification.type === "error" && (
						<XCircle size={20} className="flex-shrink-0" />
					)}
					{notification.type === "success" && (
						<CheckCircle size={20} className="flex-shrink-0" />
					)}
					{notification.type === "info" && (
						<AlertCircle size={20} className="flex-shrink-0" />
					)}
					<p className="text-sm font-medium flex-1">{notification.message}</p>
					<button
						onClick={() => removeNotification(notification.id)}
						className="flex-shrink-0 hover:opacity-70 transition-opacity"
					>
						<X size={16} />
					</button>
				</div>
			))}
		</div>
	);
};

export default ToastNofication;
