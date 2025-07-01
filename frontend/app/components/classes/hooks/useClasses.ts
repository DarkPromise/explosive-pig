import { useQuery } from '@tanstack/react-query';
import type { Class } from '~/shared/types/types';

const useClasses = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["get-classes"],
    queryFn: async () => {
      return await fetch(import.meta.env.VITE_BACKEND_URL+"/api/classes", {
        method: "GET"
      }).then((res) => {
        if(!res.ok) {
          throw new Error(`[useClasses] Error fetching classes: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
    },
  })
  const classes: Class[] = data?.data || []; // Ensure we have a default empty array if data is undefined
  return { isClassesPending: isPending, error, classes, refetch };
}

export default useClasses;