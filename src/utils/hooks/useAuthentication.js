import { useEffect, useState } from "react";
import { supabase } from './supabase';

export function useAuthentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user };
}
