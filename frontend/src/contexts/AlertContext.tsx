import { createContext, useContext, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

type AlertType = "success" | "error" | "warning";

type Alert = {
    id: string;
    message: string;
    type: AlertType;
};

type AlertContextType = {
    showAlert: (message: string, type: AlertType) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    function remove(id: string) {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    }

    function showAlert(message: string, type: AlertType) {
        const id = crypto.randomUUID();

        setAlerts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => remove(id), 4000);
    }

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            <div className="fixed top-5 right-5 flex flex-col gap-4 z-50">
                {alerts.map((alert) => {
                    const config = {
                        success: {
                            bg: "bg-green-50 border-green-500",
                            icon: <CheckCircle className="text-green-500" />,
                        },
                        error: {
                            bg: "bg-red-50 border-red-500",
                            icon: <XCircle className="text-red-500" />,
                        },
                        warning: {
                            bg: "bg-yellow-50 border-yellow-500",
                            icon: <AlertTriangle className="text-yellow-500" />,
                        },
                    }[alert.type];

                    return (
                        <div
                            key={alert.id}
                            className={`flex items-start gap-3 p-4 border-l-4 rounded-lg shadow-lg w-[320px] animate-slideIn ${config.bg}`}
                        >
                            <div>{config.icon}</div>

                            <div className="flex-1 text-sm text-gray-800">
                                {alert.message}
                            </div>

                            <button onClick={() => remove(alert.id)}>
                                <X className="w-4 h-4 text-gray-400 hover:text-black" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error("useAlert must be used within AlertProvider");
    return ctx;
}