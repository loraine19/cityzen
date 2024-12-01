export default function remainingDaysColorAlert(debutDate: string) {
    const eventStartTime = new Date(debutDate).getTime();
    const eventEndTime = new Date().getTime();
    const duration = Math.floor(
        (eventEndTime - eventStartTime) / (1000 * 60 * 60 * 24)
    );

    const daysLeft = 15 - duration;

    if (daysLeft >= 5 && daysLeft < 15) {
        return (
            <div className="bg-[#DCFCE7] text-[#15803D] px-4 py-1 rounded-full">
                {daysLeft} jours restants
            </div>
        );
    } else if (daysLeft >= 0 && daysLeft < 5) {
        return (
            <div className="bg-[#FFEDD5] text-[#F97316] px-4 py-1 rounded-full">
                {daysLeft} jours restants
            </div>
        );
    } else {
        return (
            <div className="bg-[#FEE2E2] text-[#DC2626] px-4 py-1 rounded-full">
                Terminé
            </div>
        );
    }
}
