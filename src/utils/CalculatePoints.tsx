///// CALCULATE POINTS
export const calculatePoints = (skill_level: number, hard_level: number, type: string) => {
    let servicePoints: number = 0;
    if (type === "offer") {
        servicePoints = 1 + skill_level * 0.2 + hard_level * 0.2;
    } else {
        servicePoints = 1 + skill_level * 0.2 + hard_level * 0.2;
    }
    return servicePoints.toFixed(1);
};
