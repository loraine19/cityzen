//src/useCases/useUser.tsx
import { useEffect, useState } from "react";
import { User } from "../../domain/entities/User";
import { handleError } from "../../application/useCases/useCaseUtils";

export const UserViewModel = ({ getUserMeCase }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const labelEntity = 'utilisateur';
  console.log('userViewModel', user)

  useEffect(() => {
    const getUserMe = async () => {
      console.log(user)
      setLoadingUser(true);
      setErrorUser(null);
      try {
        const res = await getUserMeCase.execute();
        setUser(res);
        console.log(res)
      }
      catch (error) {
        handleError(error, `lors de chargement de l'${labelEntity}`, setErrorUser)
      }
      finally { setLoadingUser(false) }
    }
    getUserMe();
  }, [])
  return { loadingUser, errorUser, user };
}
