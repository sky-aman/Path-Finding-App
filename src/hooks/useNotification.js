import { useState } from "react";
import useNotificationStore from "../store/useNotificationStore";

const useNotification = () => {
    const addNotifications = useNotificationStore(state => state.addNotifications);
    const removeNotification = useNotificationStore(state => state.removeNotification);

    // Notification system
    const showNotification = (message, type = "info") => {
        const id = Date.now();
        const notification = { id, message, type };
        addNotifications( notification);
    
        // Auto-remove after 4 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 4000);
    };
    
    return { showNotification };
}

export default useNotification;