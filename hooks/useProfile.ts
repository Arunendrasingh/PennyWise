import { database } from "@/database/database";
import { useEffect, useState } from "react";

export function useUser() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const userDetail = database.get("users");

    const subscription = userDetail
      .query()
      .observe()
      .subscribe((records) => console.log(records));

    return () => subscription.unsubscribe();
  }, []);

  return profile;
}
