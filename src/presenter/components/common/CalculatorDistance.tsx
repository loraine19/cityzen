function calculerDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance en kilomètres
    return distance;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

type DistanceCalculatorProps = {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
}

export const DistanceCalculator: React.FC<DistanceCalculatorProps> = ({ lat1, lon1, lat2, lon2 }) => {
    let distance = 0;
    if (lat1 && lon1 && lat2 && lon2) {
        distance = calculerDistance(
            lat1,
            lon1,
            lat2,
            lon2
        );
    }
    const formattedDistance = distance < 1 ? ((distance.toFixed(3) + " m").replace("0.", "")) : (distance.toFixed(2) + " km");
    return formattedDistance;
}
