import { connectedUsersStore } from "../../../application/stores/connectedUsers.store";

interface OnlineDotProps {
    id: number;
    className?: string;
}

export const OnlineDot = ({ id, className = "-bottom-1 -left-1" }: OnlineDotProps) => {
    const connectedUsers = connectedUsersStore((state) => state.connectedUsers);
    const isOnline: boolean = connectedUsers.find((userId) => userId === id) ? true : false;

    return (
        <span title={isOnline ? "En ligne" : "Hors ligne"}
            className={`absolute  ${className}
        border-2  p-1.5 border-white inline-block w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-300"}`}
        />
    );
};
