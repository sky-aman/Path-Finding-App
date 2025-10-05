import { create } from "zustand";
import useNotification from "../hooks/useNotification";

const useNotificationStore = create((set) => ({
	notifications: [],
	addNotifications: (notification) =>
		set((state) => {
			return { notifications: [notification, ...state.notifications] };
		}),
	removeNotification: (id) =>
		set((state) => {
			const newNotifications = state.notifications.filter((n) => n.id !== id);
			return { notifications: newNotifications };
		}),
}));

export default useNotificationStore;
