import { useEffect, useState } from "react";
import { Group } from "@/types";

export function useLocalGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  useEffect(() => {
    const g = localStorage.getItem("groups");
    const a = localStorage.getItem("activeGroup");
    if (g) setGroups(JSON.parse(g));
    if (a) setActiveGroupId(a);
  }, []);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    if (activeGroupId) {
      localStorage.setItem("activeGroup", activeGroupId);
    }
  }, [activeGroupId]);

  const createGroup = (name: string) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name,
    };
    setGroups([...groups, newGroup]);
    setActiveGroupId(newGroup.id);
  };

  return { groups, activeGroupId, setActiveGroupId, createGroup };
}
