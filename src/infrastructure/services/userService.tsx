// src/infrastructure/services/userService.tsx
import { User, UserStatus } from "../../domain/entities/User";

interface UserService {
    isUserValidated(user: User): boolean;
    // other functions after 
}

class UserServiceImpl implements UserService {
    // other initialization if needed
    constructor() { }


    isUserValidated(user: User): boolean {
        return user.status === UserStatus.ACTIVE;
    }
}

export default UserServiceImpl;

// Example integration
// const userService = new UserServiceImpl();
//     const [isValidated, setIsValidated] = useState<boolean>(false);
//     useEffect(() => {
//         setIsValidated(userService.isUserValidated(user));
//     }, [user]);

