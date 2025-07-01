import { useQuery } from '@tanstack/react-query';
import type { Teacher } from '~/shared/types/types';

const useTeachers = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["get-teachers"],
    queryFn: async () => {
      return await fetch("/api/teachers", {
        method: "GET"
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`[useTeachers] Error fetching teachers: ${res.status} ${res.statusText}`);
        }
        return res.json();
      });
    },
  })
  const teachers: Teacher[] = data?.data || []; // Ensure we have a default empty array if data is undefined
  return { isTeachersPending: isPending, error, teachers, refetch };
}

export default useTeachers;