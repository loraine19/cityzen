// src/infrastructure/adapters/TanStackUserRepository.ts
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { UserRepository } from '../../domain/repositories-ports/UserRepository';

// export class TanStackUserRepository implements UserRepository {
//     async getUsers(): Promise<User> {
//         const { data } = await useQuery({
//             queryKey: ['users'],
//             queryFn: async () => {
//                 const response = await axios.get('/users');
//                 return response.data;
//             },
//         });
//         return data;
//     }
// }