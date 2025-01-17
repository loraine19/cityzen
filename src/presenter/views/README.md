// src/presentation/components/UsersList.tsx
import { GetUsers } from '../../domain/usecases/GetUsers';
import { TanStackUserRepository } from '../../infrastructure/adapters/TanStackUserRepository';

function UsersList() {
const getUsers = new GetUsers(new TanStackUserRepository());

const { data, isLoading, error } = useQuery({
queryKey: ['users'],
queryFn: () => getUsers.execute(),
});

if (isLoading) {
return <div>Chargement...</div>;
}

if (error) {
return <div>Erreur : {error.message}</div>;
}

return (
<ul>
{data.map((user) => (
<li key={user.id}>{user.name}</li>
))}
</ul>
);
}
