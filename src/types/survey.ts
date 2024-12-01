export type vote = {
    user_id: number,
    target_id: number,
    target: string,
    opinion: string,
    createdAt: string,
    updatedAt: string,
};

export type survey = {
    id: number,
    user_id: number,
    title: string,
    description: string,
    image: string,
    opinion: string[],
    category: string,
    createdAt: string,
    updatedAt: string,
};

export type pool = {
    id: number,
    user_id_create: number,
    user_id_receive: number,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
}
